module.exports = function ( app ) {
    app.get('/buyRelease',function(req,res){
        if(req.session.user){
        	if (req.session.user.role == 0) {
        		res.render('error');
        	} else{
        		res.render('buyRelease');
        	}
        }else{
            res.redirect('login');
        }
    })

    var multer  = require('multer');    //引用图片上传模块

    /*时间日期格式化*/
    Date.prototype.Format = function(fmt)   
    {   
      var o = {   
        "M+" : this.getMonth()+1,                 //月份   
        "d+" : this.getDate(),                    //日   
        "h+" : this.getHours(),                   //小时   
        "m+" : this.getMinutes(),                 //分   
        "s+" : this.getSeconds(),                 //秒   
        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
        "S"  : this.getMilliseconds()             //毫秒   
    }
      if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
      return fmt;   
    }  

    var time = new Date().Format("yyyy-MM-dd");

    var timestring = time.toString();

    var upload = multer({ dest:'public/picture/buyRelease/'});

    app.post('/buyRelease',upload,function(req,res){
    	if (req.session.user) {
	        if (req.body.remarks) {
	            remarks = req.body.remarks;
	        }else {
	            remarks = null;
	        }
	        if (req.files.file1) {
	            file = req.files.file1.name;
	        }else {
	            file = null;
	        }
	        var buy_release = global.dbHelper.getModel('buy_release');
	        var company = global.dbHelper.getModel('company');
	        company.find({uId:req.session.user._id},{"name":1,_id:0},function (err,docs) {
	            if (err) {
	                console.log(err);
	            } else{
	                // console.log(docs[0].name);
	                buy_release.create({
	                	uid:req.session.user._id,
	                    uname: req.session.user.name,
	                    uemail:req.session.user.email,
	                    company:docs[0].name,
	                    type: req.body.type,
	                    kind: req.body.kind,
	                    rank: req.body.rank,
	                    brand: req.body.brand,
	                    bargain: req.body.bargain,
	                    delivery: req.body.delivery,
	                    unit: req.body.unit,
	                    transport: req.body.transport,
	                    needVolume: req.body.needVolume,
	                    min_deal: req.body.min_deal,
	                    unit_price: req.body.unit_price,
	                    address:req.body.address,
	                    packing:req.body.packing,
	                    payment:req.body.payment,
	                    jiaohuo_start: new Date(req.body.jiaohuo_start),
	                    jiaohuo_end: new Date(req.body.jiaohuo_end),
	                    guadan_start: new Date(req.body.guadan_start),
	                    guadan_end: new Date(req.body.guadan_end),
	                    remarks: remarks,
	                    file1:file,      
	                    date:new Date(timestring)
	                    },function (err,doc) {
	                    if(err){
	                        console.log(err);
	                    }else{
	                        // console.log(doc);
	                        res.json(0);
	                    }
	                })
	            };
	        })
    	} else{
    		res.redirect('login');
    	}
    })


}