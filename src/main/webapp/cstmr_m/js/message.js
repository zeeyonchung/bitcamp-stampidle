$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		location.href = clientRoot + "/auth/login.html";
	}
	var userData = ajaxResult.data;
	var userNo = userData.customMemberNo;
	var cafeMemberNo = 1;
	

	//메시지 리스트받아오기
	$.getJSON(serverRoot + '/message/getMsgList.json', 
	    {'customMemberNo': userNo,
	    'cafeMemberNo': cafeMemberNo
	    }, function(ajaxResult) {
    	var message = ajaxResult.data;

    	$.each(message, function(i){
    		$("<div class='one-msg'><span class='msg-date'>" + message[i].uploadTime
    		+ "</span><div class='msg-left'><span class='button__badge'>0</span>"
    		+"<img src='../../upload/" +  message[i].logoPath
    		+ "' alt='cafeLogo' class='img-circle'></div>"
    		+"<div class='msg-content'><div class='sub'><span class='cafe-name'>"  + message[i].cafeName
    		+ "</span></div><div class='pre-msg'>" + message[i].contents
    		+ "</div></div></div>").appendTo(".msgArea");
		});
	});
	
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
	
	
	
});
