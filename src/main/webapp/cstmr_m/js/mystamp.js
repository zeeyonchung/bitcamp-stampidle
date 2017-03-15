/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		//console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		
	}
	var userData = ajaxResult.data;
	var userNo = userData.customMemberNo;
	
	
	$.getJSON(serverRoot + '/customCard/getMyCardList.json?customMemberNo=' + userNo, function(ajaxResult) {
		var myCardList = ajaxResult.data;
		console.log(myCardList);
		
		if (myCardList == null) {
			$('#num').text(0);
		} else {
			$('#num').text(myCardList.length);
		}
		
		var infodiv = $('.infodiv');
		var template = Handlebars.compile($('#trTemplate').html());
		infodiv.html(template({"myCardList": myCardList}));
		
//		$('.tr-link').click(function(event) {
//			event.preventDefault();
//			location.href = '../stampidle_cs/customerdetail.html?customMemberNo=' + $(this).attr("data-no");
//		});
	});
});
