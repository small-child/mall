$(function() {
	
	//侧栏颜色
	$('.wx-ullist:eq(0) li:eq(0) a').addClass('wx-click');

	$.get("/myoffice_data", function(data){
	    // console.log(data);
	    $('#wx-name_m').text(data.name);
	    $('#wx-email_m').text(data.email);
	  });

	// alert(location.href);
	
})
