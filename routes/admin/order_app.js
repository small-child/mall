module.exports = function ( app ) {
	app.get('/admin/order',function(req,res){
        if(req.session.user){
            res.render('admin/order');
        }else{
            res.redirect('../login');
        }
    })

    /*订单信息*/
    app.get("/admin_order",function(req,res){
	    if(req.session.user){
	        var order = global.dbHelper.getModel('order');
	        order.find({},{},{sort:{createDate:-1},limit:2},function (err,doc) {
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
    app.get('/admin_order_count',function(req,res){
      	if(req.session.user){
        	var order = global.dbHelper.getModel('order');
        	order.count({},function (err,doc) {
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
    app.get("/admin_order_page/:page",function(req,res){
    	// console.log(req.params)
      	if(req.session.user){
            var page = parseInt(req.params.page);
            var order = global.dbHelper.getModel('order');
            order.find({},{},{sort:{createDate:-1},limit:2,skip:2*(page-1)},function (err,doc) {
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

    /*显示总额*/
    app.get("/admin_orderTotal",function(req,res){
        if(req.session.user){
            var order = global.dbHelper.getModel('order');
            order.aggregate({$group:{_id:null,num:{$sum:"$sum"}}},function (err,doc) {
                if (err) {
                    console.log(err)
                } else{
                    res.json(doc);
                    // console.log(doc)
                }
            })
        }else{
            res.redirect('../login');
        }
    })

    /*显示阶段总额*/
    app.get("/admin_orderSum/:t",function(req,res){
        // console.log(req.params);
        var time = new Date(req.params.t);
        if(req.session.user){
            var order = global.dbHelper.getModel('order');
            order.aggregate([{$match:{"order_time":time}},{$group:{_id:null,num:{$sum:"$sum"}}}],function (err,doc) {
                if (err) {
                    console.log(err)
                } else{
                    res.json(doc);
                    // console.log(doc)
                }
            })
        }else{
            res.redirect('../login');
        }
    })

}