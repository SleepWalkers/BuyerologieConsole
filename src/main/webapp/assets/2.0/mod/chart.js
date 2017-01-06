define(function(require, exports, module) {


    var ShowjoyChart = {};
    //设置Highcharts的全局数据
    Highcharts.setOptions({
        lang: {
            contextButtonTitle: "操作",
            downloadJPEG: "下载JPEG",
            downloadPDF: "下载PDF",
            downloadPNG: "下载PNG",
            downloadSVG: "下载SVG",
            printChart: "打印图表",
            resetZoom: "重置区域"
        },
    });

    /**
     * 获得柱状图的options数据
     */
    ShowjoyChart.getColumnChartOptions = function(sTitle, aCategories, aData){
        var options = {
            global : {
                useUTC : false
             },
            chart: {
                type:"column",
            },
            title: {
                text: sTitle
            },
            xAxis:{
                categories: aCategories
            },
            yAxis: {
                title: {
                    text: sTitle
                }
            },
            plotOptions: {
                column: {
                    cursor: 'pointer',
                }
            },
            credits:{
                enabled: false
            },
            tooltip: {
                shared: true,
            },
            series: [{
                name: sTitle,
                data: aData
            }]
        };
        return options;
    };

    ShowjoyChart.getPieChartOptions = function(sTitle, aData){
        var options = {
            chart: {
                type:"pie",
                options3d: {
                    enabled: false,
                    alpha: 45,
                    beta: 0
                },
                zoomType: 'x',
                spacingRight: 20
            },
            title: {
                text: sTitle
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            credits:{
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                name: sTitle,
                data: aData
            }]
        };
        return options;
    };
    
    ShowjoyChart.getTimelineChart = function(sTitle, aData, nPointInterval , nPointStart){
    	var options = {
            global : {
                useUTC : false
             },
            chart: {
                type:"line",
                zoomType: 'x',
                spacingRight: 20
            },
            title: {
                text: sTitle
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats:{
                    hour:"%m-%e %H:%M",
                    day: '%m月%e日',
                    week: '%m月%e日',
                    month:"%Y年%m月",
                    year: "%Y年"
                },
                maxZoom: 30 * 24 * 3600000, // 一个月
                title: {
                    text: null
                }
            },
            yAxis: {
                title: {
                    text: sTitle
                }
            },
            credits:{
                enabled: false
            },
            tooltip: {
                shared: true,
                dateTimeLabelFormats:{
                    day: '%Y年%m月%e日',
                    week: '%Y年%m月%e日',
                    month:"%Y年%m月%e日",
                    year: "%Y年%m月%e日"
                },
            },
            legend: {
                enabled: false
            },
    
            series: [{
                name: sTitle,
                pointInterval: nPointInterval,
                pointStart: nPointStart,
                data: aData
    		}]
        };
    	
    	return options;
    };
    return ShowjoyChart;
});