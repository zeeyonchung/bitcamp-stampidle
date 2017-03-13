$(function() {
	var cafeMemberNo = 11;
	$.getJSON(serverRoot + '/customMember/srchList.json?cafeMemberNo=' + cafeMemberNo, function(ajaxResult) {
        var status = ajaxResult.status;
        if (status != "success") {
        	return;
        }
        
        var availableTags = [];
        
        $.each( ajaxResult.data, function(index, value) {
            availableTags.push({"label": value.name + "  (" + value.tel + ")", "value":  value.customMemberNo}) });
        
        $("#searchbox").autocomplete({
            source: availableTags,
            select: function( event, ui ) {
              return false;
            },
            focus: function(event, ui) {
                $("#searchbox").val(ui.item.label);
                return false;
            }
        });
        
    });
});