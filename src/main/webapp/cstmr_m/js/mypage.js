/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		
	}
	var userData = ajaxResult.data;
	var userNo = userData.customMemberNo;
	var userName = userData.name;
	var userTel = userData.tel;
	
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
			alert('개인정보 변경이 완료되었습니다.');
		}, 'json'); 
	});
	$.getJSON(serverRoot + '/customMember/getOne.json?customMemberNo=' + userNo, function(ajaxResult) {
		var myData = ajaxResult.data;
		var nick = myData.nick;
		var mail = myData.email;
		var photo = myData.photoPath;
		$('.nickname').val(nick);
		$('.email').val(mail);
		if (myData.photoPath == null) {
			$('#photo-img').hide();
		} else {
			$('#photo-img').attr("src", '../../upload/' + myData.photoPath);
		}
	});
});

