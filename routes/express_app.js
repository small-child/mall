module.exports = function ( app ) {
    app.get('/express',function(req,res){
        if(req.session.user){
            // console.log(0)
        	res.render('express');
        }else{
        	// console.log(1);
            res.redirect('login');
        }
    });

  

}