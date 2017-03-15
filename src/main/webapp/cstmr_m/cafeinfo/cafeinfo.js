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
		var comments = (ajaxResult.data);
		var commentdiv = $('.comment_list ul');
		var commentTemplate = Handlebars.compile($('#commentTemplate').html());
		commentdiv.append(commentTemplate({"commentList":comments}));
		$('.result').text("평점 (" + averStarScore() +"/5.0)");
		$('.star span').attr('class',starScoreCss());
		function averStarScore() {
			var sum = 0;
			var aver = 0;
			if (comments.length != 0) {
				$.each(comments, function(i){
					sum += comments[i].star;
				});
			} else {
				return 0;
			}
			aver = sum/commentsCount();
			return aver;
		}
		
		function commentsCount() {
			var count = 0;
			$.each(comments, function(i){
				count++;
			});
			return count;
		}
		
		function starScoreCss(num) {
			switch(num) {
				case 5: return "star5";
				case 4: return "star4";
				case 3: return "star3";
				case 2: return "star2";
				case 1: return "star1";
				case 0: return "star0";
			}
		}
		
		function totalStarScoreCss(num) {
			if (4.7 < averStarScore() <= 5) {
				return "star5";
			} else if (4.2 < averStarScore() <= 4.7) {
				return "star4_5";
			} else if (3.7 < averStarScore() <= 4.2) {
				return "star4";
			} else if (3.2 < averStarScore() <= 3.7) {
				return "star3_5";
			} else if (2.7 < averStarScore() <= 3.2) {
				return "star3";
			} else if (2.2 < averStarScore() <= 2.7) {
				return "star2_5";
			} else if (1.7 < averStarScore() <= 2.2) {
				return "star2";
			} else if (1.2 < averStarScore() <= 1.7) {
				return "star1_5";
			} else if (0.7 < averStarScore() <= 1.2) {
				return "star1";
			} else if (0.2 < averStarScore() <= 0.7) {
				return "star0_5";
			} else {
				return "star0";
			}
		}
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



