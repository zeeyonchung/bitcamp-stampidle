$( function() {
	// header.html을 가져와서 붙인다.
	$.get('../header.html', function(result) {
	  // 서버에서 로그인 사용자 정보를 가져온다.
	  $.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
		$('#header').html(result);
		// 사이드바 고객 이름 출력
		var userData = ajaxResult.data;
		var userName = userData.name;
		
		$('.cafeNm > span').append(userName);
		
		// 로그아웃 버튼의 클릭 이벤트 핸들러 등록하기
		$('#logout-btn').click(function(event) {
			event.preventDefault()
			$.getJSON(serverRoot + '/auth/logout.json', function(ajaxResult) {
				location.href = '../main/main.html'
			});
		});
	  });
	});
	
	// sidebar.html을 가져와서 붙인다.
	$.get('../sidebar.html', function(result) {
	  $('.sidebar').html(result);
	});
	
});



