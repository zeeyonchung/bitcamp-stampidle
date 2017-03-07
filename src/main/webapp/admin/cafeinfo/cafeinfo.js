$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	var loginUser = ajaxResult.data;
	var cafeMembNo = loginUser.cafeMemberNo;
	if (loginUser == null) {
		location.href = clientRoot + '/auth/login.html'
	}
	
	$.getJSON(serverRoot + '/cafe/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var cafe = ajaxResult.data;
		
	/*$.getJSON(serverRoot + '/cafeTime/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var cafeTime = ajaxResult.data;
	
	/*$.getJSON(serverRoot + '/tag/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var tag = ajaxResult.data;*/
		
	/*$.getJSON(serverRoot + '/cafePhoto/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var cafePhoto = ajaxResult.data;*/
		
	/*$.getJSON(serverRoot + '/menu/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {*/
			$('.cafeLogo img').attr('src', '../../upload/' + cafe.logPath);
			$('.cafeName').text(cafe.cafeName);
			/*$('.tag').text(tag.tagName);*/
			$('.txt').text(cafe.intro);
			//$('.like').text(like.num);
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
	/*});*/
	/*});*/
	/*});*/
	});
});
