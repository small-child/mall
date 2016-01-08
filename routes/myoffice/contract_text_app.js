module.exports = function ( app ) {
    app.get('/contract_text',function(req,res){
        if(req.session.user){
        	res.render('contract_text');
        }else{
            res.redirect('login');
        }
    })

    app.get('/contract_data0/:id',function(req,res){
        if(req.session.user){
        	var contract = global.dbHelper.getModel('contract');
	        contract.find({"_id":req.params.id},function (error, doc) {
	            if (error) {
	                console.log(error);
	            }else{
	                res.json(doc);
	                // console.log(doc);
	            }
	        })
        }else{
            res.redirect('login');
        }
    })

    app.get('/contract_data1/:id',function(req,res){
        if(req.session.user){
        	var contract = global.dbHelper.getModel('contract');
	        contract.find({"_id":req.params.id},{"orderId":1,"_id":0},function (error, doc) {
	            if (error) {
	                console.log(error);
	            }else{
	                // console.log(doc[0].orderId);
	               	var order = global.dbHelper.getModel('order'); 
	               	order.find({"_id":doc[0].orderId},{"unit_price1":1,"volume1":1,"_id":0},function(err,doc) {
	               		if (err) {
	               			console.log(err);
	               		} else{
	               			res.json(doc);
	               			// console.log(doc);
	               		}
	               	})
	            }
	        })
        }else{
            res.redirect('login');
        }
    })

    app.get('/contract_data2/:id',function(req,res){
        if(req.session.user){
        	var contract = global.dbHelper.getModel('contract');
	        contract.find({"_id":req.params.id},{"orderId":1,"_id":0},function (error, doc) {
	            if (error) {
	                console.log(error);
	            }else{
	                // console.log(doc[0].orderId);
	               	var order = global.dbHelper.getModel('order'); 
	               	order.find({"_id":doc[0].orderId},{"role":1,"goods_id":1,"_id":0},function(err,doc) {
	               		if (err) {
	               			console.log(err);
	               		} else{
	               			if (doc[0].role == 0) {
	               				var buy_release = global.dbHelper.getModel('buy_release');
						      	buy_release.find({"_id":doc[0].goods_id},{"jiaohuo_start":1,"jiaohuo_end":1,"packing":1,
						      		"address":1,"transport":1,"payment":1,"_id":0},function (err,docs) {
						       		if (err) {
						       			console.log(err)
						       		} else{
						       			// console.log(docs);
						       			res.json(docs);
						       		};
						       	})
	               			} else{
	               				var sell_release = global.dbHelper.getModel('sell_release');
						      	sell_release.find({"_id":doc[0].goods_id},{"jiaohuo_start":1,"jiaohuo_end":1,"packing":1,
						      		"address":1,"transport":1,"payment":1,"_id":0},function (err,docs) {
						       		if (err) {
						       			console.log(err)
						       		} else{
						       			// console.log(docs);
						       			res.json(docs);
						       		};
						       	})
	               			}
	               		}
	               	})
	            }
	        })
        }else{
            res.redirect('login');
        }
    })

	/*同意签订合同,将合同需要信息上传上去*/
	app.get('/contract_data3/:role/:id',function(req,res){
        if(req.session.user){//直接获取公司信息就可以了，前端已经确定是买方和卖方
        	var company = global.dbHelper.getModel('company');
        	company.find({uId:req.session.user._id},{"legal_person":1,"agent":1,"company_bank":1,"company_bankNum":1,
        	"picture5":1,_id:0},function (err,doc) {
        		if (err) {
        			console.log(err)
        		} else{
        			res.json(doc);
        		}
        	})
        }else{
            res.redirect('login');
        }
    })

	/*修改合同标示符和发布信息*/
	app.get('/contract_data4/:role/:id',function(req,res){
        if(req.session.user){
        	/*0000000000000000000*/
        	// 给相应的卖方或者买方添加标识
        	var contract = global.dbHelper.getModel('contract');
        	var order = global.dbHelper.getModel('order'); 
        	if (req.params.role == 0) { //买方
				/*将买方的标示符改为1，为已经签了*/
				contract.update({"_id":req.params.id},{$set:{"buyerTag":1}},function (error, doc) {
		            if (error) {
		                console.log(error);		                
		            }else{
		                // console.log("修改合同中buyTag");
		            }
		        })
		        /*判断对方是否为已签，若是已签，则修改合同的over为1，同时将发布信息的hasBuy和hasSell修改了*/
				contract.find({"_id":req.params.id},function (error, doc) {
		            if (error) {
		                console.log(error);
		            }else{
		                if (doc[0].sellerTag == 1) {//卖家已经签订
		                	res.json("卖家已签，合同生效");
		                	/*修改合同的over为1*/
		                	contract.update({"_id":req.params.id},{$set:{"over":1}},function (error, doc) {
					            if (error) {
					                console.log(error);
					            }else{
					                // console.log("合同标示符修改成功");
					            }
					        })
					        /*同时将发布信息的hasBuy和hasSell修改了*/
					        order.find({"_id":doc[0].orderId},function(err,doc) {
			               		if (err) {
			               			console.log(err);
			               		} else{
			               			// console.log("订单信息被提取出来")
			               			// console.log(doc[0].role);
			               			// console.log(doc[0].volume1);
			               			var goods_id = doc[0].goods_id;
			               			var has0 = doc[0].volume1;
			               			if (doc[0].role == 0) {//为买家发布信息时候
			               				var buy_release = global.dbHelper.getModel('buy_release');
			               				buy_release.find({"_id":doc[0].goods_id},{"hasBuy":1,"_id":0},function (err,doc) {
								       		if (err) {
								       			console.log(err)
								       		} else{
								       			var has1 = doc[0].hasBuy + has0;
								       			// console.log("print has1:"+has1);
								       			// console.log(goods_id);
								       			buy_release.update({"_id":goods_id},{$set:{"hasBuy":has1}},function (err,doc) {
										       		if (err) {
										       			console.log(err)
										       		} else{
										       			console.log(doc);
										       			// console.log("修改buy_release");
										       		}
										       	})
								       		}
								       	})
								      	
			               			} else{//为卖家发布信息时候
			               				var sell_release = global.dbHelper.getModel('sell_release');
			               				sell_release.find({"_id":doc[0].goods_id},{"hasSell":1,"_id":0},function (err,doc) {
								       		if (err) {
								       			console.log(err)
								       		} else{
								       			var has1 = doc[0].hasSell + has0;
								       			sell_release.update({"_id":goods_id},{$set:{"hasSell":has1}},function (err,doc) {
										       		if (err) {
										       			console.log(err)
										       		} else{
										       			// console.log("修改sell_release");
										       		}
										       	})
								       		}
								       	})
			               			}
			               		}
			               	})
		                }
		            }
		        })
			} else{
				/*将卖方的标示符改为1，为已经签了*/
				contract.update({"_id":req.params.id},{$set:{"sellerTag":1}},function (error, doc) {
		            if (error) {
		                console.log(error);		                
		            }else{
		                // console.log("修改合同中sellTag");
		            }
		        })
		        /*000000000000000*/
		        contract.find({"_id":req.params.id},function (error, doc) {
		            if (error) {
		                console.log(error);
		            }else{
		                if (doc[0].buyerTag == 1) {//买家已经签订
		                	res.json("buyer已签，合同生效");
		                	/*修改合同的over为1*/
		                	contract.update({"_id":req.params.id},{$set:{"over":1}},function (error, doc) {
					            if (error) {
					                console.log(error);
					            }else{
					                // console.log("合同标示符修改成功");
					            }
					        })
					        /*同时将发布信息的hasBuy和hasSell修改了*/
					        order.find({"_id":doc[0].orderId},function(err,doc) {
			               		if (err) {
			               			console.log(err);
			               		} else{
			               			console.log("订单信息被提取出来")
			               			console.log(doc[0].role);
			               			console.log(doc[0].volume1);
			               			var goods_id = doc[0].goods_id;
			               			var has0 = doc[0].volume1;
			               			if (doc[0].role == 0) {//为买家发布信息时候
			               				var buy_release = global.dbHelper.getModel('buy_release');
			               				buy_release.find({"_id":goods_id},{"hasBuy":1,"_id":0},function (err,doc) {
								       		if (err) {
								       			console.log(err)
								       		} else{
								       			var has1 = doc[0].hasBuy + has0;
								       			buy_release.update({"_id":doc[0].goods_id},{$set:{"hasBuy":has1}},function (err,doc) {
										       		if (err) {
										       			console.log(err)
										       		} else{
										       			// console.log("修改buy_release");
										       		}
										       	})
								       		}
								       	})
								      	
			               			} else{//为卖家发布信息时候
			               				var sell_release = global.dbHelper.getModel('sell_release');
			               				sell_release.find({"_id":doc[0].goods_id},{"hasSell":1,"_id":0},function (err,doc) {
								       		if (err) {
								       			console.log(err)
								       		} else{
								       			var has1 = doc[0].hasSell + has0;
								       			sell_release.update({"_id":goods_id},{$set:{"hasSell":has1}},function (err,doc) {
										       		if (err) {
										       			console.log(err)
										       		} else{
										       			// console.log("修改sell_release");
										       		}
										       	})
								       		}
								       	})
			               			}
			               		}
			               	})
		                }
		            }
		        })
		        /*0000000000000*/
			}
        }else{
            res.redirect('login');
        }
    })

	/*同意签订合同,将合同需要信息上传上去*/
	app.get('/contract_data5/:id',function(req,res){
        if(req.session.user){//直接获取公司信息就可以了，前端已经确定是买方和卖方
        	var contract = global.dbHelper.getModel('contract'); 
           	contract.find({"_id":req.params.id},{"buyerTag":1,"sellerTag":1,"_id":0},function(err,doc) {
           		if (err) {
           			console.log(err);
           		} else{
           			res.json(doc);
           		}
           	})
        }else{
            res.redirect('login');
        }
    })

    /*页面加载时获取买方信息*/
    app.get('/contract_data6/:id',function(req,res){
        if(req.session.user){//直接获取买方公司信息
        	var contract = global.dbHelper.getModel('contract'); 
           	contract.find({"_id":req.params.id},{"buyerId":1,"_id":0},function(err,doc) {
           		if (err) {
           			console.log(err);
           		} else{
           			// console.log(doc[0].buyerId);
           			var company = global.dbHelper.getModel('company');
		        	company.find({"uId":doc[0].buyerId},{"legal_person":1,"agent":1,"company_bank":1,"company_bankNum":1,
		        	"picture5":1,_id:0},function (err,doc) {
		        		if (err) {
		        			console.log(err)
		        		} else{
		        			res.json(doc);
		        		}
		        	})
           		}
           	})
        }else{
            res.redirect('login');
        }
    })

    /*页面加载时获取卖方信息*/
    app.get('/contract_data7/:id',function(req,res){
        if(req.session.user){//直接获取买方公司信息
        	var contract = global.dbHelper.getModel('contract'); 
           	contract.find({"_id":req.params.id},{"sellerId":1,"_id":0},function(err,doc) {
           		if (err) {
           			console.log(err);
           		} else{
           			// console.log(doc[0].sellerId);
           			var company = global.dbHelper.getModel('company');
		        	company.find({"uId":doc[0].sellerId},{"legal_person":1,"agent":1,"company_bank":1,"company_bankNum":1,
		        	"picture5":1,_id:0},function (err,doc) {
		        		if (err) {
		        			console.log(err)
		        		} else{
		        			res.json(doc);
		        		}
		        	})
           		}
           	})
        }else{
            res.redirect('login');
        }
    })

}