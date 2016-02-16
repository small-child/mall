$(function() {
	console.log(localStorage.admin_userId);
    /*获取公司信息*/
	$.get("/admin/company_detail/"+localStorage.admin_userId, function(data){
    	if (data == 0) {
    		$('#wx-0').text("公司信息暂未提交!");
    		$('#wx-21').attr("disabled",true);
    	} else{
    		$('#wx-0').text("请仔细查看公司信息!");
    		$('#wx-1').val(data[0].name);
    		$('#wx-2').val(data[0].address);
    		$('#wx-3').val(data[0].company_tel);
    		$('#wx-4').val(data[0].company_fax);
    		$('#wx-5').val(data[0].legal_person);
    		$('#wx-6').val(data[0].legal_person_id);
    		$('#wx-7').val(data[0].agent);
    		$('#wx-8').val(data[0].agent_phone);
    		$('#wx-9').val(data[0].agent_id);
    		$('#wx-10').val(data[0].agent_email);
    		$('#wx-11').val(data[0].company_bank);
    		$('#wx-12').val(data[0].company_bankNum);
    		$('#wx-13').val(data[0].company_taxpayer);
    		$('#wx-14').val(data[0].post);
            // console.log(data[0].picture6);
            if (data[0].picture1) {
                $('#wx-15').html("<img src='"+"../picture/certification/"+data[0].picture1+"' style='width:100%;height:100%'>");
            }
            if (data[0].picture2) {
                $('#wx-16').html("<img src='"+"../picture/certification/"+data[0].picture2+"' style='width:100%;height:100%'>");
            }
            if (data[0].picture3) {
                $('#wx-17').html("<img src='"+"../picture/certification/"+data[0].picture3+"' style='width:100%;height:100%'>");
            }
            if (data[0].picture4) {
                $('#wx-18').html("<img src='"+"../picture/certification/"+data[0].picture4+"' style='width:100%;height:100%'>");
            }
            if (data[0].picture5) {
                $('#wx-19').html("<img src='"+"../picture/certification/"+data[0].picture5+"' style='width:100%;height:100%'>");
            }
            if (data[0].picture6 != "none") {
                $('#wx-20').html("<img src='"+"../picture/certification/"+data[0].picture6+"' style='width:100%;height:100%'>");
            }
    	}
    })
    
    

})