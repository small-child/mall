$(function() {

	//点击导航的时候提示
	$('#wx-nav > li:eq(1)').addClass('active');
	
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

    // 提取商品大类数据
    $('.wx-one-li').each(function(){
    	$(this).mouseover(function() {
    		// console.log($(this).text());
    		localStorage.kind = $(this).text();
    		// alert($(this).text());
    	})
    })

    // 提取商品小类数据
    $('.wx-two-li>a').each(function(){
    	$(this).mouseover(function(){
    		localStorage.type = $(this).text();
    		// console.log($(this).text());
    	})
    })

    // 提取商品等级数据
    $('.wx-three-li>a').each(function(){
    	$(this).mouseover(function(){
    		localStorage.type = $(this).text();
    		console.log($(this).text());
    	})
    })

    
})