$(function() {
	
	//侧栏颜色
	$('.wx-ullist:eq(2) li:eq(3) a').addClass('wx-click');

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


    /*页面加载时，获取到信息*/
    $.get("/seller_contract_data", function(data){
        var str = "";
        for (var i = 0; i < data.length; i++) {
            var date = new Date(data[i].date).Format("yyyy-MM-dd hh:mm");
            str += "<td>"+data[i]._id+"</td>";   
            str += "<td>"+data[i].kind+"</td>";  
            str += "<td>"+data[i].buyCompany+"</td>";
            str += "<td>"+data[i].sellCompany+"</td>";
            str += "<td>"+date+"</td>";
            str += "<td><a class='btn wx-contractText' href='javascript:void(0)'>查看</a></td>";
            str = "<tr>"+str+"</tr>";
        };
        $('#wx-tbody').html(str);
    })
    

	// 分页js引入
    $(".wx-page").createPage({
        pageCount:10,
        current:1,
        backFn:function(p){
            console.log(p); 
        }
    })

    $(document).on("click",".wx-contractText",function () {
        var id = $(this).parents('tr').find('td').first().text();
        localStorage.contractId = id;
        localStorage.contractTag = 1;
        location.href = "/contract_text";
    })
	
})