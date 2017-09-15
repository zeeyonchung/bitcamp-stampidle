
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	window.cafeMembNo = ajaxResult.data.cafeMemberNo;
	if (cafeMembNo == null) {
		location.href = clientRoot + '/auth/login.html'
	}
	loadPage();
});


function loadPage() {
	$.getJSON(serverRoot + '/cafe/getAllInfo.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var cafe = ajaxResult.data.cafe;
		var cafeTime = ajaxResult.data.cafeTimeList;
		var tag = ajaxResult.data.tag;
		var cafePhotos = ajaxResult.data.cafePhotoList;
		var cardinfo = ajaxResult.data.stampCardInfo;
		var likes = ajaxResult.data.likeCount;
		var menus = ajaxResult.data.menuList;
		var comments = ajaxResult.data.commentList;
		
		$('.btn-showMap').click(function() {
	        $('.map').fadeIn(200);
	        $('.btn-hideMap').fadeIn(300);
	        showMap(cafe.address);
	    });
	    $('.btn-hideMap').click(function() {
	        $('.map').fadeOut(200);
	        $('.btn-hideMap').fadeOut(300);
	    });
		
		/*
		console.log('-------------------------')
		console.log('cafe');
		console.log(cafe);
		console.log('cafeTime');
		console.log(cafeTime);
		console.log('tag');
		console.log(tag);
		console.log('cafePhotos');
		console.log(cafePhotos);
		console.log('cardinfo');
		console.log(cardinfo);
		console.log('likes');
		console.log(likes);
		console.log('menus');
		console.log(menus);
		console.log('comments');
		console.log(comments);
		*/
		
		$('.cafeTxt .btn-edit').click(function(e) {
			e.preventDefault();
		    location.href = clientRoot + '/cafeinfoedit/cafeinfoedit.html?cafeMemberNo=' + cafeMembNo;
		});

		$('.cafeLogo img').attr('src', '../../upload/' + cafe.logPath);
		$('.cafeName').text(cafe.cafeName);
		var tag_arr = tag.tagName.trim().split(" ");
		for (var i in tag_arr) {
			$('<span>').appendTo('.tag').text("#" + tag_arr[i]);
		}
		$('.txt').text(cafe.intro);
		$('.like').text(likes);

		$.each(cafePhotos, function(i){
			$("<div class='sl_li'><img src='../../upload/"+cafePhotos[i].path+"' alt='cafe photo image'></div>").appendTo(".cafeImgSlide");
		});

		$.each(cafeTime, function(i){
			$('<span>').text(cafeTime[i].day + " " + cafeTime[i].startTime + "~" + cafeTime[i].endTime + " ").appendTo(".time");

		});
		
		$('.seat').text(cafe.chairNo);
		$('.tel').text(cafe.cafeTel);
		$('.addr').text(cafe.address);// + " " + cafe.detailAddress);
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
					+ "</p><p class='price'>￦" + menus[i].price
					+ "</p></div>").appendTo(".menuSlide");
		});
		
		loadStarsAndComments(comments);
	});
}



function loadStarsAndComments(comments) {
	var totalStar = 0;
	
	$.each(comments, function(i){
		totalStar += comments[i].star;
		
		$("<li><div class='profileImg'><img src='../../upload/" + membImg(i)
				+ "'></div><div class='comment_txt'><strong>" + check_nickNull(i)
				+ "</strong><p>" + comments[i].contents
				+ "</p></div><div class='etcInfo'><div class='date'>" + comments[i].uploadDate
				+ "</div><div class='star'><span class='" + starScoreCss(comments[i].star)
				+ "'></span></div></div></li>").appendTo(".comment_list ul");
	});
	
	totalStarAverage = totalStar / comments.length;
	$('<span class="' + totalStarScoreCss(totalStarAverage) + '">').appendTo(".starScore .star");
	
	$('.total span').text(commentsCount());
	$('.starScore .result span').text(averStarScore());
	$('.starScore .star span').addClass();

	function membImg(i) {
		if (comments[i].photoPath == null) {
			return '../image/profile_default.png';
		} else {
			console.log(comments[i].photoPath);
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
		if (comments.length != 0) {
			$.each(comments, function(i){
				sum += comments[i].star;
			});
		} else {
			return 0;
		}
		aver = sum/commentsCount();
		return aver.toFixed(2);
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
		if (4.7 < num && num <= 5) {
			return "star5";
		} else if (4.2 < num && num <= 4.7) {
			return "star4_5";
		} else if (3.7 < num && num <= 4.2) {
			return "star4";
		} else if (3.2 < num && num  <= 3.7) {
			return "star3_5";
		} else if (2.7 < num && num  <= 3.2) {
			return "star3";
		} else if (2.2 < num && num  <= 2.7) {
			return "star2_5";
		} else if (1.7 < num && num  <= 2.2) {
			return "star2";
		} else if (1.2 < num && num  <= 1.7) {
			return "star1_5";
		} else if (0.7 < num && num  <= 1.2) {
			return "star1";
		} else if (0.2 < num && num  <= 0.7) {
			return "star0_5";
		} else {
			return "star0";
		}
	}
	
}



function showMap(addr) {
	var map;
	var marker;
	var infowindow;
	var loginMember;
	var filename;
	var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var labelIndex = 0;
	var lat2;
	var lng2;
	var currentLatLng
	var address = addr.split(" ").join("+");

	$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyDvKW1N-3l0zQzXfPjDh2MlauKigyMH9Eg', function(ajaxResult) {
		console.log(ajaxResult);

		lat2 = parseFloat(ajaxResult.results[0].geometry.location.lat);
		lng2 = parseFloat(ajaxResult.results[0].geometry.location.lng);
		currentLatLng = {lat: lat2, lng: lng2};
		initMap();
	})

	var initMap = function() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: currentLatLng,
			zoom: 17
		});
		marker = new google.maps.Marker({
			position: currentLatLng,
			map: map,
			title: 'Hello World!',
			label: labels[labelIndex++ % labels.length]
		});
	}
};


