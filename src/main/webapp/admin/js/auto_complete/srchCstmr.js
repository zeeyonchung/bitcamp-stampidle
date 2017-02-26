$.getJSON(serverRoot + '/customMember/srchList.json', function(ajaxResult) {
	var status = ajaxResult.status;

	if (status != "success")
		return;

	var jsonSrchList = ajaxResult.data;

	var arrSrchList = $.map(jsonSrchList, function(jdata) { return jdata }); 

	
	$.each(arrSrchList, function (index, value) {
        console.log(value);
    });
	
	var test = "test";
	var availableTags = [
        '가나' + test,
        '가나쵸콜렛',
        '가오리',
        '가상현실',
        '북마크',
        '북까페',
        '북촌한옥마을',
        '010-3238-0101',
        '010-3338-0222'
    ];
	    
	$(document).ready(function() {
		$("#searchbox").autocomplete(availableTags, {
			matchContains : true,
			selectFirst : false
		});
	});
});



