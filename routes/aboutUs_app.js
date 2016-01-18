module.exports = function ( app ) {
    app.get('/aboutUs',function(req,res){
        if(req.session.user){
        	res.render('aboutUs');
        }else{
            res.redirect('login');
        }
    });

  

}