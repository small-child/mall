$(function () {
	//引入css文件
	var footerCss = ".wx-footrBtn{color: black;}.wx-a a:hover{background: #1896ca;color: white;}.wx-chinese{color: white;font-size:15px;}";
	$('<style>').html(footerCss).appendTo($('head'));
	//头文件代码
	var footer ="<div style='background: #efefef;'><div class='container'><div class='row'><div class='col-md-6 wx-a'><a class='btn wx-footrBtn' href='http://www.sinoasphalt.com/'>中国沥青网</a><a class='btn wx-footrBtn' href='javascript:'>中国交通运输部</a><a class='btn wx-footrBtn' href='javascript:'>中国再生沥青网</a><a class='btn wx-footrBtn' href='javascript:'>中国涂料在线</a></div><div class='col-md-6'></div></div></div></div><div style='background:#222222;'><div class='container'><div class='row wx-chinese'><div class='col-md-4'><br><address><strong>南辰供应链管理&#40; 上海&#41;有限公司</strong><br>中国&#40; 上海&#41;自由贸易试验区华申路221号<br><br><abbr title='Phone'>© 2015 南辰供应链管理&#40; 上海&#41;有限公司 <br>All rights reserved </abbr></address></div><div class='col-md-4'><img src='./photos/footer.JPG'></div><div class='col-md-4'><br>全国统一客户热线&#58;<br>18661203020<br><br>客服邮箱&#58;<br>296299180@qq.com</div></div></div></div>";
	
	//加载头文件
	$('#wx-footer').html(footer);

})

