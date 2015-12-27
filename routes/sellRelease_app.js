module.exports = function ( app ) {
    app.get('/sellRelease',function(req,res){
        if(req.session.user){
            // console.log(0)
        	res.render('sellRelease');
        }else{
        	// console.log(1);
            res.redirect('login');
        }
    });

  

}