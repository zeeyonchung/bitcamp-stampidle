$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		location.href = clientRoot + "/auth/login.html";
	}
	var userData = ajaxResult.data;
	var userNo = userData.customMemberNo;
	var cafeMemberNo = 1;
	
	
	//코멘트 입력
	$('.btn-send').click(function() {
		if ($('.chat-input').val() == "") {
			alert("메시지를 입력해주세요.");
			return $('.chat-input').focus();
		}
    	var param = {
    		"sendMemberNo": userNo,
    		"cafeMemberNo": cafeMemberNo,
    		"customMemberNo": userNo,
    		"contents": $('.chat-input').val()
	    };
    	
	    $.post(serverRoot + '/message/addCustom.json', param, function(ajaxResult) {
	        if (ajaxResult.status != "success") {
	          alert(ajaxResult.data);
	          return;
	        }
	        location.href = '';
	    }, 'json'); // post();
	}); // click()
	
	
	
});
