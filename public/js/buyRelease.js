$(function(){

	//点击导航的时候提示
	$('#wx-nav > li:eq(1)').addClass('active');

	//当上传图片时，显示图片
	document.getElementById('wx-16').onchange=function() {
		var pic = this.files[0];
		//console.log(pic);
 		var tmpimg = document.createElement('img');
		tmpimg.style.width="100%";
		tmpimg.style.height="100%";
		tmpimg.src = window.URL.createObjectURL(pic); 
		var div = document.getElementById('wx-standard-pic');
		if (div.firstChild != null) {
			div.removeChild(div.firstChild);
			div.appendChild(tmpimg);
		}else{
			div.appendChild(tmpimg);
		};
	}

	/*时间日期格式化*/
    Date.prototype.Format = function(fmt)   
    {   
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

    var time = new Date().Format("yyyy-MM-dd");


	/*日历调用*/
    laydate({
        elem: '#wx-13-0'
    });
    laydate({
        elem: '#wx-13-1'
    });
    laydate({
        elem: '#wx-14-0'
    });
    laydate({
        elem: '#wx-14-1'
    });

	/*1.商品种类*/
	$.get("/admin/type_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-1').html(str);    
	});	 

	/*2.商品小类*/
	$.get("/admin/kind_data", function(data){
		var str = "";
		for (var i = 0; i < data.length; i++) {
			str+="<option>"+data[i].name+"</option>";
		};
	    $('#wx-2').html(str);            	  
	});	

	// 商品小类切换
	$('#wx-1').change(function () {
		var value = this.value;
		$.ajax({
			url:'/admin/kind_change',
			type:"POST",
			dataType:"json",
			data:{
				name:value
			},
			success:function(data) {
				var str = "";
				for (var i = 0; i < data.length; i++) {
					str+="<option>"+data[i].name+"</option>";
				};
			    $('#wx-2').html(str);    
			}
		});	
	})

	/*3.型号等级*/ 
	$.get("/admin/rank_data", function(data){
		// console.log(data);
		var str = "";
		for (var i = 0; i < data.length; i++) {
			str+="<option>"+data[i].name+"</option>";
		};
		$('#wx-3').html(str);      		  
	});	

	// 切换型号等级
	$('#wx-2').change(function () {
		var value = this.value;
		$.ajax({
			url:'/admin/rank_change',
			type:"POST",
			dataType:"json",
			data:{
				bigType:$('#wx-1 option:selected').text(),
				smallType:$('#wx-2 option:selected').text()
			},
			success:function(data) {
				// console.log(data);
				var str = "";
				for (var i = 0; i < data.length; i++) {
					str+="<option>"+data[i].name+"</option>";
				};
			    $('#wx-3').html(str);      		  
			}
		});	
	})

	/*4.商品品牌*/
	$.get("/admin/brand_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-4').html(str);        
	});	

	/*5.议价形式*/
	$.get("/admin/bargain_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-5').html(str);        
	});	

	/*6.交货方式*/
	$.get("/admin/delivery_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-6').html(str);        
	});

	/*7.单位*/
	$.get("/admin/unit_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-7').html(str);        
	});	

	/*8.运输方式*/
	$.get("/admin/transport_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-8').html(str);        
	});	

	/*17.包装方式*/
	$.get("/admin/packing_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-17').html(str);        
	});	

	/*18.付款方式*/
	$.get("/admin/payment_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-18').html(str);        
	});	

	/*表单验证*/
	$('.wx-input').blur(function(){

    	var $parent = $(this).parents('.col-md-5').next();
    	$parent.find(".formtips").remove();
    	//需求量
	    if( $(this).is('#wx-9') ){
	        if( this.value=="" || ( this.value!="" && !/^[0-9]*[1-9][0-9]*$/.test(this.value) ) ){
	            var errorMsg = '输入正整数.';
	            $parent.append('<p class="form-control-static formtips onError" style="color:red;">'+errorMsg+'</p>');
	        }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess" style="color:red;">'+okMsg+'</p>');
	        }
	    }
     	//最低成交量
	    if( $(this).is('#wx-10') ){
	        if( this.value=="" || ( this.value!="" && !/^[0-9]*[1-9][0-9]*$/.test(this.value) ) ){
	            var errorMsg = '输入正整数.';
	            $parent.append('<p class="form-control-static formtips onError" style="color:red;">'+errorMsg+'</p>');
	        }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess" style="color:red;">'+okMsg+'</p>');
	        }
	    }
	    //单价
	    if( $(this).is('#wx-11') ){
	        if( this.value=="" || ( this.value!="" && !/^[0-9]*[1-9][0-9]*$/.test(this.value) ) ){
	            var errorMsg = '输入正整数.';
	            $parent.append('<p class="form-control-static formtips onError" style="color:red;">'+errorMsg+'</p>');
	        }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess" style="color:red;">'+okMsg+'</p>');
	        }
	    }
	    
	    //提货地点 
	    if( $(this).is('#wx-12') ){
	        if( this.value=="" ){
	            var errorMsg = '不能为空.';
	            $parent.append('<p class="form-control-static formtips onError" style="color:red;">'+errorMsg+'</p>');
	        }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess" style="color:red;">'+okMsg+'</p>');
	        }
	    }
	    //交货时间  
	    if( $(this).is('#wx-13-0') ){
	        if( this.value!="" && ($('#wx-13-0').val() > time)){
	        	var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess" style="color:red;">'+okMsg+'</p>');
	        }else{
	            var errorMsg = '&#215;';
	            $parent.append('<p class="form-control-static formtips onError" style="color:red;">'+errorMsg+'</p>');
	        }
	    }
	    if( $(this).is('#wx-13-1') ){
	        if( this.value!="" && ($('#wx-13-1').val() > $('#wx-13-0').val())){
	        	var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess" style="color:red;">'+okMsg+'</p>');	            
	        }else{
	           var errorMsg = '&#215;';
	           $parent.append('<p class="form-control-static formtips onError" style="color:red;">'+errorMsg+'</p>'); 
	        }
	    }
	    //挂单时间  
	    if( $(this).is('#wx-14-0') ){
	        if( this.value!="" && ($('#wx-14-0').val() > time)){
	        	var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess" style="color:red;">'+okMsg+'</p>');
	        }else{
	            var errorMsg = '&#215;';
	            $parent.append('<p class="form-control-static formtips onError" style="color:red;">'+errorMsg+'</p>');
	        }
	    }

	    if( $(this).is('#wx-14-1') ){
	        if( this.value!="" && ($('#wx-14-1').val() > $('#wx-14-0').val())){
	        	var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess" style="color:red;">'+okMsg+'</p>');	            
	        }else{
	           var errorMsg = '&#215;';
	           $parent.append('<p class="form-control-static formtips onError" style="color:red;">'+errorMsg+'</p>'); 
	        }
	    }

    }).keyup(function(){
       $(this).triggerHandler("blur");
    }).focus(function(){
         $(this).triggerHandler("blur");
    });//end blur
	//表单验证结束 

	$('#wx-btn').click(function ()  {
		$(".wx-input").trigger('blur');			
		var numError = $('form .onError').length;	
		if(numError){				
			alert("提交失败");
			return false;	
		}else{ 	
			// alert("提交成功")
			var fd = new FormData();
			fd.append('type', $('#wx-1 option:selected').text());
			fd.append('kind', $('#wx-2 option:selected').text());
			fd.append('rank', $('#wx-3 option:selected').text());
			fd.append('brand', $('#wx-4 option:selected').text());
			fd.append('bargain', $('#wx-5 option:selected').text());
			fd.append('delivery', $('#wx-6 option:selected').text());
			fd.append('unit', $('#wx-7 option:selected').text());
			fd.append('packing', $('#wx-17 option:selected').text());
			fd.append('payment', $('#wx-18 option:selected').text());
			fd.append('transport', $('#wx-8 option:selected').text());
			fd.append('needVolume', $('#wx-9').val());
			fd.append('min_deal', $('#wx-10').val());
			fd.append('unit_price', $('#wx-11').val());
			fd.append('address', $('#wx-12').val());
			fd.append('jiaohuo_start', $('#wx-13-0').val());
			fd.append('jiaohuo_end', $('#wx-13-1').val());
			fd.append('guadan_start', $('#wx-14-0').val());
			fd.append('guadan_end', $('#wx-14-1').val());
			fd.append('remarks', $('#wx-15').val());
			if ($('#wx-16').val() != "") {
				fd.append('file1', $('#wx-16')[0].files[0]);
			}			
			$.ajax({
				url:'/buyRelease',
				type:"POST",
				dataType:"json",
				processData: false,
            	contentType: false,
				data:fd,
				success:function(data) {
					console.log(data)
					if (data == 0) {
						alert("发布成功");
						$('#wx-btn').attr("disabled",true);//发布成功，按钮不可以使用
					} else{
						alert("发布失败");
					};
				}
			})
		}

	})



})