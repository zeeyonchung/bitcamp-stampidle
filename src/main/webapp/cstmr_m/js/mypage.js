/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/login.html";
		
	}
	var userData = ajaxResult.data;
	var userNo = userData.customMemberNo;
	var userName = userData.name;
	var userTel = userData.tel;
	
	console.log(userNo, userName, userTel);
	
	$('.name').val(userName);
	$('.tel').val(userTel);
	
	$('submin').click(function(event) {
		event.preventDefault();
		var param = {
				
		}
	});
	
});

