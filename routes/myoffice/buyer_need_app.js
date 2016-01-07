module.exports = function ( app ) {
    app.get('/buyer_need',function(req,res){
        if(req.session.user){
            res.render('buyer_need');
        }else{
            res.redirect('login');
        }
    })

    /*计算数据库有多少商品信息*/
    app.get('/buyer_need_count',function(req,res){
        if(req.session.user){
            var buy_release = global.dbHelper.getModel('buy_release');
            buy_release.count({"uid":req.session.user._id},function (err,doc) {
                if (err) {
                    console.log(err);
                } else{
                    res.json(doc);
                };
            })
        }else{
            res.redirect('login');
        }
        
    });

    /*页面加载时，数据返回*/
    app.get('/buyer_need_data',function(req,res){
        if(req.session.user){
            var buy_release = global.dbHelper.getModel('buy_release');
            buy_release.find({"uid":req.session.user._id},{"brand":1,"kind":1,"needVolume":1,"hasBuy":1,"min_deal":1,
            "unit_price":1,"unit":1,"jiaohuo_start":1,"jiaohuo_end":1,"address":1},{sort:{date:-1},limit:2},function (error, doc) {
                if (error) {
                    console.log(error);
                    // console.log(0);
                }else{
                    res.json(doc);
                    // console.log(doc);
                }
            });
        }else{
            res.redirect('login');
        }
    });
    

    /*查询数据分页显示*/
    app.get('/buyer_need_page/:page',function(req,res){
        if(req.session.user){
            var page = parseInt(req.params.page);
            var buy_release = global.dbHelper.getModel('buy_release');
            buy_release.find({"uid":req.session.user._id},{"brand":1,"kind":1,"needVolume":1,"hasBuy":1,"min_deal":1,
            "unit_price":1,"unit":1,"jiaohuo_start":1,"jiaohuo_end":1,"address":1},{sort:{date:-1},limit:2,skip:2*(page-1)},function (error, doc) {
                if (error) {
                    console.log(error);
                    // console.log(0);
                }else{
                    res.json(doc);
                    // console.log(doc);
                }
            });
        }else{
            res.redirect('login');
        }
    });



}