$(function() {
	$.getJSON(serverRoot + '/stat/getOne.json', function(ajaxResult) {
        var status = ajaxResult.status;

        if (status != "success")
            return;

        
    });

});