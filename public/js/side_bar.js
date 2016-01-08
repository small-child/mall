$(function() {

	//侧栏html代码
	var sideBar = "<p class='wx-ptag'>账户信息</p><ul class='nav nav-pills nav-stacked wx-ullist'><li><a href='javascript:void(0);'>基本信息</a></li><li><a  href='javascript:void(0);'>账户安全</a></li><li><a href='javascript:void(0);'>公司信息</a></li></ul><br><p class='wx-ptag'>我是买家</p><ul class='nav nav-pills nav-stacked wx-ullist'><li><a href='javascript:void(0);'>我的需求</a></li><li><a href='javascript:void(0);'>我的关注</a></li><li><a href='javascript:void(0);'>我的订单</a></li><li><a href='javascript:void(0);'>我的合同</a></li></ul><br><p class='wx-ptag'>我是卖家</p><ul class='nav nav-pills nav-stacked wx-ullist'><li><a href='javascript:void(0);'>我的供应</a></li><li><a href='javascript:void(0);'>我的关注</a></li><li><a href='javascript:void(0);'>我的订单</a></li><li><a href='javascript:void(0);'>我的合同</a></li></ul>";
	//加侧栏代码
	$('#wx-sideBar').html(sideBar);

	//侧栏css代码
	var sidecss = "#wx-sideBar{padding: 0px 30px 30px 30px;}.wx-main a{text-align: center;color: #373737;}.wx-ptag{width: 100%;height: 100%;text-align: center;color: #20B2AA;font-weight: 600px;font-size:16px;}.wx-a a:hover{border: 1px solid #48D1CC;color: red !important;}.wx-click{color:red!important;background: #DCDCDC;border: 1px solid #48D1CC;}";
	//添加css侧栏文件
	$('<style>').html(sidecss).appendTo($('head'));

	// 基本信息
	$('.wx-ullist:eq(0) li:eq(0) a').click(function(){
		location.href='myoffice';
	});

	// 账户安全
	$('.wx-ullist:eq(0) li:eq(1) a').click(function(){
		location.href='count_safe';
	});

	// 公司信息
	$('.wx-ullist:eq(0) li:eq(2) a').click(function(){
		location.href='company_information';
	});

	// 买家-我的需求
	$('.wx-ullist:eq(1) li:eq(0) a').click(function(){
		location.href='/buyer_need';
	});

	// 买家-我的关注
	$('.wx-ullist:eq(1) li:eq(1) a').click(function(){
		location.href='/buyer_attention';
	});

	// 买家-我的订单
	$('.wx-ullist:eq(1) li:eq(2) a').click(function(){
		location.href='/buyer_order';
	});

	// 买家-我的合同
	$('.wx-ullist:eq(1) li:eq(3) a').click(function(){
		location.href='/buyer_contract';
	});

	// 卖家-我的供应
	$('.wx-ullist:eq(2) li:eq(0) a').click(function(){
		location.href='/seller_supply';
	});

	// 卖家-我的关注
	$('.wx-ullist:eq(2) li:eq(1) a').click(function(){
		location.href='/seller_attention';
	});

	// 卖家-我的订单
	$('.wx-ullist:eq(2) li:eq(2) a').click(function(){
		location.href='/seller_order';
	});

	// 卖家-我的合同
	$('.wx-ullist:eq(2) li:eq(3) a').click(function(){
		location.href='/seller_contract';
	});

})