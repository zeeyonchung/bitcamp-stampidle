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
		    $("<div class='sl_li'><img src='../../upload/"+cafePhotos[i].path+"'></div>").appendTo(".cafeImgSlide");
		});
		
		$.each(cafeTime, function(i){
			$('<span>').text(cafeTime[i].day + " " + cafeTime[i].startTime + " " + cafeTime[i].endTime + " ").appendTo(".time");
		});
		
		$('.seat').text(cafe.chairNo);
		$('.tel').text(cafe.cafeTel);
		$('.addr').text(cafe.address + " " + cafe.detailAddress);
		console.log("2444");
		console.log(cardinfo.backImgPath.slice(0,7));
		if (cardinfo.backImgPath.slice(0,4) == "temp") {
			$('.cardArea img').attr('src', '../image/' + cardinfo.backImgPath);
		} else {
			$('.cardArea img').attr('src', '../../upload/' + cardinfo.backImgPath);
		}
		$('.stampNum .txt1 span').text(cardinfo.stampCount);
		$('.stampNum .txt2 span').text(cardinfo.service);
		
		$.each(menus, function(i){
			console.log(menus[i].path);
			$("<div class='menu'>" +
			"<p class='mnImg'><img src='../../upload/" + menus[i].menuPath
			 + "'></p><p class='mnName'>" + menus[i].menuName
			 + "</p><p class='mnPrice'>" + menus[i].price
			 + "</p></div>").appendTo(".menuSlide");
		});
			
	});
	});
	});
	});
	});
	});
	});
});

