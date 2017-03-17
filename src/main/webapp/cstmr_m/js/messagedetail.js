$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		location.href = clientRoot + "/auth/login.html";
	}
	var userData = ajaxResult.data;
	var userNo = userData.customMemberNo;
	var cafeMemberNo = 1;
	

	//메시지 리스트받아오기
	$.getJSON(serverRoot + '/messageDetail/getMsgList.json', 
	    {'customMemberNo': userNo,
	    'cafeMemberNo': cafeMemberNo
	    }, function(ajaxResult) {
	   var message = ajaxResult.data;

	   $('.name').text(message[0].cafeName);
       $.each(message, function(i){
			if (message[i].sendMember == "cafe") {
    			$("<div class='mewrap'><img class='img-circle' src='../../upload/" +  message[i].logoPath
	    		+ "' alt='cafeLogo'><div class='bubble me'>" + message[i].contents
	    		+"</div><div class='time'>" +  message[i].uploadTime
	    		+ "</div></div>").appendTo(".chat");
    		} else {
    			$("<div class='youwrap'><div class='bubble you'>" +  message[i].contents
	    		+ "</div><div class='time'>" + message[i].uploadTime
	    		+ "</div></div>").appendTo(".chat");
    		}
		});
	});
	
	//메시지 입력
	$('.btn-send').click(function() {
		if ($('.chat-input').val() == "") {
			alert("메시지를 입력해주세요.");
			return $('.chat-input').focus();
		}
    	var param = {
    		"sendMember": 'cstmr',// cstmr/cafe
    		"cafeMemberNo": cafeMemberNo,
    		"customMemberNo": userNo,
    		"contents": $('.chat-input').val()
	    };
    	
	    $.post(serverRoot + '/message/insertMsg.json', param, function(ajaxResult) {
	        if (ajaxResult.status != "success") {
	          alert(ajaxResult.data);
	          return;
	        }
	        location.href = '';
	    }, 'json');
	});
	
	
	
});
