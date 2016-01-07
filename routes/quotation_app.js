module.exports = function ( app ) {
    app.get('/quotation',function(req,res){
        if(req.session.user){
        	res.render('quotation');
        }else{
            res.redirect('login');
        }
    });

  

}