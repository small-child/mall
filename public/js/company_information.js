$(function(){

	//侧栏颜色
	$('.wx-ullist:eq(0) li:eq(2) a').addClass('wx-click');

	/*图片显示功能和发送 s*/
	$('.wx-pic_in').each(function() {
		$(this).change(function () {
			var a = $('.wx-pic_in');//判断有几个输入框
			for (var i = 0; i < a.length; i++) {
				if (this == a[i]) {
					var pic = this.files[0];
					var picture = $("<img/>").attr("src",window.URL.createObjectURL(pic)).css({"width":"100%","height":"100%"});
				 	// $(".wx-pic_show:eq("+i+")").append(picture);
				 	
				 	if ($(".wx-pic_show:eq("+i+") img").length != 0) {
						$(".wx-pic_show:eq("+i+")").children().remove();
						$(".wx-pic_show:eq("+i+")").append(picture);
					}else{
						$(".wx-pic_show:eq("+i+")").append(picture);
					};
				};
			};
			
		})	
	})
	/*图片显示功能和发送 e*/

	// 表单验证开始
	$('.wx-input').blur(function(){
		// console.log(0)
    	// var $parent = $(this).parents('.col-md-5').siblings('.wx-required');
    	var $parent = $(this).parents('.col-md-5').next();
    	$parent.find(".formtips").remove();
    	
    	//公司全称
        if( $(this).is('#wx-company_name')){
            if( this.value=="" ){
                var errorMsg = '&#215;';
                $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
            }else{
	            var okMsg = '&radic;';
	            $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
	        }
        }
        //办公地址
        if( $(this).is('#wx-address')){
            if( this.value=="" ){
                var errorMsg = '&#215;';
                $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
            }else{
	            var okMsg = '&radic;';
	            $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
	        }
        }

        //公司电话
        if( $(this).is('#wx-telephone') ){
	        if( this.value=="" || ( this.value!="" && !/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/.test(this.value) ) ){
                var errorMsg = '&#215;';
	            $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
	        }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
	        }
	    }

	    //法定代表人
        if( $(this).is('#wx-legal_person')){
            if( this.value=="" ){
                var errorMsg = '&#215;';
                $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
            }else{
	            var okMsg = '&radic;';
	            $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
	        }
        }
     	
     	//法人身份证
        if( $(this).is('#wx-contact_person_id') ){
	        if( this.value=="" || ( this.value!="" && !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.value) ) ){
                var errorMsg = '&#215;';
	            $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
	        }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
	        }
	    }

	    //法定代表人
        if( $(this).is('#wx-agent')){
            if( this.value=="" ){
                var errorMsg = '&#215;';
                $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
            }else{
	            var okMsg = '&radic;';
	            $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
	        }
        }

        //代理人电话
        if( $(this).is('#wx-contact_phone') ){
	        if( this.value=="" || ( this.value!="" && !/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/.test(this.value) ) ){
                var errorMsg = '&#215;';
	            $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
	        }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
	        }
	    }

	    //代理人身份证
        if( $(this).is('#wx-id') ){
	        if( this.value=="" || ( this.value!="" && !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.value) ) ){
                var errorMsg = '&#215;';
	            $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
	        }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
	        }
	    }

	    //公司开户银行
        if( $(this).is('#wx-bank')){
            if( this.value=="" ){
                var errorMsg = '&#215;';
                $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
            }else{
	            var okMsg = '&radic;';
	            $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
	        }
        }

        //银行账户
        if( $(this).is('#wx-bank_num') ){
	        if( this.value=="" || ( this.value!="" && !/^(\d{16}|\d{19})$/.test(this.value) ) ){
                var errorMsg = '&#215;';
	            $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
	        }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
	        }
	    }

	    //营业执照号
        if( $(this).is('#wx-taxpayer') ){
	        if( this.value=="" || ( this.value!="" && !/^[0-9]*[1-9][0-9]*$/.test(this.value) ) ){
                var errorMsg = '&#215;';
	            $parent.append('<p class="form-control-static formtips onError">'+errorMsg+'</p>');
	        }else{
	            var okMsg = '√';
	            $parent.append('<p class="form-control-static formtips onSuccess">'+okMsg+'</p>');
	        }
	    }

	    //营业执照
	    if( $(this).is('#wx-pic1')){
            if( this.value=="" ){
                $('.wx-pic_continer:eq(0)').html('<p class="formtips onError"><span>*</span>营业执照<span>&#215;</span></p>');
            }else{
	            $('.wx-pic_continer:eq(0)').html('<p class="formtips onSuccess"><span>*</span>营业执照<span>&radic;</span></p>');
	        }
        }
       
        //税务登记证
        if( $(this).is('#wx-pic2')){
            if( this.value=="" ){
                $('.wx-pic_continer:eq(1)').html('<p class="formtips onError"><span>*</span>税务登记证<span>&#215;</span></p>');
            }else{
	            $('.wx-pic_continer:eq(1)').html('<p class="formtips onSuccess"><span>*</span>税务登记证<span>&radic;</span></p>');
	        }
        }

        //组织结构代码证
        if( $(this).is('#wx-pic3')){
            if( this.value=="" ){
                $('.wx-pic_continer:eq(2)').html('<p class="formtips onError"><span>*</span>组织结构代码证<span>&#215;</span></p>');
            }else{
	            $('.wx-pic_continer:eq(2)').html('<p class="formtips onSuccess"><span>*</span>组织结构代码证<span>&radic;</span></p>');
	        }
        }

        //开户许可证
        if( $(this).is('#wx-pic4')){
            if( this.value=="" ){
                $('.wx-pic_continer:eq(3)').html('<p class="formtips onError"><span>*</span>开户许可证<span>&#215;</span></p>');
            }else{
	            $('.wx-pic_continer:eq(3)').html('<p class="formtips onSuccess"><span>*</span>开户许可证<span>&radic;</span></p>');
	        }
        }


        //电子印章
        if( $(this).is('#wx-pic5')){
            if( this.value=="" ){
                $('.wx-pic_continer:eq(4)').html('<p class="formtips onError"><span>*</span>电子印章<span>&#215;</span></p>');
            }else{
	            $('.wx-pic_continer:eq(4)').html('<p><span>*</span>电子印章<span>&radic;</span></p>');
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
			alert(0);
			return false;	
		}else{
			alert(1);
			var fd = new FormData();
			var fd1 = new FormData();
			/*表单数据*/
			
			fd.append('name', $('#wx-company_name').val());			
			fd.append('address', $('#wx-address').val());
			fd.append('company_tel', $('#wx-telephone').val());
			fd.append('company_fax', $('#wx-fax').val());
			fd.append('legal_person', $('#wx-legal_person').val());
			fd.append('legal_person_id', $('#wx-contact_person_id').val());
			fd.append('agent', $('#wx-agent').val());
			fd.append('agent_phone', $('#wx-contact_phone').val());
			fd.append('agent_id', $('#wx-id').val());
			fd.append('agent_email', $('#wx-contact_email').val());
			fd.append('company_bank', $('#wx-bank').val());
			fd.append('company_bankNum', $('#wx-bank_num').val());
			fd.append('company_taxpayer', $('#wx-taxpayer').val());
			fd.append('post', $('#wx-zip_code').val());
			
			/*图片数据*/
			
			fd.append('file1', $('#wx-pic1')[0].files[0]);
			fd.append('file2', $('#wx-pic2')[0].files[0]);
			fd.append('file3', $('#wx-pic3')[0].files[0]);
			fd1.append('file4', $('#wx-pic4')[0].files[0]);
			fd1.append('file5', $('#wx-pic5')[0].files[0]);
			fd1.append('file6', $('#wx-pic6')[0].files[0]);
			
			$.ajax({
				url:'/company_information',
				type:'POST',
				dataType:"json",
				data:fd,
				processData: false,
            	contentType: false,
				success:function(data) {
					console.log(data);	
				}
			});	
			
			$.ajax({
				url:'/company_information0',
				type:'POST',
				dataType:"json",
				data:fd1,
				processData: false,
            	contentType: false,
				success:function(data) {
					console.log(data);	
				}
			});	
			
		}          
    })

	// 计算对象长度
	function count(o){
		var n = 0;
        for(var i in o){
            n++;
            // console.log(o[i]);//获取对象的值
        }
        return n;
	}; 

	// 获取表单和数据信息，进行显示
	$.get("/company_information1", function(data){
	    // console.log(count(data[0]));
	    $('#wx-company_name').val(data[0].name);
	    $('#wx-address').val(data[0].address);
	    $('#wx-telephone').val(data[0].company_tel);
	    $('#wx-fax').val(data[0].company_fax);
	    $('#wx-legal_person').val(data[0].legal_person);
	    $('#wx-contact_person_id').val(data[0].legal_person_id);
	    $('#wx-agent').val(data[0].agent);
	    $('#wx-contact_phone').val(data[0].agent_phone);
	    $('#wx-id').val(data[0].agent_id);
	    $('#wx-contact_email').val(data[0].agent_email);
	    $('#wx-bank').val(data[0].company_bank);
	    $('#wx-bank_num').val(data[0].company_bankNum);
	    $('#wx-taxpayer').val(data[0].company_taxpayer);
	    $('#wx-zip_code').val(data[0].post);
	    console.log(typeof data[0].picture6)
	    $('.wx-pic_show:eq(0)').html("<img src='"+"picture/certification/"+data[0].picture1+"' style='width:100%;height:100%'>");
	    $('.wx-pic_show:eq(1)').html("<img src='"+"picture/certification/"+data[0].picture2+"' style='width:100%;height:100%'>");
	    $('.wx-pic_show:eq(2)').html("<img src='"+"picture/certification/"+data[0].picture3+"' style='width:100%;height:100%'>");
	    $('.wx-pic_show:eq(3)').html("<img src='"+"picture/certification/"+data[0].picture4+"' style='width:100%;height:100%'>");
	    $('.wx-pic_show:eq(4)').html("<img src='"+"picture/certification/"+data[0].picture5+"' style='width:100%;height:100%'>");
	    if (data[0].picture6 != "none") {
	    	$('.wx-pic_show:eq(5)').html("<img src='"+"picture/certification/"+data[0].picture6+"' style='width:100%;height:100%'>");
	    }
	 });
	
})