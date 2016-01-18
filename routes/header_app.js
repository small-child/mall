module.exports = function ( app ) {
    /*buy*/
    app.get('/head_message0',function(req,res){
        if(req.session.user){
        	// console.log(req.session.user);
    		var buyer_id = req.session.user._id;
        	var order = global.dbHelper.getModel('order');
      		order.find({"buyer_id":buyer_id},{"_id":1},function (err,doc) {
	        	if (err) {
	          		console.log(err);
	        	} else{
	        		// console.log(doc)
	        		res.json(doc);
	        	}
      		})
        }else{
            res.redirect('login');
        }
    })

	app.post('/head_message1',function(req,res){
    if(req.session.user){
    	var charArr = req.body.chatRcord;
    	/*find chatRecord start*/     	
  		var chatRcord = global.dbHelper.getModel('chatRcord');
  		chatRcord.aggregate([{$match:{"tag":0,"who":1,"order_id":{$in:charArr}}},
	    {$group: { "_id": "$userName" , "count": { $sum: 1 } } }],
			function(err, doc) {
			    // console.log(doc);
			    res.json(doc)
			})
      		/*find chatRecord end*/
      }else{
            res.redirect('login');
      }
    })


  /*sell*/
  app.get('/head_message3',function(req,res){
        if(req.session.user){
          // console.log(req.session.user);
        var seller_id = req.session.user._id;
          var order = global.dbHelper.getModel('order');
          order.find({"seller_id":seller_id},{"_id":1},function (err,doc) {
            if (err) {
                console.log(err);
            } else{
              // console.log(doc)
              res.json(doc);
            }
          })
        }else{
            res.redirect('login');
        }
    })

  app.post('/head_message4',function(req,res){
    if(req.session.user){
      var charArr = req.body.chatRcord;
      /*find chatRecord start*/       
      var chatRcord = global.dbHelper.getModel('chatRcord');
      chatRcord.aggregate([{$match:{"tag":0,"who":0,"order_id":{$in:charArr}}},
      {$group: { "_id": "$userName" , "count": { $sum: 1 } } }],
      function(err, doc) {
          // console.log(doc);
          res.json(doc)
      })
          /*find chatRecord end*/
      }else{
            res.redirect('login');
      }
    })
}

