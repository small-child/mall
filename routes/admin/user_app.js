module.exports = function ( app ) {
	app.get('/admin/user',function(req,res){
        if(req.session.user){
            res.render('admin/user');
        }else{
            res.redirect('../login');
        }
    })

    /*用户信息*/
    app.get("/admin_userIfo",function(req,res){
	    if(req.session.user){
	        var user = global.dbHelper.getModel('user');
	        user.find({},{},{sort:{createDate:-1},limit:2},function (err,doc) {
	        	if (err) {
	            	console.log(err)
	          	} else{
	            	res.json(doc);
	          	}
	        })
	    }else{
	        res.redirect('../login');
	    }
    })

    /*计算数据库有多少为审批的用户*/
    app.get('/admin_userIfo_count',function(req,res){
      	if(req.session.user){
        	var user = global.dbHelper.getModel('user');
        	user.count({},function (err,doc) {
		        if (err) {
		          	console.log(err);
		        }else{
		          	res.json(doc);
		        }
	       })
      	}else{
        	res.redirect('../login');
      	}
    })

    /*分页显示*/
    app.get("/admin_userIfo_page/:page",function(req,res){
      if(req.session.user){
            var page = parseInt(req.params.page);
            var user = global.dbHelper.getModel('user');
            user.find({},{},{sort:{createDate:-1},limit:2,skip:2*(page-1)},function (err,doc) {
	            if (err) {
	              	console.log(err)
	            } else{
	              	res.json(doc);
	            }
	        })
        }else{
            res.redirect('../login');
        }
    })



}