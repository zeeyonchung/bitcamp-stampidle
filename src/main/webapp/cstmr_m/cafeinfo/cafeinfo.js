$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}
	var userNo = ajaxResult.data.customMemberNo;
	var userName = ajaxResult.data.name;
	var cafeMembNo = 1

	// 1페이지 시작
	$.getJSON(serverRoot + '/cafe/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var cafe = ajaxResult.data;
		$('.cafe-name').text(cafe.cafeName);
		$('.cafe-info').text(cafe.intro);
		$('.cafe-addr').text(cafe.address +" "+ cafe.detailAddress);
		$('.cafe-tel').text(cafe.cafeTel);

		$.getJSON(serverRoot + '/customCard/customDetail.json', 
				{'customMemberNo': userNo,
			'cafeMemberNo': cafeMembNo},
			function(ajaxResult) {
				var stmpNo = ajaxResult.data.allStampCount;

				$.getJSON(serverRoot + '/cardadd/getCafeCardDetail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
					var cardInfo = ajaxResult.data;
					$.each(cardInfo, function(i) {
						$('.stmpcard').attr('src', '../'+cardInfo[i].backImgPath);
						$('.stmpcard2').attr('src', '../../upload/' +cardInfo[i].frontImgPath);
						var many = cardInfo[i].stampCount;
						$('.stmp-circle').text(stmpNo + "/" + many);
					});
				});
			});
	});
	// 1페이지 끝
	
	// 2페이지 시작
	$.getJSON(serverRoot + '/menu/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var menuInfo = (ajaxResult.data);
			var menudiv = $('.menuList');
			var template = Handlebars.compile($('#menuTemplate').html());
			menudiv.append(template({"list":menuInfo}));
	});
	
	// 2페이지 끝
	
	// 3페이지 시작
	// 총 코멘트 수
	$.getJSON(serverRoot + '/comment/count.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		$('.total>span').text(ajaxResult.data + "건");
	});
	// 코멘트 리스트 가져오기(핸들바스)
	$.getJSON(serverRoot + '/comment/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var comment = (ajaxResult.data);
		var commentdiv = $('.comment_list ul');
		var commentTemplate = Handlebars.compile($('#commentTemplate').html());
		commentdiv.append(commentTemplate({"commentList":comment}));
	});
	$('.comment_form input').attr('placeholder',userName);
	
	// 별점매기기
	$( ".star_rating a" ).click(function() {
	     $(this).parent().children("a").removeClass("on");
	     $(this).addClass("on").prevAll("a").addClass("on");
	     return false;
	});
	// 별점매기기 끝
	$('.submit').click(function(event) {
		var star = $('.star_rating > .on').length;
		event.preventDefault();
		var param = {
			customMemberNo: userNo,
			name: userName,
			cconts: $('.commentText').val(),
			star: star,
			cafeMemberNo : cafeMembNo
		};
		console.log(param);
		$.post(serverRoot + '/comment/add', param, function(ajaxResult) {
			if (ajaxResult.status != "success") {
				alert(ajaxResult.data);
				return;
			}
			alert('리뷰 등록이 완료되었습니다.');
		}, 'json'); 
	});
});



