//그래프1 데이터
var dataSource1 = [{
    date: "12",
    visit: 59.8,
    stamp: 500.5
}, {
	date: "13",
	visit: 74.2,
	stamp: 308.6
}, {
	date: "14",
	visit: 40,
	stamp: 128.5
}, {
	date: "15",
	visit: 22.6,
	stamp: 241.5
}, {
	date: "16",
	visit: 19,
	stamp: 119.3
}, {
	date: "17",
	visit: 6.1,
	stamp: 123.6
}];

var types = ["line", "stackedLine", "fullStackedLine"];




//그래프1 만들기
$(function(){
    var chart = $("#chart").dxChart({
        palette: "violet",
        dataSource: dataSource1,
        commonSeriesSettings: {
            argumentField: "date",
            type: types[0]
        },
        margin: {
            bottom: 20
        },
        argumentAxis: {
            valueMarginsEnabled: false,
            discreteAxisDivisionMode: "crossLabels",
            grid: {
                visible: true
            }
        },
        series: [
            { valueField: "visit", name: "방문자 수" },
            { valueField: "stamp", name: "발급 도장 수" }
        ],
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center",
            itemTextPosition: "bottom"
        },
        title: {
            text: '방문자수 & 발급도장수',
            font: { size: 18}
        },
        tooltip: {
            enabled: true,
            customizeTooltip: function (arg) {
                return {
                    text: arg.valueText
                };
            }
        }
    }).dxChart("instance");
});








//그래프2 데이터
var dataSource2 = [{
    region: "하루전",
    val: 41
}, {
    region: "일주일전",
    val: 10
}, {
    region: "이주일전",
    val: 3
}, {
    region: "한달전",
    val: 5
}, {
    region: "한달이상",
    val: 7
}, {
    region: "첫방문",
    val: 15
}];



//그래프2 만들기
$(function(){
    $("#pie").dxPieChart({
        type: "doughnut",
        palette: "Soft Pastel",
        dataSource: dataSource2,
        title: {
            text: '방문 현황',
            font: { size: 18}
        },
        tooltip: {
            enabled: true,
            format: "decimal",
            customizeTooltip: function (arg) {
                var percentText = Globalize.formatNumber(arg.percent, {  
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
    
                return {
                    text: arg.valueText + " - " + percentText
                };
            }
        },
        legend: {
            horizontalAlignment: "center",
            verticalAlignment: "bottom",
            itemTextPosition: "bottom",
            margin: 0
        },
        series: [{        
            argumentField: "region",
            label: {
                visible: true,
                format: "decimal",
                connector: {
                    visible: true
                }
            }
        }]
    });
});
