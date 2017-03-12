/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
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
		var cardNo = ajaxResult.data;
		console.log(cardNo);
		/*스탬프 찍은것, 찍어야할것 가져오기*/
		$.getJSON(serverRoot + '/customCard/getStampNo.json?customCardNo=' + cardNo, function(ajaxResult) {
			var stampData = ajaxResult.data;
			$.each(stampData, function(i){
	            console.log(stampData[i].many);
	            console.log(stampData[i].stnum);
	            $('.stampNum > span').text(stampData[i].many).after("/" + stampData[i].stnum);
	            
	         });
		});
		/* 카페일련번호 가져오기*/
		$.getJSON(serverRoot + '/customCard/getCafeNo.json?customCardNo=' + cardNo, function(ajaxResult) {
			var cafeNo = ajaxResult.data;
			$.getJSON(serverRoot + '/cafe/detail.json?cafeMemberNo=' + cafeNo, function(ajaxResult) {
				var cafeName = ajaxResult.data.cafeName;
				var logPath = ajaxResult.data.logPath;
				console.log(logPath);
				$('.cafeName').text(cafeName);
				$('.cardArea > img').attr("src","/bitcamp_stampidle/upload/"+logPath);
			});
			$.getJSON(serverRoot + '/tag/detail.json?cafeMemberNo=' + cafeNo, function(ajaxResult) {
				var tag = ajaxResult.data.tagName;
				$('.tag > span').text("#" + tag);
			});
			$.getJSON(serverRoot + '/cafeTime/detail.json?cafeMemberNo=' + cafeNo, function(ajaxResult) {
				var time = ajaxResult.data;
				$('.time').text(time.day + " " + time.startTime + " ~ " + time.endTime);
			});
			
		});
	});
	
});

