module.exports = function ( app ) {
    app.get('/admin/admin',function(req,res){
        res.render('admin/admin');
    });

  

}