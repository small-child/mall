module.exports = function ( app ) {
    app.get('/aboutUs',function(req,res){
        if(req.session.user){
            // console.log(0)
        	res.render('aboutUs');
        }else{
        	// console.log(1);
            res.redirect('login');
        }
    });

  

}