module.exports = function ( app ) {
    app.get('/quotation',function(req,res){
        if(req.session.user){
            // console.log(0)
        	res.render('quotation');
        }else{
        	// console.log(1);
            res.redirect('login');
        }
    });

  

}