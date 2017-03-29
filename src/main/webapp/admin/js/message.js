$(function(){

$('.modal-dialog').css('top', window.innerHeight/2 - 300);

var userNo = 0;

$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		location.href = clientRoot + "/auth/login.html";
	}
	var userData = ajaxResult.data;
	userNo = userData.cafeMemberNo;
	
	
	$(".inbox").css("display","block");
	getMsgInbox();
	getMyCustomerList();
});
	


/** 받은 편지 보기 **/
$('.btn-inbox').click(function(event) {
	event.stopImmediatePropagation();
	if (!$('.btn-inbox').hasClass("select-category")) {
		$(".msgArea.sent").html("");
		getMsgInbox();
		$('.btn-inbox').addClass("select-category");
		$('.btn-sent').removeClass("select-category");
		$(".inbox").css("display","block");
		$(".sent").css("display","none");
	}
});

/** 보낸 편지 보기 **/
$('.btn-sent').click(function(event) {
	event.stopImmediatePropagation();
	if (!$('.btn-sent').hasClass("select-category")) {
		$('.btn-sent').addClass("select-category");
		$('.btn-inbox').removeClass("select-category");
		$(".msgArea.sent").html("");
		getMsgSent();
		$(".inbox").css("display","none");
		$(".sent").css("display","block");
	}
});






/*************** 받은 메시지 받아오기 ***************/
function getMsgInbox() {
	//받아오기 전에, 이전에 생성된 목록은 삭제
	$('.msgArea.inbox .one-msg').remove();
	
	$.getJSON(serverRoot + '/message/getMsgListCafe.json', {
		'cafeMemberNo': userNo,
		'sendMember': 'cstmr'
	}, function(ajaxResult) {
    	var message = ajaxResult.data;
    	
    	$.each(message, function(i){
    		if (message[i].photoPath == null || message[i].photoPath == "") {
    			message[i].photoPath = "profile.png"
    		}
    		
    		$("<div class='one-msg'>"
    		+ "<span class='msg-date'>" + message[i].uploadTime.slice(0,-2)
    		+ "</span><div class='btn-delete'>x</div>"
    		+"<img src='../image/reply.png' class='btn-reply' data-no='" + message[i].customMemberNo
    		+"'><div class='msg-left'>"
    		+"<img src='../../upload/" +  message[i].photoPath
    		+ "' alt='customPhoto' class='img-circle'></div>"
    		+"<div class='msg-content'><div class='sub'><span class='custom-name'>"  + message[i].name
    		+ "</span></div><div class='pre-msg'>" + message[i].contents
    		+ "</div></div></div>").appendTo(".msgArea.inbox");
		});
    	
    	
    	
    	$('.btn-reply').click(function() {
    		event.stopImmediatePropagation();
    		msgPopOpen();
    		console.log($(this).attr('data-no'))
    		$('.writeArea .tit').text('답장하기');
    		$('select[name=customerNo]').val($(this).attr('data-no'));
    	});
    	
	});
}


/*************** 보낸 메시지 받아오기 ***************/
function getMsgSent() {
	//받아오기 전에, 이전에 생성된 목록은 삭제
	$('.msgArea.sent .one-msg').remove();
	
	$.getJSON(serverRoot + '/message/getMsgListCafe.json', {
		'cafeMemberNo': userNo,
		'sendMember': 'cafe'
	}, function(ajaxResult) {
    	var message = ajaxResult.data;
    	$.each(message, function(i){
    		if (message[i].photoPath == null || message[i].photoPath == "") {
    			message[i].photoPath = "profile.png"
    		}
    		
    		$("<div class='one-msg' data-no='" + message[i].messageNo
    	    + "'><span class='msg-date'>" + message[i].uploadTime.slice(0,-2)
    		+ "</span><!--<div class='btn-delete'>x</div>--><div class='msg-left'>"
    		+"<img src='../../upload/" +  message[i].photoPath
    		+ "' alt='customer photo' class='img-circle'></div>"
    		+"<div class='msg-content'><div class='sub'><span class='custom-name'><span class='to'>To. </span>"  + message[i].name
    		+ "</span></div><div class='pre-msg'>" + message[i].contents
    		+ "</div></div></div>").appendTo(".msgArea.sent");
		});
	});
}






//나의 고객리스트 가져오기
function getMyCustomerList() {
	$.getJSON(serverRoot + '/message/customerNoNameList.json?cafeMemberNo=' + userNo, function(ajaxResult) {
		var customerNoNameList = ajaxResult.data;
		$.each(customerNoNameList, function(i){
			$("<option value='" + customerNoNameList[i].customMemberNo
		    + "'>" + customerNoNameList[i].customName + " (" + customerNoNameList[i].customTel + ")"
			+ "</option>").appendTo("#customerNoNameList");
		});
	});
}


	
//메시지 입력 버튼
function msgPopOpen() {
	$('body.message').css("overflow-y","hidden");
	var popTop = $(window).height()/2 - $(".writeArea").outerHeight()/2 - 150;
	$('.writeWrap').fadeIn(300);
    $('.writeArea').fadeIn(500);
    $('.writeArea').css("margin-top",popTop);
}


$('.btn-write').click(function(event) {
	event.stopImmediatePropagation();
	msgPopOpen();
});


$('.btn-close').click(function(event) {
	event.stopImmediatePropagation();
    $('.writeWrap').fadeOut(300);
    $('body.message').css("overflow-y","scroll");
});



/*********************** 메시지 보내기 ***********************/
$('.btn-send').click(function(event) {
	event.stopImmediatePropagation();
	if ($('.chat-input').val() == "") {
		swal({title:"메시지를 입력해주세요.",
			  type:"warning"});
		return $('.chat-input').focus();
	} else if ($('select[name=customerNo]').val() == null){
		swal({title:"쪽지를 보내실 고객을<br>선택해주세요.",
			  type:"warning",
			  html: true})
		return $('select[name=customerNo]').focus();
	}
	var param = {
		"sendMember": 'cafe',// cstmr/cafe
		"cafeMemberNo": userNo,
		"customMemberNo": $('select[name=customerNo]').val(),
		"contents": $('.chat-input').val()
    };
	
    $.post(serverRoot + '/../message/insertMsg.json', param, function(ajaxResult) {
        if (ajaxResult.status != "success") {
          alert(ajaxResult.data);
          return;
        }
        swal({title:"전송 완료!",
        	  type:"success"});
        
        $('.chat-input').val("");
        $('.writeWrap').fadeOut(200);
        getMsgSent();
    }, 'json');
});


});

