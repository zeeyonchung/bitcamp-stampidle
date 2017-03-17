$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		location.href = clientRoot + "/auth/login.html";
	}
	var userData = ajaxResult.data;
	var userNo = userData.customMemberNo;
	var cafeMemberNo = 1;
	
	
	//메시지 입력
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
	    }, 'json');
	});
	
	
	//메시지 리스트받아오기
	/*$.getJSON(serverRoot + '/cstmr_m/message/getMsgList.json', 
	    {'customMemberNo': userNo,
	    'cafeMemberNo': cafeMembNo
	    }, function(ajaxResult) {
    	var message = ajaxResult.data;
    	$('.'pre-msg'').text(message.message);
    	$('.cafe-name').text(message.cafeName);
    	$('.'pre-msg'').text(message.uploadTime);
    	$('.cafe-name').text(message.cafeLogoPath);
    	
    	//sendMemberNo
    	
		    	
		    	
	});*/
	
	
});
