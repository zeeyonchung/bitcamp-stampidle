$(function() {
	$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
		if (ajaxResult.status != "success") {
			console.log(ajaxResult.data);
			location.href = clientRoot + "/auth/login.html";
			/*로그인 안 했으면 로그인 페이지로 보내기*/
		}
		var cafeMember = ajaxResult.data;
		cafeMemberNo = cafeMember.cafeMemberNo;
	
		$.getJSON(serverRoot + '/customMember/srchList.json?cafeMemberNo=' + cafeMemberNo, function(ajaxResult) {
	        var status = ajaxResult.status;
	
	        if (status != "success") {
	        	return;
	        }
	        
	        
	        console.log(ajaxResult.data);
	
	        var availableTags = [];
	        
	        $.each( ajaxResult.data, function(index, value) {
	           // availableTags.push(value.tel);
	            availableTags.push({"label": value.name + "  (" + value.tel + ")", "value":  value.customMemberNo}) });
	        
	        $("#searchbox").autocomplete({
	            source: availableTags,
	            select: function( event, ui ) {
	              alert("선택~~~~");
	              location.href = serverRoot + '/stampidle_cs/customerdetail.html?customMemberNo=' + ui.item.value;
	              return false;
	            }
	        });
	        
	        $("#searchbox-main").autocomplete({
	            source: availableTags
	        });
	        
	    });

	});
	
});