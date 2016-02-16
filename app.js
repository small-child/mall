var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var mongoose = require("mongoose");

var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

global.dbHelper = require( './common/dbHelper' );

global.db = mongoose.connect("mongodb://127.0.0.1:27017/ylxc");

// global.bigtype = "0";	//商品大类保存下来
// global.smallarray = []; 	//保存商品小类
global.kind_id = 0;         //商品小类id
global.chat_id = "11111";

app.use(session({
    secret:'secret',
    cookie:{
        maxAge:1000*60*60
    }
}));


// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));


// 设定view engine变量，意为网页模板引擎
app.set('view engine', 'ejs');
app.set( 'view engine', 'html' );
app.engine( '.html', require( 'ejs' ).__express );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer());

// 设定静态文件目录，比如本地文件
app.use(express.static(path.join(__dirname, 'public')));

require('./routes')(app);

app.get('/', function(req, res) {
    res.render('index');
});
    
/*chatroom*/
io.on('connection', function(socket){
  	socket.on('chat message', function(msg){
      	io.emit(msg.order_id, msg);
        var chatRcord = global.dbHelper.getModel('chatRcord');
        chatRcord.create({
            order_id: msg.order_id,
            who: msg.who,
            userName: msg.name,
            information: msg.information,
            time:msg.time
        }, function (error, doc) {
            if (error) {
                console.log(error);
            } else {
                // console.log("write to db sucessfully");
            }
        })
    })
})

http.listen(80, function(){
  console.log('listening on *:80');
});
