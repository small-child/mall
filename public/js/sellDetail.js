$(function() {
	//点击导航的时候提示
	$('#wx-nav > li:eq(2)').addClass('active');


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
    $.get("/sellDetail_data/"+localStorage.sell_id, function(data){
        var guadan_start = new Date(data[0].guadan_start);
        var jiaohuo_start = new Date(data[0].jiaohuo_start);
        var guadan_end = new Date(data[0].guadan_end);
        var jiaohuo_end = new Date(data[0].jiaohuo_end);
        // console.log(data[0]._id)
        localStorage.sellDetail_uid = data[0].uid;
        localStorage.sellDetail_companyName = data[0].company;
        localStorage.sellDetail_kind = data[0].kind;
        $('#wx-1').text(data[0].brand);
        $('#wx-2').text(data[0].packing);
        $('#wx-3').text(data[0].unit_price);
        $('#wx-4').text(data[0].address);
        $('#wx-5').text(data[0].unit);
        $('#wx-29').text(data[0].unit);
        $('#wx-6').text(data[0].uemail);
        $('#wx-7').text(data[0].bargain);
        $('#wx-8').text(data[0].transport);
        $('#wx-9').text(data[0].delivery);
        $('#wx-10').text(data[0].min_deal);
        $('#wx-11').text(data[0].company);
        if (data[0].file1) {
            $('#wx-12').html("<img src='"+"picture/buyRelease/"+data[0].file1+"' style='width:100%;height:100%'>");
        }else {
            $('#wx-paragrams').html("<img src='"+"picture/standard/2.jpg' style='width:100%;height:100%'>");
        };
        $('#wx-13').text(data[0].kind);
        $('#wx-14').text(guadan_start.Format("yyyy-MM-dd"));
        $('#wx-15').text(jiaohuo_start.Format("yyyy-MM-dd"));
        $('#wx-16').text(data[0].needVolume);
        $('#wx-18').text(data[0].remarks);
        $('#wx-19').text(data[0].rank);
        $('#wx-20').text(guadan_end.Format("yyyy-MM-dd"));
        $('#wx-21').text(jiaohuo_end.Format("yyyy-MM-dd"));
        $('#wx-22').text(data[0].hasBuy);
        $('#wx-23').text(data[0].uname);
    }); 

	/*点击关注*/
    $('#wx-24').click(function () {
        $.get("/seller_attention/"+localStorage.sell_id, function(data){
            if (data == 1) {
                // console.log("已经存在");
                $('#wx-26').show().text("已经存在");
            } else if (data = 3) {
                // location.href = "/seller_attention";
                $('#wx-26').show().text("关注成功");
            }
        })
    })

    /*提交售卖信息*/
    $('#wx-32').click(function () {

        var volume = $('#wx-16').text()-$('#wx-22').text();
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
            $.ajax({
                url:'/sell_order',
                type:"POST",
                dataType:"json",
                data:{
                    goods_id:localStorage.sell_id,
                    buyer_id:localStorage.sellDetail_uid,
                    buy_company:localStorage.sellDetail_companyName,
                    goods_kind:localStorage.sellDetail_kind,
                    volume:$('#wx-28').val(),
                    role:0,
                    unit_price:$('#wx-30').val(),
                    order_date:new Date()
                },
                success:function(data) {
                    console.log(data)
                    if (data == 1) {
                        location.href='/seller_order';
                    } else{
                        $('#wx-31').text("售卖失败，请重试！");
                    }       
                }
            })
        }
    })

	
})