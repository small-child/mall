$(function() {

	//点击导航的时候提示
	$('#wx-nav > li:eq(1)').addClass('active');
	

	//当鼠标接触在表格行的使用颜色变化控制
	$('#wx-table tbody tr').hover(function () {
		$(this).addClass('wx-tr');
	},function () {
		$(this).removeClass('wx-tr');
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

    /*日历调用*/
    laydate({
        elem: '#wx-5'
    });
    laydate({
        elem: '#wx-6'
    });

    // localStorage.type = $(this).text();

    /*1.商品种类*/
    $.get("/admin/type_data", function(data){
        var str = "<option>请选择</option>";
        for (var i = 0; i < data.length; i++) {
            str+="<option>"+data[i].name+"</option>";
        }
        $('#wx-1').html(str); 
    });  

    /*2.商品小类*/
    $.get("/admin/kind_data", function(data){
        var str = "<option>请选择</option>";
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
                var str = "<option>请选择</option>";
                for (var i = 0; i < data.length; i++) {
                    str+="<option>"+data[i].name+"</option>";
                };
                $('#wx-2').html(str);    
            }
        }); 
    })

    /*3.型号等级*/ 
    $.get("/admin/rank_data", function(data){
        var str = "<option>请选择</option>";
        for (var i = 0; i < data.length; i++) {
            str+="<option>"+data[i].name+"</option>";
        };
        $('#wx-3').html(str);             
    }); 

    /*4.公司名称*/
    $.get("/buy_companyName", function(data){
        // console.log(data[0]);
        var str = "<option>请选择</option>";
        for (var i = 0; i < data.length; i++) {
            str+="<option>"+data[i]+"</option>";
        };
        $('#wx-4').html(str);   
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
                var str = "<option>请选择</option>";
                for (var i = 0; i < data.length; i++) {
                    str+="<option>"+data[i].name+"</option>";
                };
                $('#wx-3').html(str);             
            }
        }); 
    })

    /*商品信息总条数*/
    $.get("/buy_count", function(data){
        localStorage.count = Math.ceil(data/2);
    });  

    /*初始状态下*/
    $.get("/buy_data", function(data){
        var str = "";
        for (var i = 0; i < data.length; i++) {
            var date1 = new Date(data[i].guadan_start).Format("yyyy-MM-dd");
            var date2 = new Date(data[i].guadan_end).Format("yyyy-MM-dd");        
            str += "<td>"+data[i]._id+"</td>";
            str += "<td>"+data[i].brand+"</td>";
            str += "<td>"+data[i].type+"</td>";
            str += "<td>"+data[i].kind+"</td>";
            str += "<td>"+data[i].rank+"</td>";
            str += "<td>"+data[i].volume+"</td>";
            str += "<td>"+data[i].min_deal+"</td>";
            str += "<td>"+data[i].unit_price+"</td>";
            str += "<td>"+data[i].unit+"</td>";
            str += "<td>"+date1+"至"+date2+"</td>";
            str += "<td>"+data[i].address+"</td>";
            str += "<td><a class='btn wx-buyGoods' href='javascript:void(0)' onclick='get_id();'>购买</a></td>";
            str = "<tr>"+str+"</tr>";
        };
        $('#wx-tbody').html(str);
       
    }); 

    // 初始状态分页
    $(".wx-page:eq(0)").createPage({
        pageCount: localStorage.count,
        current:1,
        backFn:function(p){
            $.get("/buy_data_page/"+p, function(data){
                var str = "";
                for (var i = 0; i < data.length; i++) {
                    var date1 = new Date(data[i].guadan_start).Format("yyyy-MM-dd");
                    var date2 = new Date(data[i].guadan_end).Format("yyyy-MM-dd");        
                    str += "<td>"+data[i]._id+"</td>";
                    str += "<td>"+data[i].brand+"</td>";
                    str += "<td>"+data[i].type+"</td>";
                    str += "<td>"+data[i].kind+"</td>";
                    str += "<td>"+data[i].rank+"</td>";
                    str += "<td>"+data[i].volume+"</td>";
                    str += "<td>"+data[i].min_deal+"</td>";
                    str += "<td>"+data[i].unit_price+"</td>";
                    str += "<td>"+data[i].unit+"</td>";
                    str += "<td>"+date1+"至"+date2+"</td>";
                    str += "<td>"+data[i].address+"</td>";
                    str += "<td><a class='btn wx-buyGoods' href='javascript:void(0)' onclick='get_id();'>购买</a></td>";
                    str = "<tr>"+str+"</tr>";
                };
                $('#wx-tbody').html(str);
            }); 
        }
    });

    /*查询*/
    $('#wx-7').click(function () {
        var search = new Object();
        if ($('#wx-1 option:selected').text() != "请选择") {
            search.type = $('#wx-1 option:selected').text();
        };
        if ($('#wx-2 option:selected').text() != "请选择") {
            search.kind = $('#wx-2 option:selected').text();
        };
        if ($('#wx-3 option:selected').text() != "请选择") {
            search.rank = $('#wx-3 option:selected').text();
        };
        if ($('#wx-4 option:selected').text() != "请选择") {
            search.company = $('#wx-4 option:selected').text();
        };                               
        if ($('#wx-5').val() != "") {
            search.guadan = $('#wx-5').val();
        };
        if ($('#wx-6').val() != "") {
            search.release = $('#wx-6').val();
        };
        // console.log(search);
        $.ajax({
            url:'/buy_search',
            type:"POST",
            dataType:"json",
            data:search,
            success:function(data) {
                var str = "";
                for (var i = 0; i < data.length; i++) {
                    var date1 = new Date(data[i].guadan_start).Format("yyyy-MM-dd");
                    var date2 = new Date(data[i].guadan_end).Format("yyyy-MM-dd");        
                    str += "<td>"+data[i]._id+"</td>";
                    str += "<td>"+data[i].brand+"</td>";
                    str += "<td>"+data[i].type+"</td>";
                    str += "<td>"+data[i].kind+"</td>";
                    str += "<td>"+data[i].rank+"</td>";
                    str += "<td>"+data[i].volume+"</td>";
                    str += "<td>"+data[i].min_deal+"</td>";
                    str += "<td>"+data[i].unit_price+"</td>";
                    str += "<td>"+data[i].unit+"</td>";
                    str += "<td>"+date1+"至"+date2+"</td>";
                    str += "<td>"+data[i].address+"</td>";
                    str += "<td><a class='btn wx-buyGoods' href='javascript:void(0)' onclick='get_id();'>购买</a></td>";
                    str = "<tr>"+str+"</tr>";
                };
                $('#wx-tbody').html(str);
            }
        })
    })

    // 计算查询到数据的数目
    $('#wx-7').click(function () {
        var search = new Object();
        if ($('#wx-1 option:selected').text() != "请选择") {
            search.type = $('#wx-1 option:selected').text();
        };
        if ($('#wx-2 option:selected').text() != "请选择") {
            search.kind = $('#wx-2 option:selected').text();
        };
        if ($('#wx-3 option:selected').text() != "请选择") {
            search.rank = $('#wx-3 option:selected').text();
        };
        if ($('#wx-4 option:selected').text() != "请选择") {
            search.company = $('#wx-4 option:selected').text();
        };                               
        if ($('#wx-5').val() != "") {
            search.guadan = $('#wx-5').val();
        };
        if ($('#wx-6').val() != "") {
            search.release = $('#wx-6').val();
        };
        // console.log(search);
        $.ajax({
            url:'/buy_search_count',
            type:"POST",
            dataType:"json",
            data:search,
            success:function(data) {
                // console.log(data);
                $(".wx-page:eq(1)").show();
                $(".wx-page:eq(0)").hide();
                localStorage.count1 = Math.ceil(data/2);
            }
        })
    })

    //重新做一个分页出来，然后点击查询的成功时候进行替换
    $(".wx-page:eq(1)").createPage({
        pageCount: localStorage.count1,
        current:1,
        backFn:function(p){
            // console.log(p); 
            var search = new Object();
            if ($('#wx-1 option:selected').text() != "请选择") {
                search.type = $('#wx-1 option:selected').text();
            };
            if ($('#wx-2 option:selected').text() != "请选择") {
                search.kind = $('#wx-2 option:selected').text();
            };
            if ($('#wx-3 option:selected').text() != "请选择") {
                search.rank = $('#wx-3 option:selected').text();
            };
            if ($('#wx-4 option:selected').text() != "请选择") {
                search.company = $('#wx-4 option:selected').text();
            };                               
            if ($('#wx-5').val() != "") {
                search.guadan = $('#wx-5').val();
            };
            if ($('#wx-6').val() != "") {
                search.release = $('#wx-6').val();
            };
            $.ajax({
                url:"/buy_search_page/"+p,
                type:"POST",
                dataType:"json",
                data:search,
                success:function(data) {
                    var str = "";
                    for (var i = 0; i < data.length; i++) {
                        var date1 = new Date(data[i].guadan_start).Format("yyyy-MM-dd");
                        var date2 = new Date(data[i].guadan_end).Format("yyyy-MM-dd");        
                        str += "<td>"+data[i]._id+"</td>";
                        str += "<td>"+data[i].brand+"</td>";
                        str += "<td>"+data[i].type+"</td>";
                        str += "<td>"+data[i].kind+"</td>";
                        str += "<td>"+data[i].rank+"</td>";
                        str += "<td>"+data[i].volume+"</td>";
                        str += "<td>"+data[i].min_deal+"</td>";
                        str += "<td>"+data[i].unit_price+"</td>";
                        str += "<td>"+data[i].unit+"</td>";
                        str += "<td>"+date1+"至"+date2+"</td>";
                        str += "<td>"+data[i].address+"</td>";
                        str += "<td><a class='btn wx-buyGoods' href='javascript:void(0)' onclick='get_id();'>购买</a></td>";
                        str = "<tr>"+str+"</tr>";
                    };
                    $('#wx-tbody').html(str);
                }
            })
        }
    });

    /*当点击购买按钮时候，将该条信息的id保存起来*/
    function get_id () {
        console.log(123)
    }

}) 