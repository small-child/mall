$(function () {
	/*1.已有商品种类*/
	$('#wx-getBigtype').change(function () {
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
			    $('#wx-1-2').html(str);      		  //3中，小类随着大类切换
			}
		});	
	})

	// 切换型号的等级
	$('#wx-1-2').change(function () {
		var value = this.value;
		$.ajax({
			url:'/admin/rank_change',
			type:"POST",
			dataType:"json",
			data:{
				bigType:$('#wx-getBigtype option:selected').text(),
				smallType:$('#wx-1-2 option:selected').text()
			},
			success:function(data) {
				// console.log(data);
				var str = "";
				for (var i = 0; i < data.length; i++) {
					str+="<option>"+data[i].name+"</option>";
				};
			    $('#wx-1-3').html(str);      		  //4中型号等级随着小类切换
			}
		});	
	})

	/*2.商品大类操作*/
	// 商品大类增加
	$('#wx-add_type2').click(function  () {
		if ($('#wx-type2').val() == "") {
			$('#wx-typeWarning').text('输入为空');
		} else{
			$.ajax({
				url:'/admin/type',
				type:"POST",
				dataType:"json",
				data:{
					bigType:$('#wx-type2').val(),
				},
				success:function(data) {
					if (data == 1) {
						$('#wx-typeWarning').text('该大类类已经存在');
					} else if (data == 3) {
						$('#wx-typeWarning').text('商品大类增加成功');
					};
				}
			});	
		};		
	})

	// 商品大类获取
	$.get("/admin/type_data", function(data){
	    var str = "";
	    // console.log(data)
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-getBigtype').html(str);        //1
	    $('#wx-delete_type2').html(str);      //2
	    $('#wx-3-1').html(str);      		  //3
	    $('#wx-3-4').html(str);      		  //3
	    $('#wx-4-1').html(str);      		  //4
	    $('#wx-4-4').html(str);      		  //4
	});	

 	// 商品大类删除
 	$('#wx-delete_btn').click(function () {
 		// alert(0);
 		$.ajax({
			url: '/admin/type_delete',
			type: 'DELETE',
			data:{name:$('#wx-delete_type2 option:selected').text()},
			success: function(data) {
				// console.log(data);
			  	$('#wx-typeWarning').text('商品大类删除成功');
			}
		});
 	})

 	/*3.商品小类操作*/
 	//增加小类
 	$('#wx-3-3').click(function  () {
		if ($('#wx-3-2').val() == "") {
			$('#wx-3-0').text('输入为空');
		} else{
			$.ajax({
				url:'/admin/kind',
				type:"POST",
				dataType:"json",
				data:{
					bigType:$('#wx-3-1 option:selected').text(),
					smallType:$('#wx-3-2').val()
				},
				success:function(data) {
					if (data == 1) {
						$('#wx-3-0').text('商品小类增加成功');
					} else if (data == 0){
						$('#wx-3-0').text('商品小类已存在');
					}else{
						$('#wx-3-0').text('添加失败');
					}
				}
			});	
		};		
	})
 	
	// 页面初始加载下商品小类获取
	$.get("/admin/kind_data", function(data){
		var str = "";
		for (var i = 0; i < data.length; i++) {
			str+="<option>"+data[i].name+"</option>";
		};
	    $('#wx-1-2').html(str);            	  //1
	    $('#wx-3-5').html(str);      		  //3	
	    $('#wx-4-2').html(str);            	  //4
	    $('#wx-4-5').html(str);            	  //4
	});	

	// 商品小类切换
	$('#wx-3-4').change(function () {
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
			    $('#wx-3-5').html(str);      		  //3中，小类随着大类切换
			}
		});	
	})

	// 删除小类
	$('#wx-3-6').click(function () {
		$.ajax({
			url:'/admin/kind_delete',
			type:"POST",
			dataType:"json",
			data:{
				typeName:$('#wx-3-4 option:selected').text(),
				kindName:$('#wx-3-5 option:selected').text()
			},
			success:function(data) {
				if (data == 0) {
					$('#wx-3-0').text('删除商品小类成功');
				};
			}
		});	
	})

	/*4.型号等级*/
	// 小类切换
	$('#wx-4-1').change(function () {
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
			    $('#wx-4-2').html(str);      		  //3中，小类随着大类切换
			}
		});	
	})
	// 小类切换
	$('#wx-4-4').change(function () {
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
			    $('#wx-4-5').html(str);      		  //3中，小类随着大类切换
			}
		});	
	})
	// 添加型号等级
	$('#wx-4-7').click(function  () {
		if ($('#wx-4-3').val() == "") {
			$('#wx-4-0').text('输入为空');
		} else{
			$.ajax({
				url:'/admin/rank',
				type:"POST",
				dataType:"json",
				data:{
					bigType:$('#wx-4-1 option:selected').text(),
					smallType:$('#wx-4-2 option:selected').text(),
					rank:$('#wx-4-3').val()
				},
				success:function(data) {
					if (data == 0) {
						$('#wx-4-0').text('已经存在');
					} else if (data == 1) {
						$('#wx-4-0').text('增加成功');
					} else{
						$('#wx-4-0').text('操作失败');
					};
				}
			});	
		};		
	})
	// 切换型号的等级
	$('#wx-4-5').change(function () {
		var value = this.value;
		$.ajax({
			url:'/admin/rank_change',
			type:"POST",
			dataType:"json",
			data:{
				bigType:$('#wx-4-4 option:selected').text(),
				smallType:$('#wx-4-5 option:selected').text()
			},
			success:function(data) {
				// console.log(data);
				var str = "";
				for (var i = 0; i < data.length; i++) {
					str+="<option>"+data[i].name+"</option>";
				};
			    $('#wx-4-6').html(str);      		  //4中型号等级随着小类切换
			}
		});	
	})

	//初始状态下的型号等级
	$.get("/admin/rank_data", function(data){
		// console.log(data);
		var str = "";
		for (var i = 0; i < data.length; i++) {
			str+="<option>"+data[i].name+"</option>";
		};
		$('#wx-1-3').html(str);      		  //1中型号等级随着小类切换
		$('#wx-4-6').html(str);      		  //4中型号等级随着小类切换
	});	

	// 删除型号等级
	$('#wx-4-8').click(function () {
		$.ajax({
			url:'/admin/rank_delete',
			type:"POST",
			dataType:"json",
			data:{
				typeName:$('#wx-4-4 option:selected').text(),
				kindName:$('#wx-4-5 option:selected').text(),
				rankName:$('#wx-4-6 option:selected').text()
			},
			success:function(data) {
				if (data == 0) {
					$('#wx-4-0').text('删除成功');
				} else{
					$('#wx-4-0').text('删除失败');
				};
			}
		});	
	})

	/*5.商品品牌操作*/
	// 商品大类增加
	$('#wx-5-2').click(function  () {
		if ($('#wx-5-1').val() == "") {
			$('#wx-5-0').text('输入为空');
		} else{
			$.ajax({
				url:'/admin/brand',
				type:"POST",
				dataType:"json",
				data:{
					brandName:$('#wx-5-1').val(),
				},
				success:function(data) {
					if (data == 3) {
						$('#wx-5-0').text('添加成功');
					} else if (data == 1) {
						$('#wx-5-0').text('已经存在');
					};
				}
			});	
		};		
	})
	
	// 商品大类获取
	$.get("/admin/brand_data", function(data){
	    var str = "";
	    // console.log(data)
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-5-3').html(str);        
	});	
	
 	// 商品大类删除
 	$('#wx-5-4').click(function () {
 		$.ajax({
			url: '/admin/brand_delete',
			type: 'DELETE',
			data:{name:$('#wx-5-3 option:selected').text()},
			success: function(data) {
				if (data == 0) {
					$('#wx-5-0').text('商品大类删除成功');
				};
			}
		});
 	})

	/*6.包装方式操作*/
	// 商品大类增加
	$('#wx-6-2').click(function  () {
		if ($('#wx-6-1').val() == "") {
			$('#wx-6-0').text('输入为空');
		} else{
			$.ajax({
				url:'/admin/packing',
				type:"POST",
				dataType:"json",
				data:{
					packingName:$('#wx-6-1').val(),
				},
				success:function(data) {
					if (data == 3) {
						$('#wx-6-0').text('添加成功');
					} else if (data == 1) {
						$('#wx-6-0').text('已经存在');
					};
				}
			});	
		};		
	})
	// 获取包装方式
	$.get("/admin/packing_data", function(data){
	    // console.log(data)
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-6-3').html(str);        
	});	
	// 删除包装方式
 	$('#wx-6-4').click(function () {
 		$.ajax({
			url: '/admin/packing_delete',
			type: 'DELETE',
			data:{name:$('#wx-6-3 option:selected').text()},
			success: function(data) {
				if (data == 0) {
					$('#wx-6-0').text('删除成功');
				};
			}
		});
 	})

 	/*7.运输方式操作*/
	// 商品运输方式
	$('#wx-7-2').click(function  () {
		if ($('#wx-7-1').val() == "") {
			$('#wx-7-0').text('输入为空');
		} else{
			$.ajax({
				url:'/admin/transport',
				type:"POST",
				dataType:"json",
				data:{
					name:$('#wx-7-1').val(),
				},
				success:function(data) {
					if (data == 3) {
						$('#wx-7-0').text('添加成功');
					} else if (data == 1) {
						$('#wx-7-0').text('已经存在');
					};
				}
			});	
		};		
	})
	// 获取运输方式
	$.get("/admin/transport_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-7-3').html(str);        
	});	
	// 删除运输方式
 	$('#wx-7-4').click(function () {
 		$.ajax({
			url: '/admin/transport_delete',
			type: 'DELETE',
			data:{name:$('#wx-7-3 option:selected').text()},
			success: function(data) {
				if (data == 0) {
					$('#wx-7-0').text('删除成功');
				};
			}
		});
 	})

 	/*8.议价方式操作*/
	// 增加议价方式
	$('#wx-8-2').click(function  () {
		if ($('#wx-8-1').val() == "") {
			$('#wx-8-0').text('输入为空');
		} else{
			$.ajax({
				url:'/admin/bargain',
				type:"POST",
				dataType:"json",
				data:{
					name:$('#wx-8-1').val(),
				},
				success:function(data) {
					if (data == 3) {
						$('#wx-8-0').text('添加成功');
					} else if (data == 1) {
						$('#wx-8-0').text('已经存在');
					};
				}
			});	
		};		
	})
	// 获取议价方式
	$.get("/admin/bargain_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-8-3').html(str);        
	});	
	// 删除议价方式
 	$('#wx-8-4').click(function () {
 		$.ajax({
			url: '/admin/bargain_delete',
			type: 'DELETE',
			data:{name:$('#wx-8-3 option:selected').text()},
			success: function(data) {
				if (data == 0) {
					$('#wx-8-0').text('删除成功');
				};
			}
		});
 	})

 	/*9.商品标准操作*/
	// 增加商品标准
	$('#wx-9-2').click(function  () {
		if ($('#wx-9-1').val() == "") {
			$('#wx-9-0').text('输入为空');
		} else{
			$.ajax({
				url:'/admin/standard',
				type:"POST",
				dataType:"json",
				data:{
					name:$('#wx-9-1').val(),
				},
				success:function(data) {
					if (data == 3) {
						$('#wx-9-0').text('添加成功');
					} else if (data == 1) {
						$('#wx-9-0').text('已经存在');
					};
				}
			});	
		};		
	})
	// 获取商品标准
	$.get("/admin/standard_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-9-3').html(str);        
	});	
	// 删除商品标准
 	$('#wx-9-4').click(function () {
 		$.ajax({
			url: '/admin/standard_delete',
			type: 'DELETE',
			data:{name:$('#wx-9-3 option:selected').text()},
			success: function(data) {
				if (data == 0) {
					$('#wx-9-0').text('删除成功');
				};
			}
		});
 	})

 	/*10.交货方式操作*/
	// 增加交货方式
	$('#wx-10-2').click(function  () {
		if ($('#wx-10-1').val() == "") {
			$('#wx-10-0').text('输入为空');
		} else{
			$.ajax({
				url:'/admin/delivery',
				type:"POST",
				dataType:"json",
				data:{
					name:$('#wx-10-1').val(),
				},
				success:function(data) {
					if (data == 3) {
						$('#wx-10-0').text('添加成功');
					} else if (data == 1) {
						$('#wx-10-0').text('已经存在');
					};
				}
			});	
		};		
	})
	// 获取交货方式
	$.get("/admin/delivery_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-10-3').html(str);        
	});	
	// 删除交货方式
 	$('#wx-10-4').click(function () {
 		$.ajax({
			url: '/admin/delivery_delete',
			type: 'DELETE',
			data:{name:$('#wx-10-3 option:selected').text()},
			success: function(data) {
				if (data == 0) {
					$('#wx-10-0').text('删除成功');
				};
			}
		});
 	})

 	/*11.付款方式操作*/
	// 增加付款方式
	$('#wx-11-2').click(function  () {
		if ($('#wx-11-1').val() == "") {
			$('#wx-11-0').text('输入为空');
		} else{
			$.ajax({
				url:'/admin/payment',
				type:"POST",
				dataType:"json",
				data:{
					name:$('#wx-11-1').val(),
				},
				success:function(data) {
					if (data == 3) {
						$('#wx-11-0').text('添加成功');
					} else if (data == 1) {
						$('#wx-11-0').text('已经存在');
					};
				}
			});	
		};		
	})
	// 获取付款方式
	$.get("/admin/payment_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-11-3').html(str);        
	});	
	// 删除付款方式
 	$('#wx-11-4').click(function () {
 		$.ajax({
			url: '/admin/payment_delete',
			type: 'DELETE',
			data:{name:$('#wx-11-3 option:selected').text()},
			success: function(data) {
				if (data == 0) {
					$('#wx-11-0').text('删除成功');
				};
			}
		});
 	})

 	/*12.单位操作*/
	// 增加单位
	$('#wx-12-2').click(function  () {
		if ($('#wx-12-1').val() == "") {
			$('#wx-12-0').text('输入为空');
		} else{
			$.ajax({
				url:'/admin/unit',
				type:"POST",
				dataType:"json",
				data:{
					name:$('#wx-12-1').val(),
				},
				success:function(data) {
					if (data == 3) {
						$('#wx-12-0').text('添加成功');
					} else if (data == 1) {
						$('#wx-12-0').text('已经存在');
					};
				}
			});	
		};		
	})
	// 获取单位
	$.get("/admin/unit_data", function(data){
	    var str = "";
	    for (var i = 0; i < data.length; i++) {
	    	str+="<option>"+data[i].name+"</option>";
	    }
	    $('#wx-12-3').html(str);        
	});	
	// 删除单位
 	$('#wx-12-4').click(function () {
 		$.ajax({
			url: '/admin/unit_delete',
			type: 'DELETE',
			data:{name:$('#wx-12-3 option:selected').text()},
			success: function(data) {
				if (data == 0) {
					$('#wx-12-0').text('删除成功');
				};
			}
		});
 	})


})

