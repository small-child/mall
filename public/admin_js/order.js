$(function() {



    /*日历调用*/
    laydate({
        elem: '#wx-5'
    });

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
    $.get("/admin_order", function(data){
    	// console.log(data[0]);
        var str = "";
        for (var i = 0; i < data.length; i++) {
           	var date = new Date(data[i].order_date).Format("yyyy-MM-dd hh:mm");
           	str += "<td>"+data[i].goods_kind+"</td>";
            str += "<td>"+data[i].buy_company+"</td>";
            str += "<td>"+data[i].sell_company+"</td>";
            
            if (data[i].over == 0) {
                str += "<td>"+data[i].unit_price+"</td>";
                str += "<td>"+data[i].volume+"</td>";
                str += "<td>否</td>";
            } else{
                str += "<td>"+data[i].unit_price1+"</td>";
                str += "<td>"+data[i].volume1+"</td>";
                str += "<td>是</td>";
            }
            str += "<td>"+date+"</td>";
            str = "<tr>"+str+"</tr>";
        };
        $('#wx-tbody').html(str); 
    })

    /*商品信息总条数*/
    $.get("/admin_order_count", function(data){
        // 分页js引入
        $(".wx-page").createPage({
            pageCount:Math.ceil(data/2),
            current:1,
            backFn:function(p){
                $.get("/admin_order_page/"+p, function(data){
                    // console.log(data)
                    var str = "";
                    for (var i = 0; i < data.length; i++) {
                        var date = new Date(data[i].order_date).Format("yyyy-MM-dd hh:mm");
                        str += "<td>"+data[i].goods_kind+"</td>";
                        str += "<td>"+data[i].buy_company+"</td>";
                        str += "<td>"+data[i].sell_company+"</td>";
                        
                        if (data[i].over == 0) {
                            str += "<td>"+data[i].unit_price+"</td>";
                            str += "<td>"+data[i].volume+"</td>";
                            str += "<td>否</td>";
                        } else{
                            str += "<td>"+data[i].unit_price1+"</td>";
                            str += "<td>"+data[i].volume1+"</td>";
                            str += "<td>是</td>";
                        }
                        str += "<td>"+date+"</td>";
                        str = "<tr>"+str+"</tr>";
                    };
                    $('#wx-tbody').html(str); 
                })
            }
        })
    })

    // 获取交易总额
    $.get("/admin_orderTotal", function(data){
        // console.log(data[0].num); 
        $('#wx-total').text(data[0].num);
    })

    // 获取时间段交易额
    $('#wx-order').click(function(){
        // console.log(typeof $('#wx-5').val());
        var time = $('#wx-5').val();
       $.get("/admin_orderSum/"+time, function(data){
            // console.log(data[0]); 
            $('#wx-sum').text(data[0].num);
        }) 
    })
    


})
