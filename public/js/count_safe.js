$(function() {
	
	//侧栏颜色
	$('.wx-ullist:eq(0) li:eq(1) a').addClass('wx-click');

	// 表单验证开始
	$('.wx-input').blur(function(){

    	var $parent = $(this).parents('.col-md-7').siblings('.wx-required');
    	$parent.find(".formtips").remove();
    	
    	//验证密码1
        if( $(this).is('#wx-password1') ){
            if( this.value=="" || ( this.value!="" && !/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/.test(this.value) ) ){
                var errorMsg = '格式错误 &#44;6-16个字符 &#44;不支持空格&#33;';
                $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
            }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
	        }
        }
     	

	    //验证密码1
        if( $(this).is('#wx-password2') ){
            if( this.value=="" || ( this.value!="" && !/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/.test(this.value) ) ){
                var errorMsg = '格式错误 &#44;6-16个字符 &#44;不支持空格&#33;';
                $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
            }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
	        }
        }

        //验证密码2
		if( $(this).is('#wx-password3') ){
            if($('#wx-password2').val() != $('#wx-password3').val()){
                var errorMsg = '两次密码输入不一致.';
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


	//提交，最终验证。
    $('.wx-registerSend').click(function(){
		 
		$(".wx-input").trigger('blur');			
		var numError = $('form .onError').length;		
		if(numError){				
			alert("提交失败");
			return false;	
		}else{ 			
			$.ajax({
				url:'/count_safe',
				type:"POST",
				dataType:"json",
				data:{
					password1:$('#wx-password1').val(),
					password2:$('#wx-password2').val(),
				},
				success:function(data) {
					if (data == 0) {
						alert('密码修改成功');
						location.href='login';
					}; 
				}
			});	
			
		}          
    })



	
})