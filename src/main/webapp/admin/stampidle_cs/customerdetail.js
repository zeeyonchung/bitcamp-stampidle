try {
  var customMemberNo = location.href.split('?')[1].split('=')[1];
} catch (error) {
	var customMemberNo = -1;
}


var cafeMemberNo = 0;
/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}
	var cafeMember = ajaxResult.data;
	cafeMemberNo = cafeMember.cafeMemberNo;
});



$.getJSON(serverRoot + '/customCard/stampDetail.json', 
		{'customMemberNo': customMemberNo,
		'cafeMemberNo': cafeMemberNo},
		function(ajaxResult) {
		
		var status = ajaxResult.status;
		
		if (status != "success") {
			alert(ajaxResult.data);
			return;
		}
		
		var customCard = ajaxResult.data;
		
		$('#custom-photo').attr('src', '../../upload/' + customCard.customPhoto);
		$('#name').text(customCard.customName);
		$('#phone-number').text(customCard.customTel);
		$('.eventdetail #evnet-img').attr('src', '../../upload/' + customCard.eventPhotoPath);
		$('.eventdetail .table3 .tabletd4').text(customCard.eventView);
		$('.eventdetail .contents').text(customCard.eventContents);
});

