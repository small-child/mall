$(function(){

	//点击导航的时候提示
	$('#wx-nav > li:eq(2)').addClass('active');

	/*日历调用*/
	laydate({
        elem: '#wx-16-0'
    });
	laydate({
        elem: '#wx-16-1'
    });
    laydate({
        elem: '#wx-14-0'
    });
	laydate({
        elem: '#wx-14-1'
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

	var time = new Date().Format("yyyy-MM-dd");
	// alert(time2);

	//当上传图片时，显示图片
	
	document.getElementById('wx-19-0').onchange=function() {
		var pic = this.files[0];
		//console.log(pic);
 		var tmpimg = document.createElement('img');
		tmpimg.style.width="100%";
		tmpimg.style.height="100%";
		tmpimg.src = window.URL.createObjectURL(pic); 
		var div = document.getElementById('wx-19-1');
		if (div.firstChild != null) {
			div.removeChild(div.firstChild);
			div.appendChild(tmpimg);
		}else{
			div.appendChild(tmpimg);
		};
	}
	
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

	/*4.包装方式*/
	$.get("/admin/packing_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-4').html(str);        
	});	

	/*5.商品品牌*/
	$.get("/admin/brand_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-5-0').html(str);        
	});	

	/*6.单位*/
	$.get("/admin/unit_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-6').html(str);        
	});	

	/*7.付款方式*/
	$.get("/admin/payment_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-7').html(str);        
	});	

	/*8.议价形式*/
	$.get("/admin/bargain_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-8').html(str);        
	});	

	/*9.交货方式*/
	$.get("/admin/delivery_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-9').html(str);        
	});	

	/*15.运输方式*/
	$.get("/admin/transport_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-15').html(str);        
	});	

	/*17.商品标准
	$.get("/admin/standard_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-17').html(str);        
	});	
	*/
	/*表单验证*/
	$('.wx-input').blur(function(){

    	var $parent = $(this).parents('.col-md-5').next();
    	$parent.find(".formtips").remove();
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
	    //库存量
	    if( $(this).is('#wx-12') ){
	        if( this.value=="" || ( this.value!="" && !/^[0-9]*[1-9][0-9]*$/.test(this.value) ) ){
	            var errorMsg = '输入正整数.';
	            $parent.append('<p class="form-control-static formtips onError" style="color:red;">'+errorMsg+'</p>');
	        }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess" style="color:red;">'+okMsg+'</p>');
	        }
	    }
	    //提货地点 
	    if( $(this).is('#wx-13') ){
	        if( this.value=="" ){
	            var errorMsg = '不能为空.';
	            $parent.append('<p class="form-control-static formtips onError" style="color:red;">'+errorMsg+'</p>');
	        }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess" style="color:red;">'+okMsg+'</p>');
	        }
	    }
	    //交货时间  
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
	    //挂单时间  
	    if( $(this).is('#wx-16-0') ){
	        if( this.value!="" && ($('#wx-14-0').val() > time)){
	        	var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess" style="color:red;">'+okMsg+'</p>');
	        }else{
	            var errorMsg = '&#215;';
	            $parent.append('<p class="form-control-static formtips onError" style="color:red;">'+errorMsg+'</p>');
	        }
	    }
	    if( $(this).is('#wx-16-1') ){
	        if( this.value!="" && ($('#wx-14-1').val() > $('#wx-14-0').val())){
	        	var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess" style="color:red;">'+okMsg+'</p>');	            
	        }else{
	           var errorMsg = '&#215;';
	           $parent.append('<p class="form-control-static formtips onError" style="color:red;">'+errorMsg+'</p>'); 
	        }
	    }
	    // 技术指标 
	    if( $(this).is('#wx-19-0')){
	        if ($('#wx-17 option:selected').text() == "加强型") {
				if( this.value!=""){
		        	var okMsg = '√';
		            $parent.append('<p class="form-control-static formtips onSuccess" style="color:red;">'+okMsg+'</p>');	            
		        }else{
		           var errorMsg = '&#215;';
		           $parent.append('<p class="form-control-static formtips onError" style="color:red;">'+errorMsg+'</p>'); 
		        }
			}
	    }

    }).keyup(function(){
       $(this).triggerHandler("blur");
    }).focus(function(){
         $(this).triggerHandler("blur");
    });//end blur
	//表单验证结束 

	
// console.log($('#wx-17 option:selected').text());
	$('#wx-17').change(function () {
		if ($('#wx-17 option:selected').text() == "加强型") {
			$('#wx-19').show();
		}else if ($('#wx-17 option:selected').text() == "标准型") {
			$('#wx-19').hide();
		};
	})

	$('#wx-btn').click(function ()  {
		$(".wx-input").trigger('blur');			
		var numError = $('form .onError').length;	
		if(numError){				
			alert("登陆失败");
			return false;	
		}else{ 	
			var fd = new FormData();
			fd.append('type', $('#wx-1 option:selected').text());
			fd.append('kind', $('#wx-2 option:selected').text());
			fd.append('rank', $('#wx-3 option:selected').text());
			fd.append('packing', $('#wx-4 option:selected').text());
			if ($('#wx-5-1').val() == "") {
				fd.append('brand', $('#wx-5-0 option:selected').text());
			} else{
				fd.append('brand', $('#wx-5-1').val());
			};
			fd.append('unit', $('#wx-6 option:selected').text());
			fd.append('payment', $('#wx-7 option:selected').text());
			fd.append('bargain', $('#wx-8 option:selected').text());
			fd.append('delivery', $('#wx-9 option:selected').text());
			fd.append('min_deal', $('#wx-10').val());
			fd.append('unit_price', $('#wx-11').val());
			fd.append('volume', $('#wx-12').val());
			fd.append('address', $('#wx-13').val());
			fd.append('jiaohuo_start', $('#wx-14-0').val());
			fd.append('jiaohuo_end', $('#wx-14-1').val());
			fd.append('guadan_start', $('#wx-16-0').val());
			fd.append('guadan_end', $('#wx-16-1').val());
			fd.append('transport', $('#wx-15 option:selected').text());
			if ($('#wx-17 option:selected').text() == "标准型") {
				fd.append('standard', $('#wx-17 option:selected').text());
			} else{
				fd.append('standard', $('#wx-17 option:selected').text());
				fd.append('file1', $('#wx-19-0')[0].files[0]);
			};
			fd.append('remarks', $('#wx-18').val());
			$.ajax({
				url:'/sellRelease',
				type:"POST",
				dataType:"json",
				processData: false,
            	contentType: false,
				data:fd,
				success:function(data) {
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