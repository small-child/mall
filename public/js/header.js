
$(function () {
	//引入css文件
	var headerCss = "body{font-family: SimSun,sans-serif;}.wx-background{background:white;}.wx-button{margin-top:49px;}.wx-first{padding-left:0px;}.wx-last{padding-right:0px;}#wx-nav a{color:white;}#wx-nav a:hover{color:white; background:coral !important;}#wx-nav .active a{color:white !important; background:coral !important;}";
	$('<style>').html(headerCss).appendTo($('head'));
	//头文件代码
	var header = "<div style='background:white;'><div class='container'><div class='row wx-background'><div class='col-md-8 wx-first'><img src='photos/logo.jpg'></div><div class='col-md-4 wx-last'><ul class='nav nav-pills' style='float:right'><li class='active wx-button' style='display:none;' id='wx-message'><div class='dropdown'><button class='btn btn-info dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown'><span class='badge pull-right' id='wx-bag0' style='color:red;'></span><span class='glyphicon glyphicon-user'></span></button><ul id='wx-msg0' class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu1'></ul></div> </li><li><button class='btn wx-button' id='wx-login_header'>登陆</button><button class='btn wx-button' id='wx-quite' style='display:none;'>退出</button></li><li><button class='btn wx-button' id='wx-office' style='display:none;'>我的办公室</button><button class='btn wx-button' id='wx-register_header'>注册</button></li></ul></div></div></div></div><div style='background-color: #03F'><div class='container'><div class='row'><div class='col-md-2'></div><div class='col-md-8'><ul class='nav  nav-justified' id='wx-nav'><li><a href='javascript:void(0);' class='text-center' id='wx-index'>首页</a></li><li><a href='javascript:void(0);' class='text-center' id='wx-buy'>我要买</a></li><li><a href='javascript:void(0);' class='text-center' id='wx-sell'>我要卖</a></li><li><a href='javascript:void(0);' class='text-center' id='wx-express'>物流</a></li><li><a href='javascript:void(0);' class='text-center' id='wx-quotation'>交易行情</a></li><li><a href='javascript:void(0);' class='text-center' id='wx-aboutUs'>关于我们</a></li></ul></div><div class='col-md-2'></div></div></div></div>";

	//加载头文件
	$('#wx-header').html(header);
	//将消息提醒click事件修改为mouseover
	$('.dropdown-toggle').dropdownHover();
	//导航栏触摸颜色问题修改
	$('a.dropdown-toggle').one('click',function(){ location.href= $(this).attr('href'); });	

	//点击登陆按钮，进入登陆页面
	$('#wx-login_header').click(function(){
		location.href='login';
    });

	//点击登陆按钮，进入登陆页面
    $('#wx-register_header').click(function(){
		location.href='register';
    });

    // 点击退出
    $('#wx-quite').click(function(){
		location.href='logout';
        localStorage.login=0;
    });
    
    if (localStorage.login == 0) {
    	$('#wx-office').hide();
    	$('#wx-message').hide();
    	$('#wx-quite').hide();
    	$('#wx-login_header').show();
        $('#wx-register_header').show();
    };

    if (localStorage.login == 1 ) {
    	$('#wx-office').show();
    	$('#wx-message').show();
    	$('#wx-quite').show();
    	$('#wx-login_header').hide();
        $('#wx-register_header').hide();
    };

    //if (location.href.toString() == 'http://yiluxincai.com/index'location.href.toString() == 'http://yiluxincai.com/login' || location.href.toString() == 'http://yiluxincai.com/register'||location.href.toString() == 'http://yiluxincai.com/index') {
    if (location.href.toString() == 'http://127.0.0.1/login' || location.href.toString() == 'http://127.0.0.1/register'||location.href.toString() == 'http://127.0.0.1/index') {
        $('#wx-office').hide();
        $('#wx-message').hide();
        $('#wx-quite').hide();
        $('#wx-login_header').show();
        $('#wx-register_header').show();
    } else{
        $('#wx-office').show();
        $('#wx-message').show();
        $('#wx-quite').show();
        $('#wx-login_header').hide();
        $('#wx-register_header').hide();
    };
    
	// 点击我的办公室，进入办公室页面
    $('#wx-office').click(function(){
        location.href='myoffice';
        // alert(123);
    });

	//控制导航点击变色效果
	$("#wx-nav li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	});

    // 点击首页
    $('#wx-index').click(function(){
        location.href='index';
        // alert(123);
    });

    // 我要买
    $('#wx-buy').click(function(){
        // alert(123);
        location.href='buy';
    });

    // 我要卖
    $('#wx-sell').click(function(){
        // alert(123);
        location.href='sell';
    });

    // 交易行情
    $('#wx-quotation').click(function(){
        // alert(123);
        location.href='quotation';
    });

    // 物流
    $('#wx-express').click(function(){
        // alert(123);
        location.href='express';
    });

    // 关于我们
    $('#wx-aboutUs').click(function(){
        // alert(123);
        location.href='aboutUs';
    });

    /*buyer offfline*/
    $.get("/head_message0", function(data){
        // console.log(data.length)
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            arr[i] = data[i]._id;
        }
        $.ajax({                
            url:'/head_message1',
            type:"POST", 
            dataType:"json",
            data:{
                chatRcord:arr
            },
            success:function(data){
                // console.log(data.length);
                // console.log(data);
                var str = "";
                for (var i = 0; i < data.length; i++) {
                    str = "<li role='presentation'><a role='menuitem' tabindex='-1' href='#' class='wx-msg1'>";
                    str += "<span class='badge pull-right' style='color:white;background: #F60;'>";
                    str += data[i].count+"</span><span>"+"B"+data[i]._id+"</span></a></li>";
                    $('#wx-msg0').append(str);
                    $('#wx-bag0').text("消息");
                }
                // $('#wx-msg0').html(str);
                
            }               
        })
    })

    /*buyer offfline*/
    $.get("/head_message3", function(data){
        // console.log(data.length)
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            arr[i] = data[i]._id;
        }
        $.ajax({                
            url:'/head_message4',
            type:"POST", 
            dataType:"json",
            data:{
                chatRcord:arr
            },
            success:function(data){
                // console.log(data.length);
                // console.log(data);
                var str = "";
                for (var i = 0; i < data.length; i++) {
                    str = "<li role='presentation'><a role='menuitem' tabindex='-1' href='#' class='wx-msg1'>";
                    str += "<span class='badge pull-right' style='color:white;background: #F60;'>";
                    str += data[i].count+"</span><span>"+"S"+data[i]._id+"</span></a></li>";
                    $('#wx-msg0').append(str);
                    $('#wx-bag0').text("消息");
                }
                // $('#wx-msg0').html(str);
                
            }               
        })
    })



    /*当点击购买按钮时候，将该条信息的id保存起来*/
    $(document).on('click','.wx-msg1',function(){       
        // location.href = "buyDetail";跳转到消息页面
    })
    

    


})

