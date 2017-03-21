$(function(){
	
var userNo = 0;

$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		location.href = clientRoot + "/auth/login.html";
	}
	var userData = ajaxResult.data;
	userNo = userData.customMemberNo;
	
	
	$(".inbox").css("display","block");
	getMsgInbox();
	getMyCafeList();
});
	


/** 받은 편지 보기 **/
$('.btn-inbox').click(function(event) {
	event.stopImmediatePropagation();
	if (!$('.btn-inbox').hasClass("select-category")) {
		$(".msgArea.sent").html("");
		getMsgInbox();
		$('.btn-inbox').addClass("select-category");
		$('.btn-sent').removeClass("select-category");
		$(".inbox").fadeIn(300);
		$(".sent").fadeOut(300);
	}
});

/** 보낸 편지 보기 **/
$('.btn-sent').click(function(event) {
	event.stopImmediatePropagation();
	if (!$('.btn-sent').hasClass("select-category")) {
		$(".msgArea.sent").html("");
		getMsgSent();
		$('.btn-sent').addClass("select-category");
		$('.btn-inbox').removeClass("select-category");
		$(".sent").fadeIn(300);
		$(".inbox").fadeOut(300);
	}
});






/*************** 받은 메시지 받아오기 ***************/
function getMsgInbox() {
	//받아오기 전에, 이전에 생성된 목록은 삭제
	$('.msgArea.inbox .one-msg').remove();
	
	$.getJSON(serverRoot + '/message/getMsgListCstmr.json', {
		'customMemberNo': userNo,
		'sendMember': 'cafe'
	}, function(ajaxResult) {
    	var message = ajaxResult.data;
    	$.each(message, function(i){
    		$("<div class='one-msg'>"
    		+ "<span class='msg-date'>" + message[i].uploadTime.slice(0,-2)
    		+ "</span><div class='btn-delete'>x</div>"
    		+"<img src='../image/reply.png' class='btn-reply' data-no='" + message[i].cafeMemberNo
    		+"'><div class='msg-left'>"
    		+"<img src='../../upload/" +  message[i].logoPath
    		+ "' alt='cafeLogo' class='img-circle'></div>"
    		+"<div class='msg-content'><div class='sub'><span class='cafe-name'>"  + message[i].cafeName
    		+ "</span></div><div class='pre-msg'>" + message[i].contents
    		+ "</div></div></div>").appendTo(".msgArea.inbox");
		});

    	$('.btn-reply').click(function() {
    		event.stopImmediatePropagation();
    		msgPopOpen();
    		console.log($(this).attr('data-no'))
    		$('.writeArea .tit').text('답장하기');
    		$('select[name=cafeNo]').val($(this).attr('data-no'));
    	});
    	
	});
}


/*************** 보낸 메시지 받아오기 ***************/
function getMsgSent() {
	//받아오기 전에, 이전에 생성된 목록은 삭제
	$('.msgArea.sent .one-msg').remove();
	
	$.getJSON(serverRoot + '/message/getMsgListCstmr.json', {
		'customMemberNo': userNo,
		'sendMember': 'cstmr'
	}, function(ajaxResult) {
    	var message = ajaxResult.data;
    	$.each(message, function(i){
    		$("<div class='one-msg' data-no='" + message[i].messageNo
    	    + "'><span class='msg-date'>" + message[i].uploadTime.slice(0,-2)
    		+ "</span><!--<div class='btn-delete'>x</div>--><div class='msg-left'>"
    		+"<img src='../../upload/" +  message[i].photoPath
    		+ "' alt='customer photo' class='img-circle'></div>"
    		+"<div class='msg-content'><div class='sub'><span class='cafe-name'><span class='to'>To. </span>"  + message[i].cafeName
    		+ "</span></div><div class='pre-msg'>" + message[i].contents
    		+ "</div></div></div>").appendTo(".msgArea.sent");
		});

	});
}






//나의 카페리스트 가져오기
function getMyCafeList() {
	$.getJSON(serverRoot + '/message/cafeNoNameList.json?customMemberNo=' + userNo, function(ajaxResult) {
		var cafeNoNameList = ajaxResult.data;
		$.each(cafeNoNameList, function(i){
			$("<option value='" + cafeNoNameList[i].cafeMemberNo
		    + "'>" + cafeNoNameList[i].cafeName
			+ "</option>").appendTo("#cafeNoNameList");
		});
	});
}


	

	
//메시지 입력 버튼
function msgPopOpen() {
	$('body.message').css("overflow-y","hidden");
	var popTop = $(window).height()/2 - $(".writeArea").outerHeight()/2;
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
	} else if ($('select[name=cafeNo]').val() == null){
		swal({title:"쪽지를 보내실 카페를<br>선택해주세요.",
			  type:"warning",
			  html: true})
		return $('select[name=cafeNo]').focus();
	}
	var param = {
		"sendMember": 'cstmr',// cstmr/cafe
		"cafeMemberNo": $('select[name=cafeNo]').val(),
		"customMemberNo": userNo,
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


var $target = $('.btn-goTop');
$target.on('click', function(){
    $('html, body').animate({'scrollTop' : 0}, 200);
    return false;
});



$(window).scroll(function(event) {
	event.stopImmediatePropagation();
    if($(this).scrollTop() > 70){
         $(".category").css({ "position": "fixed", "top": "0px", "z-index":"100","height":"95px"});
    }else{
         $(".category").css({"position": "static","height":"60px"});
    }
});

});

