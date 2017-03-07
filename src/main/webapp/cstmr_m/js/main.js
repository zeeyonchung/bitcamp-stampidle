/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		
	}
	var userData = ajaxResult.data;
	var userName = userData.name;
	
	console.log(userName);
	$('h2 > span').append(userName);
	
});