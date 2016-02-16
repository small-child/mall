$(function () {

	/*时间日期格式化*/
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


    // 获取用户信息
    $.get("/admin_user", function(data){
    	// console.log(data[0]);
        var str = "";
        for (var i = 0; i < data.length; i++) {
           	var date = new Date(data[i].createDate).Format("yyyy-MM-dd hh:mm");
           	str += "<td>"+data[i]._id+"</td>";
            str += "<td>"+data[i].name+"</td>";
            str += "<td>"+data[i].email+"</td>";
            str += "<td>"+date+"</td>";
            str += "<td><a class='btn wx-inspect' href='javascript:void(0);'>查看</a></td>";
            str = "<tr>"+str+"</tr>";
        };
        $('#wx-tbody').html(str); 
    });

    /*商品信息总条数*/
    $.get("/admin_user_count", function(data){
        // 分页js引入
	    $(".wx-page").createPage({
	        pageCount:Math.ceil(data/2),
	        current:1,
	        backFn:function(p){
	            $.get("/admin_user_page/"+p, function(data){
                	var str = "";
			        for (var i = 0; i < data.length; i++) {
			           	var date = new Date(data[i].createDate).Format("yyyy-MM-dd hh:mm");
			           	str += "<td>"+data[i]._id+"</td>";
			            str += "<td>"+data[i].name+"</td>";
			            str += "<td>"+data[i].email+"</td>";
			            str += "<td>"+date+"</td>";
			            str += "<td><a class='btn wx-inspect' href='javascript:void(0);'>查看</a></td>";
			            str = "<tr>"+str+"</tr>";
			        };
			        $('#wx-tbody').html(str); 
            	})
	        }
	    })
    })

    /*查看没有认证用户发布的信息*/
    $(document).on('click','.wx-inspect',function(){
        var id = $(this).parents('tr').find('td').first().text();
        // console.log(id);
        localStorage.admin_inspectId = id;
        location.href = "company_detail";
    })

})