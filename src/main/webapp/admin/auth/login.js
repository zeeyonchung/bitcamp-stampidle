$('.login-btn').click(function() {
	// 이메일 저장이 체크되어 있으면 쿠키에 저장하고, 
	// 체크되어 있지 않으면 쿠키에서 제거한다.
	if ($('#save-id').is(':checked')) {
		setCookie('id', $('#id').val(), 30);
	} else {
		setCookie('id', '', 0);
	}
	
	var param = {
		id: $('#id').val(),
		password: $('#password').val()
	};

	$.post(serverRoot + '/auth/login.json', param, function(ajaxResult) {
		console.log(ajaxResult);
		if (ajaxResult.status == "success") {
			location.href = "../main/main.html";
			return;
		}
		
	}, 'json');
	
}); // click()

// email 쿠키가 있다면 값을 넣는다.
$('#id').val(getCookie('id').replace(/"/g, ''));


//회원가입
$('#add-btn').click(function(event) {
	event.preventDefault();
    var param = {
    		id: $('#id3').val(),
    		cellNo: $('.form-group #phone').val(),
    		companyNo: $('.form-group #companyNo').val(),
    		Email: $('.form-group #email').val(),
    		password: $('#password3').val()
    };
    console.log(param);
    
    
    $.post(serverRoot + '/cafeMember/add.json', param, function(ajaxResult) {
    	if (ajaxResult.status != "success") {
    		alert(ajaxResult.data);
    		return;
    	}
    	$('.loginPop').fadeOut(200);
        $('.register').css('display', 'none');
    	alert('등록이 완료되었습니다.');
    }, 'json');
    
}); // click()



