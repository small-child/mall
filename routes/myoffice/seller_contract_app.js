module.exports = function ( app ) {
    app.get('/seller_contract',function(req,res){
        if(req.session.user){
        	res.render('seller_contract');
        }else{
            res.redirect('login');
        }
    })

    /*页面加载时，数据返回*/
    app.get('/seller_contract_data',function(req,res){
        if(req.session.user){
            var contract = global.dbHelper.getModel('contract');
            contract.find({"sellerId":req.session.user._id},function (err,doc) {
                if (err) {
                    console.log(err);
                } else{
                    res.json(doc);
                    // console.log(doc);
                }
            })
        }else{
            res.redirect('login');
        }
    })

  

}