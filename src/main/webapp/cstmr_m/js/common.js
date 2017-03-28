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
		
		if (userNo1 != null) {
			$('.profileArea #logoff-div').css('display','none');
		}
		$('.cafeNm > span').append(userName);
		
		$.getJSON(serverRoot + '/customMember/getOne.json?customMemberNo=' + userNo1, function(ajaxResult) {
			var myData1 = ajaxResult.data;
			if (myData1.photoPath == null) {
				$('#photo-sdimg').hide();
			} else {
				$('#photo-sdimg').attr("src", '../../upload/' + myData1.photoPath);
			}
		});
		
		// 로그아웃 버튼의 클릭 이벤트 핸들러 등록하기
		$('#logout-btn').click(function(event) {
			event.preventDefault()
			$.getJSON(serverRoot + '/auth/logout.json', function(ajaxResult) {
				swal({
					  title: "스탬피들을 이용해주셔서<br> 감사합니다.",
					  closeOnConfirm: true,
					  imageUrl:"../../image/pabi.png",
					  html: true
					},
					function(isConfirm) {
						location.href = '../auth/login.html'
					});
				
			});
		});
	  });
	});
	
	// sidebar.html을 가져와서 붙인다.
	$.get('../sidebar.html', function(result) {
	  $('.sidebar').html(result);
	});
	
});



