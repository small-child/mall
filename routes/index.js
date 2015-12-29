module.exports = function ( app ) {
    require('./register_app.js')(app);      //注册
    require('./login_app.js')(app);         //登陆
    require('./index_app.js')(app);         //首页
    require('./sell_app.js')(app);          //我要卖
    require('./sellRelease_app.js')(app);   //发布供应
    require('./quotation_app.js')(app);     //交易详情
    require('./express_app.js')(app); 	    //物流
    require('./aboutUs_app.js')(app); 	    //关于我们
    require('./logout_app.js')(app);        //注销
    require('./myoffice/myoffice_app.js')(app);      //我的办公室-基本信息
    require('./myoffice/count_safe_app.js')(app);    //我的办公室-账户安全
    require('./myoffice/company_information_app.js')(app);//我的办公室-公司信息
    require('./admin/admin_app.js')(app);    //后台管理-入口界面
    require('./admin/type_app.js')(app);    //后台管理-入口界面
};