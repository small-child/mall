module.exports = function ( app ) {
    app.get('/sell',function(req,res){
        if(req.session.user){
        	res.render('sell');
        }else{
            res.redirect('login');
        }
    });

    /*公司名字获取*/
    app.get('/sell_companyName',function(req,res){
       	var buy_release = global.dbHelper.getModel('buy_release');
       	buy_release.distinct("company",function (err,docs) {
       		if (err) {
       			console.log(err)
       		} else{
       			// console.log(docs);
       			res.json(docs);
       		};
       	})
    });

    /*初始状态下，商品显示*/
    app.get('/sell_data',function(req,res){
      var buy_release = global.dbHelper.getModel('buy_release');
      buy_release.find({},{"brand":1,"type":1,"kind":1,"rank":1,"needVolume":1,"hasBuy":1,"min_deal":1,"unit_price":1,
   		"unit":1,"guadan_start":1,"guadan_end":1,"address":1},{sort:{date:-1},limit:2},function (err,docs) {
       		if (err) {
       			console.log(err)
       		} else{
       			// console.log(docs);
       			res.json(docs);
       		};
       	})
    });

    /*计算数据库有多少商品信息*/
    app.get('/sell_count',function(req,res){
       var buy_release = global.dbHelper.getModel('buy_release');
       buy_release.count(function (err,docs) {
          if (err) {
            console.log(err);
          } else{
            // console.log(docs);
            res.json(docs);
          };
       })
    });

    /*进行换页的时候商品显示*/
    app.get('/sell_data_page/:page',function(req,res){
    	var page = parseInt(req.params.page);
      	var buy_release = global.dbHelper.getModel('buy_release');
      	buy_release.find({},{"brand":1,"type":1,"kind":1,"rank":1,"needVolume":1,"hasBuy":1,"min_deal":1,"unit_price":1,
   		"unit":1,"guadan_start":1,"guadan_end":1,"address":1},{sort:{date:-1},limit:2,skip:2*(page-1)},function (err,docs) {
       		if (err) {
       			console.log(err)
       		} else{
       			// console.log(docs);
       			res.json(docs);
       		};
       	})
    });
    /*查询*/
    app.post('/sell_search',function(req,res){
    	var search = new Object();
    	if (req.body.type) {
    		search.type = req.body.type;
    	};
    	if (req.body.kind) {
    		search.kind = req.body.kind;
    	};
    	if (req.body.rank) {
    		search.rank = req.body.rank;
    	};
    	if (req.body.guadan) {
    		var time1 = new Date(req.body.guadan);
    		search.guadan_start = new Object();
    		search.guadan_start.$lte = time1;
    		search.guadan_end = new Object();
    		search.guadan_end.$gt = time1;
    	};
    	if (req.body.release) {
    		var time2 = new Date(req.body.release);
    		search.date = time2;
    	};
       	var buy_release = global.dbHelper.getModel('buy_release');
       	buy_release.find(search,{"brand":1,"type":1,"kind":1,"rank":1,"needVolume":1,"hasBuy":1,"min_deal":1,"unit_price":1,
   		"unit":1,"guadan_start":1,"guadan_end":1,"address":1},{sort:{date:-1},limit:2},function (err,docs) {
       		if (err) {
       			console.log(err);
       		} else{
       			// console.log(docs);
       			res.json(docs);
       		};
       	})
       	
    });

	/*查询到文档数目*/
    app.post('/sell_search_count',function(req,res){
      // console.log(req.body);
      var search = new Object();
      if (req.body.type) {
        search.type = req.body.type;
      };
      if (req.body.kind) {
        search.kind = req.body.kind;
      };
      if (req.body.rank) {
        search.rank = req.body.rank;
      };
      if (req.body.guadan) {
        var time1 = new Date(req.body.guadan);
        search.guadan_start = new Object();
        search.guadan_start.$lte = time1;
        search.guadan_end = new Object();
        search.guadan_end.$gt = time1;
      };
      if (req.body.release) {
        var time2 = new Date(req.body.release);
        search.date = time2;
      };
      var buy_release = global.dbHelper.getModel('buy_release');
      buy_release.count(search,function (err,docs) {
        if (err) {
          console.log(err);
        } else{
          // console.log(docs);
          res.json(docs);
        };
      })
    });

    /*查询数据分页显示*/
    app.post('/sell_search_page/:page',function(req,res){
      var page = parseInt(req.params.page);
      var search = new Object();
      if (req.body.type) {
        search.type = req.body.type;
      };
      if (req.body.kind) {
        search.kind = req.body.kind;
      };
      if (req.body.rank) {
        search.rank = req.body.rank;
      };
      if (req.body.guadan) {
        var time1 = new Date(req.body.guadan);
        search.guadan_start = new Object();
        search.guadan_start.$lte = time1;
        search.guadan_end = new Object();
        search.guadan_end.$gt = time1;
      };
      if (req.body.release) {
        var time2 = new Date(req.body.release);
        search.date = time2;
      };
      var buy_release = global.dbHelper.getModel('buy_release');
      buy_release.find(search,{"brand":1,"type":1,"kind":1,"rank":1,"needVolume":1,"hasBuy":1,"min_deal":1,"unit_price":1,
      "unit":1,"guadan_start":1,"guadan_end":1,"address":1,},{sort:{date:-1},limit:2,skip:2*(page-1)},function (err,docs) {
          if (err) {
            console.log(err);
          } else{
            // console.log(docs);
            res.json(docs);
          };
        })
    });

  

}