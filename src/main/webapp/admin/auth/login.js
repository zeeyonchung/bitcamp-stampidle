$('.login-btn2').click(function() {
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
			swal({
				  title: param.id + "님 환영합니다.",
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
	
}); // click()

// email 쿠키가 있다면 값을 넣는다.
$('#id').val(getCookie('id').replace(/"/g, ''));



/*********** 존재 여부 확인 **********/
// 아이디 확인
$('.register #id3').keyup(function() {
	$.getJSON('http://b.bitcamp.com:8888/bitcamp_stampidle/admin/auth/checkId.do?id=' + $(this).val(),
		function(result) {
			if (result != 0) {
				$('<span class="warn" style="position:absolute; right:24px; top:18px; color:#ff5948">사용 중인 아이디</span>').appendTo($('#id3').parent('.form-group'));
				$(this).val('');
			} else {
				$('#id3').parent('.form-group').children('.warn').remove();
			}
	})
});

// 핸드폰번호 확인
$('.register #phone').keyup(function() {
	$.getJSON('http://b.bitcamp.com:8888/bitcamp_stampidle/admin/auth/checkPhone.do?phone=' + $(this).val(),
		function(result) {
			if (result != 0) {
				$('<span class="warn" style="position:absolute; right:24px; top:18px; color:#ff5948">사용 중인 번호</span>').appendTo($('#phone').parent('.form-group'));
				$(this).val('');
			} else {
				$('#phone').parent('.form-group').children('.warn').remove();
			}
	})
});

// 사업자번호 확인
$('.register #companyNo').keyup(function() {
	$.getJSON('http://b.bitcamp.com:8888/bitcamp_stampidle/admin/auth/checkCRN.do?crn=' + $(this).val(),
		function(result) {
			if (result != 0) {
				$('<span class="warn" style="position:absolute; right:24px; top:18px; color:#ff5948">사용 중인 사업자번호</span>').appendTo($('#companyNo').parent('.form-group'));
				$(this).val('');
			} else {
		        $('#companyNo').parent('.form-group').children('.warn').remove();
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
    		swal("이미 가입된 회원입니다.");
    		return;
    	}
    	$('.loginPop').fadeOut(200);
        $('.register').css('display', 'none');
        swal("가입이 완료되었습니다.", "로그인하여 바로 스탬피들을 이용하세요", "success")
    }, 'json');
    
}); // click()



/***** 인증번호 ******/
$('.verify-code .send-btn').click(function(event) {
	event.preventDefault();
	$('.send-btn').attr('disabled',true);
	$.getJSON('http://b.bitcamp.com:8888/bitcamp-stampidle/admin/auth/sendverify.do?tel=' + $('#tel-input').val(),
		function(result) {
			$('.send-btn').text('인증번호가 발송되었습니다.');
	})
});


$('.verify-code .ok-btn').click(function(event) {
	event.preventDefault();
	$.getJSON('http://b.bitcamp.com:8888/bitcamp-stampidle/admin/auth/checkverify.do?tel=' + $('#tel-input').val(),
		function(result) {
			if (result == $('#code-input').val()) {
				/** 디비의 인증번호 삭제 **/
				$.getJSON('http://b.bitcamp.com:8888/bitcamp-stampidle/admin/auth/deleteverify.do?tel=' + $('#tel-input').val(),
					function(result) {
				});
				
				swal (
					{title: "인증 성공!",
					closeOnConfirm: true,
					type: "success"},
					function(isConfirm) {
						$('.verify-code').css('display', 'none');
						$('.find-password').css('display', 'none');
						$('.find-id').css('display', 'block');
						return;
					}
				);
			} else {
				swal (
						{title: "인증 실패",
						closeOnConfirm: true,
						type: "error"},
						function(isConfirm) {
							return;
						}
				);
			}
	})
});