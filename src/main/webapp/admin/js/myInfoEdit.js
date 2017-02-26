
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	var loginUser = ajaxResult.data;
    
	$.getJSON(serverRoot + '/cafeMember/detail.json?cafeMemberNo=' + loginUser.cafeMemberNo, function(ajaxResult1) {
		var status = ajaxResult.status;
			if (status != "success") {
				alert(ajaxResult.data);
				return;
			}
			var loginUserDetail = ajaxResult1.data;
		
			$('#id').text(loginUserDetail.id);
			$('#phone').val(loginUserDetail.cellNo);
			$('#email').val(loginUserDetail.email);
			$('#companyNo').val(loginUserDetail.companyNo);
	});

});



$('.myeditPop .edit-btn').click(function() {
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


