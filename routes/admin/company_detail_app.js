module.exports = function ( app ) {
    app.get('/admin/company_detail',function(req,res){
      if(req.session.user){
          res.render('admin/company_detail');
      }else{
          res.redirect('../login');
      }
    })
    /*send information of company*/
    app.get('/admin/company_detail/:uid',function(req,res){
        if(req.session.user){
            var company = global.dbHelper.getModel('company');
            company.find({"uId":req.params.uid},function (err,doc) {
            if (err) {
              console.log(err);
            } else{
              if (doc[0] == null) {//null == undefined, result is  true. 
                res.json(0);
                // console.log("null");
              } else{
                res.json(doc);
                // console.log(doc);
              }
            }
          })
        }else{
            res.redirect('/login');
        }
    })

    app.get('/admin/company_access/:uid',function(req,res){
        if(req.session.user){
            var user = global.dbHelper.getModel('user');
            user.find({"_id":req.params.uid},function (err,doc) {
              if (err) {
                console.log(err);
              } else{
                user.update({"_id":req.params.uid},{$set:{"role":1}},function(err,doc){
                  if (err) {
                    console.log(err);
                  } else{
                    res.json(1);
                    // console.log(doc);
                  }
                })
              }
            })
        }else{
            res.redirect('../login');
        }
    })


}