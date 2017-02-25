
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
		var status = ajaxResult.status;
		if (status != "success") {
			alert(ajaxResult.data);
			return;
		}
	
		var loginUser = ajaxResult.data;
	
		$('#id').text(loginUser.id);
		$('#phone').val(loginUser.cellNo);
		$('#email').val(loginUser.email);
		$('#companyNo').val(loginUser.companyNo);
});


$('.myeditPop .edit-btn').click(function() {
	$('.profilePop').fadeOut(200);
	$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
		var loginUser = ajaxResult.data;
		var param = {
			"cafeMemberNo" : loginUser.cafeMemberNo,
			"id" : $('#id').text(),
			"password" : $('#password').val(),
			"cellNo" : $('#phone').val(),
			"Email" : $('#email').val(),
			"companyNo" : $('#companyNo').val()
		};
		$.post(serverRoot + '/cafeMember/update.json', param, function(ajaxResult) {
			if (ajaxResult.status != "success") {
				alert(ajaxResult.data);
				return;
			} 
		}, 'json');
		
	});
});


