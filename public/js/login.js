$(function(){
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

    }).keyup(function(){
       $(this).triggerHandler("blur");
    }).focus(function(){
         $(this).triggerHandler("blur");
    });//end blur
	//表单验证结束 
    
	localStorage.login=0;
	// console.log(location.href.toString() == 'http://127.0.0.1:8080/login');
	//提交，最终验证。
    $('.wx-registerSend').click(function(){

		$(".wx-input").trigger('blur');			
		var numError = $('form .onError').length;	
		if(numError){				
			alert("登陆失败");
			return false;	
		}else{ 			
			$.ajax({
				url:'/login',
				type:"POST",
				dataType:"json",
				data:{
					uname:$('#wx-user').val(),
					upwd:$('#wx-password1').val()
				},
				success:function(data) {
					if (data == 3) {
						// alert("登陆成功");
						location.href='index';
						localStorage.login=1;
						localStorage.userName = $('#wx-user').val();
					};
					if (data == 1) {
						alert("用户名不存在");
						location.href='login';
					};
					if(data == 2){
						alert("密码错误");
						location.href='login';
					};
								
				}
			})
		}
		
	})
	
})