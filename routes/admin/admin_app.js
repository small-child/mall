module.exports = function ( app ) {
    app.get('/admin/admin',function(req,res){
        if(req.session.user){
          	res.render('admin/admin');
      	}else{
          	res.redirect('../login');
      	}
    })

  

}