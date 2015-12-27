module.exports = function ( app ) {
    app.get('/myoffice',function(req,res){
        if(req.session.user){
        	res.render('myoffice');
        }else{
            res.redirect('login');
        }
    });


    app.get('/myoffice_data',function(req,res){
            res.json({name:req.session.user.name,email:req.session.user.email});
    });

}