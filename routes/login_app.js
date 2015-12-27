module.exports = function ( app ) {
    app.get('/login',function(req,res){
        res.render('login');
    });

    app.post('/login', function (req, res) {
        var User = global.dbHelper.getModel('user'),
            uname = req.body.uname;
        User.findOne({name: uname}, function (error, doc) {
            if (error) {
                // res.send(500);
                console.log(error);
                // console.log(0);
                res.json(1);
            } else if (!doc) {
                req.session.error = '用户名不存在！';
                // res.send(404);
                // console.log(1);
                res.json(1);
            } else {
               if(req.body.upwd != doc.password){
                   req.session.error = "密码错误!";
                   // res.send(404);
                   // console.log(2);
                   res.json(2);
               }else{
                   req.session.user=doc;
                   // console.log(3);
                   res.json(3);
                   // res.send(200);
               }
            }
        });
    });

}