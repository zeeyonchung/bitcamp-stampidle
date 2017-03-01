$(function() {
	$.getJSON(serverRoot + '/customMember/srchList.json', function(ajaxResult) {
        var status = ajaxResult.status;

        if (status != "success")
            return;

        var jsonSrchList = ajaxResult.data;
            console.log(jsonSrchList.value);
        var arrSrchList = $.map(jsonSrchList, function(jdata) {
            return jdata
        });

        var availableTags = [];
        
        $.each( ajaxResult.data, function(index, value) {
            availableTags.push(value.tel);
            //availableTags.push(value.name + " (" + value.tel + ")");
        });
        
        $("#searchbox").autocomplete({
            source: availableTags
        });
    });

});