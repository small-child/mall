$(function(){

	//点击导航的时候提示
	$('#wx-nav > li:eq(1)').addClass('active');

	//当上传图片时，显示图片
	document.getElementById('wx-standard').onchange=function() {
		var pic = this.files[0];
		//console.log(pic);
 		var tmpimg = document.createElement('img');
		tmpimg.style.width="100%";
		tmpimg.style.height="100%";
		tmpimg.src = window.URL.createObjectURL(pic); 
		var div = document.getElementById('wx-standard-pic');
		if (div.firstChild != null) {
			div.removeChild(div.firstChild);
			div.appendChild(tmpimg);
		}else{
			div.appendChild(tmpimg);
		};
	}

})