/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		//console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		
	}
	var userData = ajaxResult.data;
	var userNo = userData.customMemberNo;
	
	/********************* section1 전체 카드 리스트 *************************/
	$.getJSON(serverRoot + '/customCard/getMyCardList.json?customMemberNo=' + userNo, function(ajaxResult) {
		var myCardList = ajaxResult.data;
		console.log(myCardList);
		
		if (myCardList == null) {
			$('.section.all #num').text(0);
		} else {
			$('.section.all #num').text(myCardList.length);
		}
		
		var infodiv = $('.infodiv');
		var template = Handlebars.compile($('#trTemplate1').html());
		infodiv.html(template({"myCardList": myCardList}));
	});
	
	
	
	/********************* section3 다 모은 카드 리스트 *************************/
	$.getJSON(serverRoot + '/customCard/getMyFinishCardList.json?customMemberNo=' + userNo, function(ajaxResult) {
		var myFinishCardList = ajaxResult.data;
		console.log(myFinishCardList);
		
		if (myFinishCardList == null) {
			$('.section.done #num').text(0);
		} else {
			$('.section.done #num').text(myFinishCardList.length);
		}
		
		var infodiv = $('.infodiv3');
		var template = Handlebars.compile($('#trTemplate3').html());
		infodiv.html(template({"myFinishCardList": myFinishCardList}));
	});
	
	
});
