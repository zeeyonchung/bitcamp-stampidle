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




$.getJSON(serverRoot + '/customCard/customDetail.json', 
		{'customMemberNo': customMemberNo,
		'cafeMemberNo': cafeMemberNo},
		function(ajaxResult) {
		
		var status = ajaxResult.status;
		
		if (status != "success") {
			alert(ajaxResult.data);
			return;
		}
		
		var customCard = ajaxResult.data;
		console.log(customCard);
		
		if (customCard.customPhoto == null) {
			$('#custom-photo').attr('src', '../image/stmp4.png');
		} else {
			$('#custom-photo').attr('src', '../../upload/' + customCard.customPhoto);
		}
		$('#name').text(customCard.customName);
		$('#phone-number').text(customCard.customTel);
		$('.cpall-name').text(customCard.finishCardCount);
		$('.first-visit-date').text(customCard.firstVisitDate);
		$('.last-visit-date').text(customCard.lastVisitDate);
		$('.all-stamp').text(customCard.allStampCount);
});

});