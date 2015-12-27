module.exports = function ( app ) {
    app.get('/index',function(req,res){
        if(req.session.user){
        	// console.log(0);
            res.render('index');
        }else{
        	// console.log(1);
            res.redirect('login');
        }
    });
}