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
	    
	    
	    $.post(serverRoot + '/customMember/add.json', param, function(ajaxResult) {
	    	if (ajaxResult.status != "success") {
	    		alert(ajaxResult.data.message);
	    		console.log(ajaxResult.data.message)
	    		return;
	    	}
	    	swal({
				  title: "고객이 등록되었습니다",
				  closeOnConfirm: true,
				  type:"success"
				},
				function(isConfirm) {
					location.href = serverRoot + '/stampidle_cs/customerdetail.html?customMemberNo=' + ajaxResult.data;
				});
	    }, 'json');
	    
	}); // click()

});