var express = require('express');
var app = express();
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
app.use(session({
    secret:'secret',
    cookie:{
        maxAge:1000*60*60*60
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
    res.render('register');
});

app.listen(8080);