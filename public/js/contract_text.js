$(function() {
	// console.log(localStorage.contractId);
	$('#wx-1').text(localStorage.contractId); //合同编号
    /*print*/
    $('#wx-print').click(function () {
        $("#print").jqprint();
    });

    var digitUppercase = function(n) {  
        var fraction = ['角', '分'];  
        var digit = [  
            '零', '壹', '贰', '叁', '肆',  
            '伍', '陆', '柒', '捌', '玖'  
        ];  
        var unit = [  
            ['元', '万', '亿'],  
            ['', '拾', '佰', '仟']  
        ];  
        var head = n < 0 ? '欠' : '';  
        n = Math.abs(n);  
        var s = '';  
        for (var i = 0; i < fraction.length; i++) {  
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');  
        }  
        s = s || '整';  
        n = Math.floor(n);  
        for (var i = 0; i < unit[0].length && n > 0; i++) {  
            var p = '';  
            for (var j = 0; j < unit[1].length && n > 0; j++) {  
                p = digit[n % 10] + unit[1][j] + p;  
                n = Math.floor(n / 10);  
            }  
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;  
        }  
        return head + s.replace(/(零.)*零元/, '元')  
            .replace(/(零.)+/g, '零')  
            .replace(/^整$/, '零元整');  
    };  

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
    $.get("/contract_data0/"+localStorage.contractId, function(data){
        // console.log(data[0])
        var time = new Date(data[0].date).Format("yyyy-MM-dd hh:mm");
        $('#wx-2').text(time);  			   //签订时间
        $('#wx-3').text(data[0].sellCompany);  //出卖人
        $('#wx-4').text(data[0].buyCompany);   //买受人
        $('#wx-5').text(data[0].kind);  	   //产品名称
    })

    /*页面加载时，获取到信息*/
    $.get("/contract_data1/"+localStorage.contractId, function(data){
        // console.log(data[0]);
        $('#wx-6').text(data[0].volume1);  						//数量
        $('#wx-7').text(data[0].unit_price1);  					//单价
        $('#wx-8').text(data[0].volume1*data[0].unit_price1);   //金额  
        $('#wx-10').text(digitUppercase(data[0].volume1*data[0].unit_price1));  //大写金额        
    })

    /*页面加载时，获取到信息*/
    $.get("/contract_data2/"+localStorage.contractId, function(data){
        // console.log(data[0]);
        var time1 = new Date(data[0].jiaohuo_start).Format("yyyy-MM-dd");
        var time2 = new Date(data[0].jiaohuo_end).Format("yyyy-MM-dd");
        $('#wx-9').text(time1+"至"+time2);  						//交货时间
        $('#wx-11').text(data[0].packing);  						//包装方式
        $('#wx-12').text(data[0].address);  						//交货地点
        $('#wx-13').text(data[0].transport);  						//运输方式
        $('#wx-14').text(data[0].payment);  						//结算方式
    })

    // console.log(localStorage.contractTag);
    var role = localStorage.contractTag;

    /*点击签订合同*/
    $('#wx-btn').click(function(){
        /*合同需要信息上传*/
    	$.get("/contract_data3/"+role+"/"+localStorage.contractId, function(data){
	        if (role == 0) {
	        	$('#wx-20').attr("src","picture/certification/"+data[0].picture5);
	        	$('#wx-21').text(data[0].legal_person);
	        	$('#wx-22').text(data[0].agent);
	        	$('#wx-23').text(data[0].company_bank);
	        	$('#wx-24').text(data[0].company_bankNum);
	        } else{
	        	$('#wx-15').attr("src","picture/certification/"+data[0].picture5);
	        	$('#wx-16').text(data[0].legal_person);
	        	$('#wx-17').text(data[0].agent);
	        	$('#wx-18').text(data[0].company_bank);
	        	$('#wx-19').text(data[0].company_bankNum);
	        }
	    })

        /*修改contract和发布信息*/
        $.get("/contract_data4/"+role+"/"+localStorage.contractId, function(data){
            // console.log(data)
            $('#wx-tishi').text(data);
        })

    })

    /*合同签订完毕后，就直接插入信息*/
    $.get("/contract_data5/"+localStorage.contractId, function(data){
        // console.log(data[0]);
        /*先获取买家信息*/
        if (data[0].buyerTag == 1) {
            $.get("/contract_data6/"+localStorage.contractId, function(data){
                // console.log(data[0])
                $('#wx-20').attr("src","picture/certification/"+data[0].picture5);
                $('#wx-21').text(data[0].legal_person);
                $('#wx-22').text(data[0].agent);
                $('#wx-23').text(data[0].company_bank);
                $('#wx-24').text(data[0].company_bankNum);
            })
        }
        /*先获取买家信息*/
        if (data[0].sellerTag == 1) {
            $.get("/contract_data7/"+localStorage.contractId, function(data){
                $('#wx-15').attr("src","picture/certification/"+data[0].picture5);
                $('#wx-16').text(data[0].legal_person);
                $('#wx-17').text(data[0].agent);
                $('#wx-18').text(data[0].company_bank);
                $('#wx-19').text(data[0].company_bankNum);
            })
        }


    })



    


	
})