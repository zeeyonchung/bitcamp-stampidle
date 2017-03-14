	var cafeMembNo = 1
	
	$.getJSON(serverRoot + '/cafe/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var cafe = ajaxResult.data;
		$('.cafe-name').text(cafe.cafeName);
		$('.cafe-info').text(cafe.intro);
		$('.cafe-addr').text(cafe.address +" "+ cafe.detailAddress);
		$('.cafe-tel').text(cafe.cafeTel);
		
		$.getJSON(serverRoot + '/cardadd/getCafeCardDetail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
			var cardInfo = ajaxResult.data;
			console.log(cardInfo);
			$.each(cardInfo, function(i) {
				$('.stmpcard').attr('src', '../'+cardInfo[i].backImgPath);
				$('.stmpcard2').attr('src', '../'+cardInfo[i].frontImgPath);
			});
		});
});

