$(function(){

	//倒计时参数
	localStorage.login=0;//默认状态未登录
	var InterValObj; //timer变量，控制时间
	var count = 10; //间隔函数，1秒执行
	var curCount;//当前剩余秒数
	var testcode;//验证码
	$("#wx-getcode").attr("disabled", "true");//默认获取邮箱验证码按钮出事状态不可以点击

	// 表单验证开始
	$('.wx-input').blur(function(){

    	var $parent = $(this).parent().siblings('.wx-required');
    	$parent.find(".formtips").remove();
    	
     	//验证手机号
	    if( $(this).is('#wx-user') ){
	        if( this.value=="" || ( this.value!="" && !/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(this.value) ) ){
	            var errorMsg = '请输入正确的手机号.';
	            $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
	        }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
	        }
	    }

	    //验证密码1
        if( $(this).is('#wx-password1') ){
            if( this.value=="" || ( this.value!="" && !/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/.test(this.value) ) ){
                var errorMsg = '请输入密码正确格式.';
                $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
            }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
	        }
        }

        //验证密码2
		if( $(this).is('#wx-password2') ){
            if($('#wx-password1').val() != $('#wx-password2').val()){
                var errorMsg = '两次密码输入不一致.';
                $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
            }else{
                var okMsg = '√';
                $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
            }
        }
        
        //验证邮件
        if( $(this).is('#wx-inputEmai') ){
            if( this.value=="" || ( this.value!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) ){
                var errorMsg = '请输入正确的E-Mail地址.';
                $("#wx-getcode").attr("disabled", "true");
                $parent.append('<p id="wx-emailTag" class="form-control-static formtips onError">'+errorMsg+'</p>');
            }else{
                var okMsg = '√';
                 $("#wx-getcode").removeAttr("disabled");//启用按钮
                $parent.append('<p id="wx-emailTag" class="form-control-static formtips onSuccess">'+okMsg+'</p>');
            }
        }	

        //邮箱验证码
        if( $(this).is('#wx-inputEmail3') ){
            if( this.value == localStorage.email_code){
            	var okMsg = '√';
                $parent.append('<p id="wx-emailTag" class="form-control-static formtips onSuccess">'+okMsg+'</p>');
            }else{
                var errorMsg = '验证码错误.';
                $parent.append('<p id="wx-emailTag" class="form-control-static formtips onError">'+errorMsg+'</p>');
            }
        }	


    }).keyup(function(){
       $(this).triggerHandler("blur");
    }).focus(function(){
         $(this).triggerHandler("blur");
    });//end blur
	//表单验证结束 


    //邮箱验证码发送
	$('#wx-getcode').click(function() {				
		$.ajax({				
			url:'/email',
			type:"POST", 
			dataType:"json",
			data:{
				email:$('#wx-inputEmai').val()
			},
			success:function(data){
				localStorage.email_code = data; 
				//设置button效果，开始计时
				curCount = count;
				$("#wx-getcode").attr("disabled", "true");
				$("#wx-getcode").html("请在" + curCount + "秒内输入验证码");
				InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
			}				
		});	
						
	})

	// 定时器
	function SetRemainTime() {
	    if (curCount == 0) {                
	        window.clearInterval(InterValObj);//停止计时器
	        $("#wx-getcode").removeAttr("disabled");//启用按钮
	        $("#wx-getcode").html("重新发送验证码");
	    }
	    else {
	        curCount--;
	        $("#wx-getcode").html("请在" + curCount + "秒内输入验证码");
	    }
	}

	//提交，最终验证。
    $('.wx-registerSend').click(function(){
		 
		$(".wx-input").trigger('blur');			
		var numError = $('form .onError').length;		
		if(numError){				
			// alert("注册失败");
			return false;	
		}else{ 			
			$.ajax({
				url:'/register',
				type:"POST",
				dataType:"json",
				data:{
					uname:$('#wx-user').val(),
					upwd:$('#wx-password1').val(),
					email:$('#wx-inputEmai').val(),
					tag:"failure"
				},
				success:function(data) {
					if (data == 1) {
						alert("用户名已存在");
						location.href='register';
					} else if(data == 3){
						alert("用户注册成功");
						location.href='login';
					}else{
						alert("注册失败");
						location.href='register';
					}			
				}
			});	
			
		}          
    })

})