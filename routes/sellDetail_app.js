module.exports = function ( app ) {
    app.get('/sellDetail',function(req,res){
        if(req.session.user){
            if (req.session.user.role == 0) {
                res.render('error');
            } else{
                res.render('sellDetail');
            }
        }else{
            res.redirect('login');
        }
    })

    /*获取商品详情信息*/
    app.get('/sellDetail_data/:id',function(req,res){
        var buy_release = global.dbHelper.getModel('buy_release');
        buy_release.find({"_id":req.params.id},function (error, doc) {
            if (error) {
                console.log(error);
                // console.log(0);
            }else{
                res.json(doc);
                // console.log(doc)
            }
        });
    });
}