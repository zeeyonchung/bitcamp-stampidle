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





