$(function() {
	//点击导航的时候提示
	$('#wx-nav > li:eq(1)').addClass('active');

	// console.log(localStorage.buy_id);//获取的商品id

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

	/*页面加载后获取商品详情信息*/
	/*初始状态下*/
    $.get("/buyDetail_data/"+localStorage.buy_id, function(data){
        // console.log(data[0]);
        var guadan_start = new Date(data[0].guadan_start);
        var jiaohuo_start = new Date(data[0].jiaohuo_start);
        var guadan_end = new Date(data[0].guadan_end);
        var jiaohuo_end = new Date(data[0].jiaohuo_end);
        localStorage.buyDetail_uid = data[0].uid;
        localStorage.buyDetail_companyName = data[0].company;
        localStorage.buyDetail_kind = data[0].kind;
    	$('#wx-1').text(data[0].brand);
        $('#wx-2').text(data[0].packing);
        $('#wx-3').text(data[0].unit_price);
        $('#wx-4').text(data[0].address);
        $('#wx-5').text(data[0].unit);
        $('#wx-6').text(data[0].email);
        $('#wx-7').text(data[0].bargain);
        $('#wx-8').text(data[0].transport);
        $('#wx-9').text(data[0].delivery);
        $('#wx-10').text(data[0].min_deal);
        $('#wx-11').text(data[0].company);
        $('#wx-12').text(data[0].kind);
        $('#wx-13').text(guadan_start.Format("yyyy-MM-dd"));
        $('#wx-14').text(jiaohuo_start.Format("yyyy-MM-dd"));
        $('#wx-15').text(data[0].volume);
        $('#wx-16').text(data[0].payment);
        $('#wx-17').text(data[0].remarks);
        $('#wx-18').text(data[0].rank);
        $('#wx-19').text(guadan_end.Format("yyyy-MM-dd"));
        $('#wx-20').text(jiaohuo_end.Format("yyyy-MM-dd"));
        $('#wx-21').text(data[0].hasSell);
        $('#wx-22').text(data[0].uname);
        // 检测是不是加强型
        if (data[0].file1) {
            $('#wx-paragrams').html("<img src='"+"picture/sellRelease/"+data[0].file1+"' style='width:100%;height:100%'>");
        }else {
            $('#wx-paragrams').html("<img src='"+"picture/standard/2.jpg' style='width:100%;height:100%'>");
        }
    }); 

    /*点击关注*/
    $('#wx-23').click(function () {
        $.get("/buyer_attention/"+localStorage.buy_id, function(data){
            if (data == 1) {
                $('#wx-25').show().text("已经存在");
            } else if (data = 3) {
                $('#wx-25').show().text("关注成功");
            }
        })
    })

    /*提交售卖信息*/
    $('#wx-32').click(function () {

        var volume = $('#wx-15').text()-$('#wx-21').text();
        var juge = ($('#wx-28').val() > volume);
        // console.log(juge)
        var num = 0;
        if( $('#wx-28').val()=="" || ( $('#wx-28').val()!="" && !/^[0-9]*[1-9][0-9]*$/.test( $('#wx-28').val())) || juge ){
            num=1;
        }

        if( $('#wx-30').val()=="" || ( $('#wx-30').val()!="" && !/^[0-9]*[1-9][0-9]*$/.test($('#wx-30').val()) ) ){
            num=1;
        }

        if (num == 1) {
            $('#wx-31').text("出售量和报价皆为整数，并且出售量不大于顾客需求量！");
            return false;
        }else if (num == 0) {
            $('#wx-31').text("ok！");
            /*
            console.log(localStorage.buy_id);
            console.log(localStorage.buyDetail_uid);
            console.log(localStorage.buyDetail_companyName);
            console.log(localStorage.buyDetail_kind);
            */
            $.ajax({
                url:'/buy_order',
                type:"POST",
                dataType:"json",
                data:{
                    goods_id:localStorage.buy_id,
                    seller_id:localStorage.buyDetail_uid,
                    sell_company:localStorage.buyDetail_companyName,
                    goods_kind:localStorage.buyDetail_kind,
                    goods_rank:$('#wx-18').text(),
                    volume:$('#wx-28').val(),
                    unit_price:$('#wx-30').val(),
                    role:1,
                    order_time:new Date().Format("yyyy-MM-dd"),
                    order_date:new Date()
                },
                success:function(data) {
                    console.log(data)
                    if (data == 1) {
                        location.href='/buyer_order';
                    } else{
                        $('#wx-31').text("购买失败，请重试！");
                    }       
                }
            })
            
        }
    })




})