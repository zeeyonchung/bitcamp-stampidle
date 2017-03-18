$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		location.href = clientRoot + "/auth/login.html";
	}
	var userData = ajaxResult.data;
	var userNo = userData.customMemberNo;
	
	
	$(".inbox").css("display","block");
	getMsgInbox();
	
	
	$('.btn-inbox').click(function() {
		if (!$('.btn-inbox').hasClass("select-category")) {
			getMsgInbox();
			$('.btn-inbox').addClass("select-category");
			$('.btn-sent').removeClass("select-category");
			$(".inbox").fadeIn(300);
			$(".sent").fadeOut(300);
		}
	});
	$('.btn-sent').click(function() {
		if (!$('.btn-sent').hasClass("select-category")) {
			$('.btn-sent').addClass("select-category");
			$('.btn-inbox').removeClass("select-category");
			getMsgSent();
			$(".sent").fadeIn(300);
			$(".inbox").fadeOut(300);
		}
	});
	
	/*var allBtnsDelete = $('.btn-delete');
	
	for (var i in allBtnsDelete) {
		console.log("delete" + i + allBtnsDelete.size());
		$(allBtnsDelete.eq(i)).click(function() {
			//deleteMsg();
		});
	}*/
	
	//받은 메시지 받아오기
	function getMsgInbox() {
		$.getJSON(serverRoot + '/message/getMsgListCstmr.json', {
			'customMemberNo': userNo,
			'sendMember': 'cafe'
		}, function(ajaxResult) {
	    	var message = ajaxResult.data;
	    	var count = 0;
	    	$.each(message, function(i){
	    		$("<div class='one-msg' data-no='" + count++
	    		+ "'><span class='msg-date'>" + message[i].uploadTime.slice(0,-2)
	    		+ "</span><!--<div class='btn-delete'>x</div>--><div class='msg-left'>"
	    		+"<img src='../../upload/" +  message[i].logoPath
	    		+ "' alt='cafeLogo' class='img-circle'></div>"
	    		+"<div class='msg-content'><div class='sub'><span class='cafe-name'>"  + message[i].cafeName
	    		+ "</span></div><div class='pre-msg'>" + message[i].contents
	    		+ "</div></div></div>").appendTo(".msgArea.inbox");
			});
		});
	}
	
	//보낸 메시지 받아오기
	function getMsgSent() {
		$.getJSON(serverRoot + '/message/getMsgListCstmr.json', {
			'customMemberNo': userNo,
			'sendMember': 'cstmr'
		}, function(ajaxResult) {
	    	var message = ajaxResult.data;
	    	var count = 0;
	    	$.each(message, function(i){
	    		$("<div class='one-msg' data-no='" + count++
	    	    + "'><span class='msg-date'>" + message[i].uploadTime.slice(0,-2)
	    		+ "</span><!--<div class='btn-delete'>x</div>--><div class='msg-left'>"
	    		+"<img src='../../upload/" +  message[i].photoPath
	    		+ "' alt='customer photo' class='img-circle'></div>"
	    		+"<div class='msg-content'><div class='sub'><span class='cafe-name'>"  + message[i].cafeName
	    		+ "</span></div><div class='pre-msg'>" + message[i].contents
	    		+ "</div></div></div>").appendTo(".msgArea.sent");
			});
		});
	}
	
	
	//메시지 삭제
	/*function deleteMsg() {
		var param = {
			"customMemberNo": userNo,
			"cafeMemberNo": cafeMemberNo,
			"sendMember": 'cafe',// cstmr/cafe
    		"contents": $('.pre-msg').text(),
    		"uploadTime": $('.msg-date').text()
	    };
		$.getJSON(serverRoot + '/message/deleteMsg.json', {
			'customMemberNo': userNo,
			'sendMember': 'cstmr'
		}, function(ajaxResult) {
	    	var message = ajaxResult.data;
		});
	}*/
	
	//고객 카페리스트 get
	$.getJSON(serverRoot + '/message/cafeNoNameList.json?customMemberNo=' + userNo, function(ajaxResult) {
		var cafeNoNameList = ajaxResult.data;
		$.each(cafeNoNameList, function(i){
    		$("<option value='" + cafeNoNameList[i].cafeMemberNo
    	    + "'>" + cafeNoNameList[i].cafeName
    		+ "</option>").appendTo("#cafeNoNameList");
		});
	});
		
	
	alert("tsft");
	//메시지 입력
	$('.btn-write').click(function() {
		$('.writeWrap').fadeIn(300);
	    $('.writeArea').fadeIn(500);
	    $('body.message').css("overflow-y","hidden");
	    var popTop = $(window).height()/2 - $(".writeArea").outerHeight()/2;
	    $('.writeArea').css("margin-top",popTop);
	});
	$('.btn-close').click(function() {
	    $('.writeWrap').fadeOut(300);
	    $('body.message').css("overflow-y","scroll");
	});
    
	$('.btn-send').click(function() {
		if ($('.chat-input').val() == "") {
			alert("메시지를 입력해주세요.");
			return $('.chat-input').focus();
		} else if ($('select[name=cafeNo]').val() == null){
			alert("쪽지를 보내실 카페를 선택해주세요.")
			return $('select[name=cafeNo]').focus();
		}
    	var param = {
			"sendMember": 'cstmr',// cstmr/cafe
    		"cafeMemberNo": $('select[name=cafeNo]').val(),
    		"customMemberNo": userNo,
    		"contents": $('.chat-input').val()
	    };
    	
	    $.post(serverRoot + '/message/insertMsg.json', param, function(ajaxResult) {
	        if (ajaxResult.status != "success") {
	          alert(ajaxResult.data);
	          return;
	        }
	        alert("쪽지를 보냈습니다.");
	        $('.chat-input').val("");
	        $('.writeWrap').fadeOut(200);
	        getMsgSent();
	    }, 'json');
	});
	
	
});
