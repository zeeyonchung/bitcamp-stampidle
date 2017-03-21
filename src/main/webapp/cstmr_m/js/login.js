// 로그인
$('.login-btn').click(function() {
	var param = {
		name: $('.name').val(),
		tel: $('.tel').val()
	};

	$.post(serverRoot + '/auth/login.json', param, function(ajaxResult) {
		console.log(ajaxResult);
		if (ajaxResult.status == "success") {
			swal({
				  title: param.name + "님 환영합니다.",
				  closeOnConfirm: true,
				  imageUrl:"../../image/pabi.png"
				},
				function(isConfirm) {
					location.href = "../main/main.html";
				});
			} else {
		swal({
			  title: "가입된 회원이 아닙니다",
		      text:"로그인 정보를 확인해주세요",
			  closeOnConfirm: true,
			  type: "error"
			},
			function(isConfirm) {
				return;})
		}
	}, 'json');
	
});


/*** 존재 여부 확인 ***/
//전화번호 확인
$('.register #tel').keyup(function() {
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
			swal("가입이 완료되었습니다.", "로그인하여 바로 스탬피들을 이용하세요", "success")
		}
	}, 'json');
}); // click()



