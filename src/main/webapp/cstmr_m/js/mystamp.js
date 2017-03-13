/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		//console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		
	}
	var userData = ajaxResult.data;
	var userNo = userData.customMemberNo;

	/*총 가진 카드 갯수 가져오기*/
	$.getJSON(serverRoot + '/customCard/getMyCardCount.json?customMemberNo=' + userNo, function(ajaxResult) {
		$('#num').text(ajaxResult.data);
	});
	/* 카드일련번호 가져오기*/
	$.getJSON(serverRoot + '/customCard/getMyCardNo.json?customMemberNo=' + userNo, function(ajaxResult) {
		//console.log(ajaxResult.data.length);
		var cardNoList = ajaxResult.data;
		console.log(cardNoList);
		for (var i in cardNoList) {
		/* 카드정보 가져오기*/
			$.getJSON(serverRoot + '/customCard/getStampInfo.json?customCardNo=' + cardNoList[i].mcno, function(ajaxResult) {
				var list = ajaxResult.data;
				var infodiv = $('.infodiv');
				var template = Handlebars.compile($('#infoTemplate').html());
				infodiv.append(template({"list":list}));
			});
		};
	});
});
