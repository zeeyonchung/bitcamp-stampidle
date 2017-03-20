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


/*** 존재 여부 확인 ***/
//전화번호 확인
$('.register #tel').keyup(function() {
	console.log($(this).val())
	$.getJSON('http://b.bitcamp.com:8888/bitcamp_stampidle/cstmr_m/auth/checkTel.do?tel=' + $(this).val(),
		function(result) {
			if (result != 0) {
				alert("이미 사용 중인 전화번호입니다!");
				$(this).val('');
			}
	})
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



