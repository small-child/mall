$(function() {
	
	//侧栏颜色
	$('.wx-ullist:eq(1) li:eq(2) a').addClass('wx-click');

	//当鼠标接触在表格行的使用颜色变化控制
	$('#wx-table tbody tr').hover(function () {
		$(this).addClass('wx-tr');
	},function () {
		$(this).removeClass('wx-tr');
	});

	Date.prototype.Format = function(fmt)   
    { //author: meizz   
      var o = {   
        "M+" : this.getMonth()+1,                 //月份   
        "d+" : this.getDate(),                    //日   
        "h+" : this.getHours(),                   //小时   
        "m+" : this.getMinutes(),                 //分   
        "s+" : this.getSeconds(),                 //秒   
        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
        "S"  : this.getMilliseconds()             //毫秒   
      };   
      if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
      return fmt;   
    }  

	$.get("/buyer_order_count", function(data){

    	/*页面加载时，获取到信息*/
	    $.get("/buyer_order_data", function(data){
	        var str = "";
	        for (var i = 0; i < data.length; i++) {
	            var date = new Date(data[i].order_date).Format("yyyy-MM-dd-hh-mm");
	            str += "<td>"+data[i]._id+"</td>";     
	            str += "<td>"+data[i].goods_kind+"</td>";
	            str += "<td>"+data[i].sell_company+"</td>";
	            str += "<td>"+date+"</td>";
	            str += "<td>"+data[i].order_status+"</td>";
	            str += "<td><a class='btn wx-chat' href='javascript:void(0)'>洽谈</a></td>";
	            str = "<tr>"+str+"</tr>";
	        };
	        $('#wx-tbody').html(str);
	    })
    
    	// 分页js引入
	    $(".wx-page").createPage({
	        pageCount:Math.ceil(data/2),
	        current:1,
	        backFn:function(p){
	            // console.log(p); 
	            $.get("/buyer_order_page/"+p, function(data){
			        var str = "";
			        for (var i = 0; i < data.length; i++) {
			            var date = new Date(data[i].order_date).Format("yyyy-MM-dd-hh-mm");
			            str += "<td>"+data[i]._id+"</td>";     
			            str += "<td>"+data[i].goods_kind+"</td>";
			            str += "<td>"+data[i].sell_company+"</td>";
			            str += "<td>"+date+"</td>";
			            str += "<td>"+data[i].order_status+"</td>";
			            str += "<td><a class='btn wx-chat' href='javascript:void(0)'>洽谈</a></td>";
			            str = "<tr>"+str+"</tr>";
			        };
			        $('#wx-tbody').html(str);
			    })
	        }
	    });
    })	

	$(document).on("click",".wx-chat",function () {
		var id = $(this).parents('tr').find('td').first().text();
		var Company = $(this).parents('tr').find('td:eq(2)').text();
        localStorage.buyerOrderId = id;
        localStorage.buyerOrderCompany = Company;
        location.href = "/buyer_chat";
	})
	
})