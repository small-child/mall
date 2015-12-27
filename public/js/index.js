// JavaScript Document

$(function() {

  //点击导航的时候提示
  $('#wx-nav > li:eq(0)').addClass('active');

	//当鼠标接触在表格行的使用颜色变化控制
	$('#wx-table tbody tr').hover(function () {
		$(this).addClass('wx-tr');
	},function () {
		$(this).removeClass('wx-tr');
	})

	// 画图start
	var title = {
      text: '沥青价格走势'   
	};
    var subtitle = {
      text: 'www.yiluxincai.com:3333'
    };
    var xAxis = {
        categories: ['2015/08/01', '2015/08/15', '2015/08/30', '2015/09/15', '2015/09/30', '2015/10/15',
         '2015/10/30', '2015/11/15', '2015/11/30']
    };
    var yAxis = {
       title: {
         text: '沥青价格（元）'
      },
      plotLines: [{
         value: 0,
         width: 1,
         color: '#808080'
      }]
    };   

    var tooltip = {
      // valueSuffix: '\xB0C'
      valueSuffix: '元'
    }
    /*
    var legend = {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0,
      enabled:true
    };
	*/
	var legend = {
		enabled: true
	};

    var series =  [
      {
         name: '沥青期货',
         data: [2000, 2100, 2400, 2600, 3000, 3100,2900, 
            2600, 2400]
      }
    ];

   var json = {};

   json.title = title;
   json.subtitle = subtitle;
   json.xAxis = xAxis;
   json.yAxis = yAxis;
   json.tooltip = tooltip;
   json.legend = legend;
   json.series = series;

	$('#wx-data1').highcharts(json);
	$('#wx-data2').highcharts(json);
	// 画图end

});