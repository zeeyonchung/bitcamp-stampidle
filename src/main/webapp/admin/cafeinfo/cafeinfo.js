$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	var loginUser = ajaxResult.data;
	var cafeMembNo = loginUser.cafeMemberNo;
	if (loginUser == null) {
		location.href = clientRoot + '/auth/login.html'
	}
	$.getJSON(serverRoot + '/cafe/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var cafe = ajaxResult.data;
		
	$.getJSON(serverRoot + '/cafeTime/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var cafeTime = ajaxResult.data;
	
	$.getJSON(serverRoot + '/tag/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var tag = ajaxResult.data;
		
	$.getJSON(serverRoot + '/cafePhoto/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var cafePhotos = ajaxResult.data;
		
	$.getJSON(serverRoot + '/cardinfo/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
	var cardinfo = ajaxResult.data;
		
	$.getJSON(serverRoot + '/likes/count.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var likes = ajaxResult.data;
		
	$.getJSON(serverRoot + '/menu/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var menus = ajaxResult.data;
		
	$.getJSON(serverRoot + '/comment/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var comments = ajaxResult.data;

	
			$('.cafeLogo img').attr('src', '../../upload/' + cafe.logPath);
			$('.cafeName').text(cafe.cafeName);
			var tag_arr = tag.tagName.split(" ");
			for (var i in tag_arr) {
				$('<span>').appendTo('.tag').text("#" + tag_arr[i]);
			}
			$('.txt').text(cafe.intro);
			$('.like').text(likes.num);
			
			$.each(cafePhotos, function(i){
				console.log(cafePhotos[i].path);
			    $("<div class='sl_li'><img src='../../upload/"+cafePhotos[i].path+"' alt='cafe photo image'></div>").appendTo(".cafeImgSlide");
			});
			
			$.each(cafeTime, function(i){
				console.log(cafeTime[i].path);
				$('<span>').text(cafeTime[i].day + " " + cafeTime[i].startTime + " " + cafeTime[i].endTime + " ").appendTo(".time");
				
			});
			
			$('.seat').text(cafe.chairNo);
			$('.tel').text(cafe.cafeTel);
			$('.addr').text(cafe.address + " " + cafe.detailAddress);
			if (cardinfo.backImgPath.slice(0,4) == "temp") {
				$('.cardArea img').attr('src', '../image/' + cardinfo.backImgPath);
			} else {
				$('.cardArea img').attr('src', '../../upload/' + cardinfo.backImgPath);
			}
			$('.stampNum .txt1 span').text(cardinfo.stampCount);
			$('.stampNum .txt2 span').text(cardinfo.service);
			
			$.each(menus, function(i){
				$("<div class='menu'><p class='mnImg'><img src='../../upload/" + menus[i].menuPath
				+ "' alt='menu image'></p><p class='mnName'>" + menus[i].menuName
				+ "</p><p class='price'>" + menus[i].menuName
				+ "</p></div>").appendTo(".menuSlide");
			});
			
			$.each(comments, function(i){
				$("<li><div class='profileImg'><img src='" + membImg(i)
			    + "'></div><div class='comment_txt'><strong>" + check_nickNull(i)
				+ "</strong><p>" + comments[i].contents
				+ "</p></div><div class='etcInfo'><div class='date'>" + comments[i].uploadDate
				+ "</div><div class='star'><span class='" + starScoreCss(comments[i].star)
				+ "'></span></div></div></li>").appendTo(".comment_list ul");
			});
			$('.total span').text(commentsCount());
			$('.starScore .result span').text(averStarScore());
			$('.starScore .star span').addClass();
			
			function membImg(i) {
				if (comments[i].photoPath == null) {
					return clientRoot + '/image/comment_default.png';
				} else {
					return comments[i].photoPath;
				}
			}
			
			function check_nickNull(i) {
				if (comments[i].nick == null) {
			    	return "익명고객"
			    } else {
			    	return comments[i].nick;
			    }
			}
			
			function averStarScore() {
				var sum = 0;
				var aver = 0;
				$.each(comments, function(i){
					sum += comments[i].star;
				});
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
			alert("test");
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
	});
	});
	});
	});
	});
	});
	});
});

