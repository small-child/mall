module.exports = function ( app ) {
	app.get('/admin/user_company',function(req,res){
      	if(req.session.user){
          	res.render('admin/user_company');
     	}else{
          	res.redirect('../login');
      	}
    })
}