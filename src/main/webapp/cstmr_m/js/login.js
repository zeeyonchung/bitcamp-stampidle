// 로그인
$('.login-btn').click(function() {
	var param = {
		name: $('.name').val(),
		tel: $('.tel').val()
	};

	$.post(serverRoot + '/auth/login.json', param, function(ajaxResult) {
		console.log(ajaxResult);
		if (ajaxResult.status == "success") {
			location.href = "../main/main.html";
			return;
		}
	}, 'json');
	
});

// 회원가입
$('.register-ok-btn').click(function() {
	
	var param = {
		name: $('#name').val(),
		tel: $('#tel').val()
	};

	$.post(serverRoot + '/customMember/add.json', param, function(ajaxResult) {
		console.log(ajaxResult);
		if (ajaxResult.status == "success") {
			alert("등록이 완료되었습니다. 로그인하여 접속해주세요");
			location.href = "login.html";
		}
	}, 'json');
}); // click()



