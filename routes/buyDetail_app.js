module.exports = function ( app ) {
    app.get('/buyDetail',function(req,res){
        if(req.session.user){
            if (req.session.user.role == 0) {
                res.render('error');
            } else{
                res.render('buyDetail');
            }
        }else{
            res.redirect('login');
        }
    });

    /*获取商品详情信息*/   
    app.get('/buyDetail_data/:id',function(req,res){
        // console.log(req.params);
        var sell_release = global.dbHelper.getModel('sell_release');
        sell_release.find({"_id":req.params.id},function (error, doc) {
            if (error) {
                console.log(error);
                // console.log(0);
            }else{
                res.json(doc);
                // console.log(1);
            }
        });
    });

}