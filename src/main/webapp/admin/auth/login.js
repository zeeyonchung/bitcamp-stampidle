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



/*** 존재 여부 확인 ***/
// 아이디 확인
$('.register #id3').keyup(function() {
	$.getJSON('http://b.bitcamp.com:8888/bitcamp_stampidle/admin/auth/checkId.do?id=' + $(this).val(),
		function(result) {
			if (result != 0) {
				alert("이미 사용 중인 아이디입니다!");
				$(this).val('');
			}
	})
});

// 핸드폰번호 확인
$('.register #phone').keyup(function() {
	$.getJSON('http://b.bitcamp.com:8888/bitcamp_stampidle/admin/auth/checkPhone.do?phone=' + $(this).val(),
		function(result) {
			if (result != 0) {
				alert("이미 사용 중인 번호입니다!");
				$(this).val('');
			}
	})
});

// 사업자번호 확인
$('.register #companyNo').keyup(function() {
	$.getJSON('http://b.bitcamp.com:8888/bitcamp_stampidle/admin/auth/checkCRN.do?crn=' + $(this).val(),
		function(result) {
			if (result != 0) {
				alert("이미 등록된 사업자등록번호입니다!");
				$(this).val('');
			}
	})
});



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



