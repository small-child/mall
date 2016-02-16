module.exports = function ( app ) {
    app.get('/admin/type',function(req,res){
        if(req.session.user){
            res.render('admin/type');
        }else{
            res.redirect('../login');
        }
    })

    /*2.商品大类操作*/

    //商品类别增加
  	app.post('/admin/type',function  (req,res,next) {
        if(req.session.user){
            var bigtype = global.dbHelper.getModel('bigtype');
            bigtype.findOne({name: req.body.bigType},{name:1,_id:0}, function (error, doc) {
                if (error) {
                    console.log(error);
                    // console.log(0);
                }else if (doc) {
                    res.json(1)
                    // console.log(doc);
                }else {
                    bigtype.create({
                        name: req.body.bigType
                    }, function (error, doc) {
                        if (error) {
                            console.log(error);
                            // console.log(2);
                        } else {
                            res.json('3')
                            // console.log(3);
                        }
                    })
                }
            })
        }else{
            res.redirect('../login');
        }
  	})
    
  	app.get('/admin/type_data',function(req,res){
        if(req.session.user){
            var bigtype = global.dbHelper.getModel('bigtype');
            bigtype.find({},{name:1,_id:0}, function (error, doc) {
                if (error) {
                    console.log(error);
                    // console.log(0);
                }else{
                    res.json(doc);
                    if (doc[0].name) {
                        // global.bigtype = doc[0].name;
                    }
                }
            })
        }else{
            res.redirect('../login');
        }
        
    })
    
  	// 商品大类删除
    app.delete('/admin/type_delete',function(req,res){
        var bigtype = global.dbHelper.getModel('bigtype');
        bigtype.remove({name:req.body.name},function (error, doc) {
            if (error) {
                console.log(error);
                // console.log(0);
            }else{
            	res.json(doc);
            	// console.log(1);
            }
        });
    });

    /*3.商品小类*/

    // 增加小类   
	app.post('/admin/kind',function  (req,res,next) {
    	// console.log(req.body);
        var bigtype = global.dbHelper.getModel('bigtype');
        var smalltype = global.dbHelper.getModel('smalltype');
        bigtype.find({"name":req.body.bigType,"smallType.name":req.body.smallType},function (error, doc) {
            if (error) {
                console.log(error);
            }else if (doc[0]) {
                res.json(0);
                // console.log("已经存在");
            } else{
                // console.log("不存在，需要创建");
                smalltype.create({
                    name: req.body.smallType
                }, function (error, doc) {
                    if (error) {
                        console.log(error);
                    } else {
                        bigtype.update({
                            name: req.body.bigType
                        },{$push:{smallType:{name:req.body.smallType,small_id:doc._id}}},function (error, doc) {
                            if (error) {
                                console.log(error);
                            } else {
                                res.json(1);
                                // console.log(doc);
                            }
                        })
                    }
                });
            };
        });
  	})
    
    //初始状态下的返回的商品小类
	app.get('/admin/kind_data',function(req,res){
        var bigtype = global.dbHelper.getModel('bigtype');
        bigtype.find({},{"smallType.name":1,_id:0},function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                // console.log(doc[0]);
            	// console.log(doc[0].smallType);
            	// console.log(doc[0].smallType.length);
            	// console.log(doc[0].smallType[0].name);
                res.json(doc[0].smallType);
            }
        });
    });
    
    //随着商品大类的切换，小类跟着变换
    app.post('/admin/kind_change',function  (req,res,next) {
        var bigtype = global.dbHelper.getModel('bigtype');
        bigtype.find({name:req.body.name},{"smallType.name":1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(doc[0].smallType);
            }
        });
    });
    
    // 删除小类
    app.post('/admin/kind_delete',function  (req,res,next) {
        var bigtype = global.dbHelper.getModel('bigtype');
        var smalltype = global.dbHelper.getModel('smalltype');
        // 删除小类中包含的商品等级
        bigtype.find({"name":req.body.typeName},{"smallType":{"$elemMatch":{"name":req.body.kindName}},_id:0},function (error, doc) {
            if (error) {
                console.log(error);
            }else if (doc[0]) {
                smalltype.find({_id:doc[0].smallType[0].small_id},{"rank":1,_id:0},function (error, doc) {
                    if (error) {
                        console.log(error);
                        // console.log(0);
                    }else{
                        console.log(doc);
                    }
                });
            } 
        });
        
        // 删除小类
        bigtype.find({"name":req.body.typeName},{"smallType":{"$elemMatch":{"name":req.body.kindName}},_id:0},function (error, doc) {
            if (error) {
                console.log(error);
            }else if (doc[0]) {
                // console.log("已经存在,所以可以删除了");
                // console.log(doc[0].smallType[0].small_id);
                smalltype.remove({_id:doc[0].smallType[0].small_id},function (error, doc) {
                    if (error) {
                        console.log(error);
                        // console.log(0);
                    }else{
                        res.json(0);
                        // console.log("kind delete");
                    }
                });
            } 
        });
        // 大类中的数据删除成功
        bigtype.update({"name":req.body.typeName},{$pull:{"smallType":{name:req.body.kindName}}},function (error, doc) {
            if (error) {
                console.log(error);
            }else if (doc[0]) {
                console.log("type delete");
                // console.log(doc);
            } 
        });
    });
    
    /*4.型号等级操作*/
    // 添加型号等级
    app.post('/admin/rank',function  (req,res,next) {
        var bigtype = global.dbHelper.getModel('bigtype');
        var smalltype = global.dbHelper.getModel('smalltype');
        var Rank = global.dbHelper.getModel('rank');
        bigtype.find({"name":req.body.bigType},{"smallType":{"$elemMatch":{"name":req.body.smallType}},_id:0},function (error, doc) {
            if (error) {
                console.log(error);
            }else if (doc[0]) {
                // console.log("小类已经存在");
                // console.log(doc[0].smallType[0].small_id);
                global.kind_id = doc[0].smallType[0].small_id;
                smalltype.find({"_id":doc[0].smallType[0].small_id,"rank.name":req.body.rank},function (error, doc) {
                    if (error) {
                        console.log(error);
                    }else if (doc[0]) {
                        res.json(0);
                        // console.log("该型号已经存在");
                    } else{
                        // console.log("型号不存在，需要创建");
                        Rank.create({
                            name: req.body.rank
                        }, function (error, doc) {
                            if (error) {
                                console.log(error);
                            } else {
                                // console.log("创建rank成功")
                                smalltype.update({
                                    _id: global.kind_id
                                },{$push:{rank:{name:req.body.rank,rank_id:doc._id}}},function (error, doc) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        res.json(1);
                                        // console.log("小类更新成功 "); 
                                    }
                                })
                            }
                        });
                        
                    };
                });
            } 
        });
        
    })
    // 切换型号等级
    app.post('/admin/rank_change',function  (req,res,next) {
        var bigtype = global.dbHelper.getModel('bigtype');
        var smalltype = global.dbHelper.getModel('smalltype');
        var Rank = global.dbHelper.getModel('rank');
        bigtype.find({"name":req.body.bigType},{"smallType":{"$elemMatch":{"name":req.body.smallType}},_id:0},function (error, doc) {
            if (error) {
                console.log(error);
            }else if (doc[0]) {
                // console.log("小类已经存在");
                // console.log(doc);
                global.kind_id = doc[0].smallType[0].small_id;
                smalltype.find({"_id":doc[0].smallType[0].small_id},{"rank.name":1,_id:0},function (error, doc) {
                    if (error) {
                        console.log(error);
                    }else{
                        res.json(doc[0].rank);
                        // console.log(doc[0].rank);
                    }
                });
            } 
        });
    })

    //初始状态下的返回的型号等级
    app.get('/admin/rank_data',function(req,res){
        var bigtype = global.dbHelper.getModel('bigtype');
        var smalltype = global.dbHelper.getModel('smalltype');
        bigtype.find({},function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                // console.log(doc);
                // console.log(doc[0].smallType[0].small_id);
                smalltype.find({"_id":doc[0].smallType[0].small_id},{"rank.name":1,_id:0},function (error, doc) {
                    if (error) {
                        console.log(error);
                    }else{
                        res.json(doc[0].rank);
                    }
                });
            }
        });
    });
    
    // 删除型号等级
    app.post('/admin/rank_delete',function  (req,res,next) {
        var bigtype = global.dbHelper.getModel('bigtype');
        var smalltype = global.dbHelper.getModel('smalltype');
        var Rank = global.dbHelper.getModel('rank');
        //先删除型号等级
        bigtype.find({"name":req.body.typeName},{"smallType":{"$elemMatch":{"name":req.body.kindName}},_id:0},function (error, doc) {
            if (error) {
                console.log(error);
            }else if (doc[0]) {
                // console.log(doc[0].smallType[0].small_id);
                smalltype.find({"_id":doc[0].smallType[0].small_id},{"rank":{"$elemMatch":{"name":req.body.rankName}},_id:0},function (error, doc) {
                    if (error) {
                        console.log(error);
                    }else{
                        // console.log(doc[0]);
                        // console.log(doc[0].rank[0].rank_id);
                        Rank.remove({_id:doc[0].rank[0].rank_id},function (error, doc) {
                            if (error) {
                                console.log(error);
                                // console.log(0);
                            }else{
                                res.json(0);
                            }
                        });
                    } 
                });
            } 
        });

        // 删除小类中保存型号等级的数据
        bigtype.find({"name":req.body.typeName},{"smallType":{"$elemMatch":{"name":req.body.kindName}},_id:0},function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                // console.log(doc[0].smallType[0].small_id);
                smalltype.update({"_id":doc[0].smallType[0].small_id},{$pull:{"rank":{name:req.body.rankName}}},function (error, doc) {
                    if (error) {
                        console.log(error);
                    }else {
                        // console.log(doc);  
                        res.json(0);                     
                    } 
                });
            } 
        });
    })

    /*5.商品品牌操作*/
    //商品类别增加
    app.post('/admin/brand',function  (req,res,next) {
        var brand = global.dbHelper.getModel('brand');
        brand.findOne({name: req.body.brandName},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else if (doc) {
                res.json(1)
                // console.log(doc);
            }else {
                brand.create({
                    name: req.body.brandName
                }, function (error, doc) {
                    if (error) {
                        console.log(error);
                        // console.log(2);
                    } else {
                        res.json(3)
                        // console.log(3);
                    }
                });
            }
        });
    })
    // 页面加载获取品牌数据
    app.get('/admin/brand_data',function(req,res){
        var brand = global.dbHelper.getModel('brand');
        brand.find({},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
                // console.log(0);
            }else{
                res.json(doc);
            }
        });
    });
    // 删除商品品牌
    app.delete('/admin/brand_delete',function(req,res){
        var brand = global.dbHelper.getModel('brand');
        brand.remove({name:req.body.name},function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(0);
                console.log(1);
            }
        });
    });

    /*6.包装方式操作*/
    //增加包装方式
    app.post('/admin/packing',function  (req,res,next) {
        var packing = global.dbHelper.getModel('packing');
        packing.findOne({name: req.body.packingName},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else if (doc) {
                res.json(1)
                // console.log(doc);
            }else {
                packing.create({
                    name: req.body.packingName
                }, function (error, doc) {
                    if (error) {
                        console.log(error);
                        // console.log(2);
                    } else {
                        res.json(3)
                        // console.log(3);
                    }
                });
            }
        });
    })
    // 页面加载获取包装方式
    app.get('/admin/packing_data',function(req,res){
        var packing = global.dbHelper.getModel('packing');
        packing.find({},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(doc);
            }
        });
    });
    // 删除包装方式
    app.delete('/admin/packing_delete',function(req,res){
        var packing = global.dbHelper.getModel('packing');
        packing.remove({name:req.body.name},function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(0);
            }
        });
    });

    /*7.运输方式操作*/
    //增加运输方式
    app.post('/admin/transport',function  (req,res,next) {
        var transport = global.dbHelper.getModel('transport');
        transport.findOne({name: req.body.name},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else if (doc) {
                res.json(1)
            }else {
                transport.create({
                    name: req.body.name
                }, function (error, doc) {
                    if (error) {
                        console.log(error);
                        // console.log(2);
                    } else {
                        res.json(3)
                        // console.log(3);
                    }
                });
            }
        });
    })
    // 页面加载获取运输方式
    app.get('/admin/transport_data',function(req,res){
        var transport = global.dbHelper.getModel('transport');
        transport.find({},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(doc);
            }
        });
    });
    // 删除运输方式
    app.delete('/admin/transport_delete',function(req,res){
        var transport = global.dbHelper.getModel('transport');
        transport.remove({name:req.body.name},function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(0);
            }
        });
    });

    /*8.议价方式操作*/
    //增加议价方式
    app.post('/admin/bargain',function  (req,res,next) {
        var bargain = global.dbHelper.getModel('bargain');
        bargain.findOne({name: req.body.name},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else if (doc) {
                res.json(1)
            }else {
                bargain.create({
                    name: req.body.name
                }, function (error, doc) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json(3)
                        // console.log(3);
                    }
                });
            }
        });
    })
    // 页面加载获取运输方式
    app.get('/admin/bargain_data',function(req,res){
        var bargain = global.dbHelper.getModel('bargain');
        bargain.find({},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(doc);
            }
        });
    });
    // 删除运输方式
    app.delete('/admin/bargain_delete',function(req,res){
        var bargain = global.dbHelper.getModel('bargain');
        bargain.remove({name:req.body.name},function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(0);
            }
        });
    });

    /*9.商品标准操作*/
    //增加增商品标准
    app.post('/admin/standard',function  (req,res,next) {
        var standard = global.dbHelper.getModel('standard');
        standard.findOne({name: req.body.name},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else if (doc) {
                res.json(1)
            }else {
                standard.create({
                    name: req.body.name
                }, function (error, doc) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json(3)
                    }
                });
            }
        });
    })
    // 页面加载获取增商品标准
    app.get('/admin/standard_data',function(req,res){
        var standard = global.dbHelper.getModel('standard');
        standard.find({},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(doc);
            }
        });
    });
    // 删除运输方式
    app.delete('/admin/standard_delete',function(req,res){
        var standard = global.dbHelper.getModel('standard');
        standard.remove({name:req.body.name},function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(0);
            }
        });
    });

    /*10.交货方式操作*/
    //增加交货方式
    app.post('/admin/delivery',function  (req,res,next) {
        var delivery = global.dbHelper.getModel('delivery');
        delivery.findOne({name: req.body.name},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else if (doc) {
                res.json(1)
            }else {
                delivery.create({
                    name: req.body.name
                }, function (error, doc) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json(3)
                    }
                });
            }
        });
    })
    // 页面加载获取增交货方式
    app.get('/admin/delivery_data',function(req,res){
        var delivery = global.dbHelper.getModel('delivery');
        delivery.find({},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(doc);
            }
        });
    });
    // 删除交货方式
    app.delete('/admin/delivery_delete',function(req,res){
        var delivery = global.dbHelper.getModel('delivery');
        delivery.remove({name:req.body.name},function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(0);
            }
        });
    });

    /*11.付款方式操作*/
    //增加付款方式
    app.post('/admin/payment',function  (req,res,next) {
        var payment = global.dbHelper.getModel('payment');
        payment.findOne({name: req.body.name},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else if (doc) {
                res.json(1)
            }else {
                payment.create({
                    name: req.body.name
                }, function (error, doc) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json(3)
                    }
                });
            }
        });
    })
    // 页面加载获取增交货方式付款方式
    app.get('/admin/payment_data',function(req,res){
        var payment = global.dbHelper.getModel('payment');
        payment.find({},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(doc);
            }
        });
    });
    // 删除付款方式
    app.delete('/admin/payment_delete',function(req,res){
        var payment = global.dbHelper.getModel('payment');
        payment.remove({name:req.body.name},function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(0);
            }
        });
    });

    /*12.单位操作*/
    //增加单位
    app.post('/admin/unit',function  (req,res,next) {
        var unit = global.dbHelper.getModel('unit');
        unit.findOne({name: req.body.name},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else if (doc) {
                res.json(1)
            }else {
                unit.create({
                    name: req.body.name
                }, function (error, doc) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json(3)
                    }
                });
            }
        });
    })
    // 页面加载获取单位
    app.get('/admin/unit_data',function(req,res){
        var unit = global.dbHelper.getModel('unit');
        unit.find({},{name:1,_id:0}, function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(doc);
            }
        });
    });
    // 删除单位
    app.delete('/admin/unit_delete',function(req,res){
        var unit = global.dbHelper.getModel('unit');
        unit.remove({name:req.body.name},function (error, doc) {
            if (error) {
                console.log(error);
            }else{
                res.json(0);
            }
        });
    });

}