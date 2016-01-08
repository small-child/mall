module.exports = function ( app ) {
    app.get('/register', function(req, res) {
        res.render('register');
    });

    app.post('/email',function(req,res) {
        var nodemailer = require('nodemailer');//引入发邮件模块
        var addressee = req.body.email;        //获取前端发送的邮箱
        // console.log(addressee);
        /*随机验证码*/
        var Num=""; 
        for(var i=0;i<6;i++) { 
            Num+=Math.floor(Math.random()*10); 
        } 
        // console.log(Num);
        /*随机验证码*/
        var transporter = nodemailer.createTransport({
            service: 'qq',
            auth: {
                user: "136596826@qq.com", // 账号
                pass: "where420" // 密码
            }
        });
        var mailOptions = {
            from: '136596826@qq.com', // sender address
            to: addressee, // list of receivers
            subject: '一路新材', // Subject line
            text: Num
            // text: 'Hello world ✔', // plaintext body
            // html: '<p>wo</p>' // html body
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            res.send(Num);
        });      

    })
    
    app.post('/register', function (req, res) {
        // console.log(req.body.uname);
        // res.send("111");        
        // console.log(req.body)
        var User = global.dbHelper.getModel('user'),
            uname = req.body.uname;
        User.findOne({name: uname}, function (error, doc) {
            if (error) {
                // res.json('网络异常错误！');
                console.log(error);
                res.json(0);
                console.log(0);
            } else if (doc) {
                // res.json('用户名已存在！');
                res.json(1);
                // console.log(1);
            } else {
                User.create({
                    name: uname,
                    password: req.body.upwd,
                    email:req.body.email,
                    tag:req.body.tag,
                    createDate:new Date()
                }, function (error, doc) {
                    if (error) {
                        console.log(error);
                        console.log(2);
                        res.json(2);
                    } else {
                        // res.json('用户名创建成功！');
                        // console.log(3);
                        res.json(3);
                    }
                });
            }
        });
        
    });
    
}