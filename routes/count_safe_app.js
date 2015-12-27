module.exports = function ( app ) {
    app.get('/count_safe',function(req,res){
        if(req.session.user){
            // console.log(0)
        	res.render('count_safe');
        }else{
        	// console.log(1);
            res.redirect('login');
        }
    });

    app.post('/count_safe',function(req,res){
        if(req.session.user){
            if (req.body.password1 == req.session.user.password) {
            	var User = global.dbHelper.getModel('user');
            	var uname = req.session.user.name;
            	// console.log(0);
            	User.update({name: uname}, {password:req.body.password2},function (err, doc) {
		            if (err) {
		            	throw err
		            } else{
		            		// res.redirect('login');
		            		res.json(0);
		            };
		        });
            }else{
            	console.log("no");
            }
        }else{
        	console.log(1);
            res.redirect('login');
        }
    });

  

}