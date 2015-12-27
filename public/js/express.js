$(function() {

	//点击导航的时候提示
	$('#wx-nav > li:eq(3)').addClass('active');
	
	//当鼠标接触在表格行的使用颜色变化控制
	$('#wx-table tbody tr').hover(function () {
		$(this).addClass('wx-tr');
	},function () {
		$(this).removeClass('wx-tr');
	});

	// 分页js引入
    $("#wx-page").createPage({
        pageCount:10,
        current:1,
        backFn:function(p){
            console.log(p); 
        }
    });
    
})