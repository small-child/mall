module.exports = function ( app ) {
    app.get('/admin/companyCertification',function(req,res){
        if(req.session.user){
            res.render('admin/companyCertification');
        }else{
            res.redirect('../login');
        }
    })

    /*用户信息*/
    app.get("/admin_user",function(req,res){
      if(req.session.user){
        var user = global.dbHelper.getModel('user');
        user.find({"role":0},{},{sort:{createDate:-1},limit:2},function (err,doc) {
          if (err) {
            console.log(err)
          } else{
            res.json(doc);
          }
        })
      }else{
            res.redirect('../login');
      }
    })

    /*计算数据库有多少为审批的用户*/
    app.get('/admin_user_count',function(req,res){
      if(req.session.user){
        var user = global.dbHelper.getModel('user');
        user.count({"role":0},function (err,doc) {
        if (err) {
          console.log(err);
        } else{
          res.json(doc);
        }
       })
      }else{
        res.redirect('../login');
      }
    })

    /*分页显示*/
    app.get("/admin_user_page/:page",function(req,res){
      if(req.session.user){
            var page = parseInt(req.params.page);
            var user = global.dbHelper.getModel('user');
            user.find({"role":0},{},{sort:{createDate:-1},limit:2,skip:2*(page-1)},function (err,doc) {
            if (err) {
              console.log(err)
            } else{
              res.json(doc);
            }
          })
        }else{
            res.redirect('../login');
        }
    })


}