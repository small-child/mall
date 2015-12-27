module.exports = function ( app ) {
    app.get('/sell',function(req,res){
        if(req.session.user){
            // console.log(0)
        	res.render('sell');
        }else{
        	// console.log(1);
            res.redirect('login');
        }
    });

  

}