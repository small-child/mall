module.exports = function ( app ) {
    app.get('/index',function(req,res){
        // if(req.session.user){
            res.render('index');
        // }else{
            // res.redirect('login');
        // }
    })

    


}