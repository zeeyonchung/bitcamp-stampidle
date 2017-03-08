$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	var loginUser = ajaxResult.data;
	var cafeMembNo = loginUser.cafeMemberNo;
	if (loginUser == null) {
		location.href = clientRoot + '/auth/login.html'
	}
	$.getJSON(serverRoot + '/cafe/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var cafe = ajaxResult.data;
		alert("6");
	/*$.getJSON(serverRoot + '/cafeTime/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var cafeTime = ajaxResult.data;*/
	
	$.getJSON(serverRoot + '/tag/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var tag = ajaxResult.data;
		
	/*$.getJSON(serverRoot + '/cafePhoto/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var cafePhoto = ajaxResult.data;*/
		
	$.getJSON(serverRoot + '/likes/count.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var likes = ajaxResult.data;
		
	/*$.getJSON(serverRoot + '/menu/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {*/
			$('.cafeLogo img').attr('src', '../../upload/' + cafe.logPath);
			$('.cafeName').text(cafe.cafeName);
			var tag_arr = tag.tagName.split(" ");
			for (var i in tag_arr) {
				console.log(tag_arr[i]);
				$('<span>').appendTo('.tag').text("#" + tag_arr[i]);
			}
			$('.txt').text(cafe.intro);
			$('.like').text(likes.num);
			//$('.cafeImgSlide div img').attr('src', '../upload/' + cafePhoto.path);
			$('.time').text(cafe.cafeName);
			$('.seat').text(cafe.chairNo);
			$('.tel').text(cafe.cafeTel);
			$('.tel').text(cafe.addr);
			//$('.menu .mnImg').attr('src', '../upload/' + menu.mepath);
			//$('.menu .mnName').text(cafe.menuName);
			//$('.menu .mnPrice').text(cafe.price);
			//$('.star').text(coments.cname);
		
		
	/*});*/
	});
	/*});*/
	});
	/*});*/
	});
});
