/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}
	var cafeMember = ajaxResult.data;
	var cafeMemberNo = cafeMember.cafeMemberNo;

	
	$('.addcstmerPop .add-btn').click(function() {
	    var param = {
			name: $('#custom-name').val(),
			tel: $('#custom-tel').val(),
			cafeMemberNo: cafeMemberNo
	    };
	    console.log(param);
	    
	    
	    $.post(serverRoot + '/customMember/add.json', param, function(ajaxResult) {
	    	if (ajaxResult.status != "success") {
	    		alert(ajaxResult.data);
	    		return;
	    	}
	    	location.href = serverRoot + '/stampidle_cs/customerdetail.html?customMember=' + ajaxResult.data;
	    	alert('등록이 완료되었습니다.');
	    }, 'json');
	    
	}); // click()

});