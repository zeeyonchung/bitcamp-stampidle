$( function() {
	// header.html을 가져와서 붙인다.
	$.get('../header.html', function(result) {
	  // 서버에서 로그인 사용자 정보를 가져온다.
	  $.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
		$('#header').html(result);
		// 사이드바 고객 이름 출력
		var userData = ajaxResult.data;
		var userName = userData.name;
		var userNo1 = userData.customMemberNo;
		
		$('.cafeNm > span').append(userName);
		
		$.getJSON(serverRoot + '/customMember/getOne.json?customMemberNo=' + userNo1, function(ajaxResult) {
			var myData1 = ajaxResult.data;
			$('#photo-sdimg').attr("src", '../../upload/' + myData1.photoPath).css('width', '100%').css(
					'max-height', '100px').css('border-radius','100%');
		});
		
		// 로그아웃 버튼의 클릭 이벤트 핸들러 등록하기
		$('#logout-btn').click(function(event) {
			event.preventDefault()
			$.getJSON(serverRoot + '/auth/logout.json', function(ajaxResult) {
				location.href = '../auth/login.html'
			});
		});
	  });
	});
	
	// sidebar.html을 가져와서 붙인다.
	$.get('../sidebar.html', function(result) {
	  $('.sidebar').html(result);
	});
	
});



