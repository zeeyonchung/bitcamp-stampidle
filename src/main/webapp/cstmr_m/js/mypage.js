/*로그인 정보를 가져와서*/
var userName;
var userTel;
var mail;

$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		
	}
	var userData = ajaxResult.data;
	var userNo = userData.customMemberNo;
	userName = userData.name;
	userTel = userData.tel;
	
	console.log(userData)
	
	console.log(userNo, userName, userTel);
	$('.nameTop').text(userName);
	$('.name').val(userName);
	$('.tel').val(userTel);
	
	$('.submit').click(function(event) {
		event.preventDefault();
		var param = {
			customMemberNo: userNo,
			tel: $('.tel').val(),
			email: $('.email').val(),
			name: $('.name').val(),
			nick: $('.nickname').val(),
			photoPath: $('#photo-path').val()
		};
		console.log(param);
		$.post(serverRoot + '/customMember/update.json', param, function(ajaxResult) {
			if (ajaxResult.status != "success") {
				alert(ajaxResult.data);
				return;
			}
			reLogin($('.name').val(), $('.tel').val());
			
			swal({title:"정보가 변경되었습니다.",
			  type:"success"},
			  function(isConfirm) {
				  location.href=serverRoot + '/main/main.html';
			});
		}, 'json'); 
	});
	
	$.getJSON(serverRoot + '/customMember/getOne.json?customMemberNo=' + userNo, function(ajaxResult) {
		var myData = ajaxResult.data;
		var nick = myData.nick;
		mail = myData.email;
		var photo = myData.photoPath;
		$('.nickname').val(nick);
		$('.email').val(mail);
		if (myData.photoPath == null) {
			$('#photo-img').hide();
		} else {
			$('#photo-img').attr("src", '../../upload/' + myData.photoPath);
			$('#photo-path').val(myData.photoPath);
		}
	});
});



function reLogin(name, tel) {
	$.getJSON(serverRoot + '/auth/logout.json', function(ajaxResult) {
		$.getJSON(serverRoot + '/auth/login.json', {name: name, tel: tel}, function(ajaxResult) {
		})
	})
}



/*** 존재 여부 확인 ***/

//전화번호 확인
$('input.tel').keyup(function() {
	var value = $(this).val();
	$.getJSON('http://b.bitcamp.com:8888/bitcamp-stampidle/cstmr_m/auth/checkTel.do?tel=' + value,
		function(result) {
			if (result != 0 && value != userTel) {
				$('<span class="warn" style="position:absolute; top: 10px; right:20px; color:#ff5948">X</span>').appendTo($('input.tel').parent('.input-are li'));
				$(this).val('');
			} else {
				$('input.tel').parent('.input-are li').children('.warn').remove();
			}
	})
});


//이메일 확인
$('input.email').keyup(function() {
	var value = $(this).val();
	$.getJSON('http://b.bitcamp.com:8888/bitcamp-stampidle/cstmr_m/auth/checkEmail.do?email=' + value,
		function(result) {
			if (result != 0 && value != mail) {
				$('<span class="warn" style="position:absolute; top: 10px; right:20px; color:#ff5948">X</span>').appendTo($('input.email').parent('.input-are li'));
				$(this).val('');
			} else {
				$('input.email').parent('.input-are li').children('.warn').remove();
			}
	})
});