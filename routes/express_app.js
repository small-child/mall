module.exports = function ( app ) {
    app.get('/express',function(req,res){
        if(req.session.user){
        	res.render('express');
        }else{
            res.redirect('login');
        }
    });

  

}