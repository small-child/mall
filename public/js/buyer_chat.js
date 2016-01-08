$(function() {
	
	//侧栏颜色
	$('.wx-ullist:eq(1) li:eq(2) a').addClass('wx-click');
	// console.log(localStorage.buyerOrderId);
	$('#wx-1').text(localStorage.buyerOrderCompany);//公司名称

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


	/*订单详情信息1*/
	$.get("/buyer_chat0/"+localStorage.buyerOrderId, function(data){
        // console.log(data[0]);
        if (data[0].order_status == "已完成") {
            $('#wx-order').attr("disabled",true);
        }
        $('#wx-2').text(data[0].goods_kind);				//商品
        $('#wx-3').text(data[0].order_status);				//订单状态
        $('#wx-5').text(data[0].volume);					//购买数量
        $('#wx-6').text(data[0].unit_price);				//购买单价
        $('#wx-7').text(data[0].unit_price*data[0].volume);	//购买单价
    })
	/*订单详情信息2*/
    $.get("/buyer_chat/"+localStorage.buyerOrderId, function(data){
    	// console.log(data[0]);
        if (data[0].needVolume) {
            var need = data[0].needVolume - data[0].hasBuy;
        } else{
            var need = data[0].volume - data[0].hasSell;
        }
    	var time1 = new Date(data[0].jiaohuo_start);
    	var time2 = new Date(data[0].jiaohuo_end);
        $('#wx-4').text(data[0].unit);			//单位
        $('#wx-8').text(data[0].delivery);		//交货方式
        if (data[0].packing) {
            $('#wx-9').text(data[0].packing);   //包装方式
        }
        $('#wx-10').text(data[0].bargain);		//议价形式
        if (data[0].payment) {
            $('#wx-11').text(data[0].payment);  //付款方式
        }
        $('#wx-12').text(data[0].transport);	//运输方式
        $('#wx-13').text(data[0].address);		//交货地点
        $('#wx-14').text(need);					//需求剩余量
        
        $('#wx-15').text(time1.Format("yyyy-MM-dd")+"至"+time2.Format("yyyy-MM-dd"));		//交货日期

    })

    /*提交订单最终确认价格信息*/
    $('#wx-order').click(function () {

        var num = 0;
        if( $('#wx-18').val()=="" || ( $('#wx-18').val()!="" && !/^[0-9]*[1-9][0-9]*$/.test( $('#wx-18').val()))){
            num=1;
        }

        if( $('#wx-19').val()=="" || ( $('#wx-19').val()!="" && !/^[0-9]*[1-9][0-9]*$/.test($('#wx-19').val()) ) ){
            num=1;
        }

        if ($('#wx-20').val() == "") {
        	var remarks = null
        }else{
        	var remarks = $('#wx-20').val();
        }

        if (num == 1) {
            $('#wx-21').text("单价和数量必须是整数！");
            return false;
        }else if (num == 0) {
            $('#wx-21').text("ok！");
            $.ajax({
                url:'/buyer_chatOrder/'+localStorage.buyerOrderId,
                type:"POST",
                dataType:"json",
                data:{
                    unit_price1:$('#wx-18').val(),
                    volume1:$('#wx-19').val(),
                    remarks:remarks
                },
                success:function(data) {
                    console.log(data)
                    if (data == 0) {
                    	$('#wx-21').text("等待对方确认！");
                    }else if (data ==1) {
                    	$('#wx-21').text("单价与数量与对方信息不符！");
                    }else{
                    	$('#wx-21').text("签约合同！");
                    }
                         
                }
            })
        }
    })

	
})