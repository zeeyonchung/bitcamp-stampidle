$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}
	var userNo = ajaxResult.data.customMemberNo;
	var cafeMembNo = 1

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
						$('.stmpcard2').attr('src', '../'+cardInfo[i].frontImgPath);
						var many = cardInfo[i].stampCount;
						$('.stmp-circle').text(stmpNo + "/" + many);
					});
				});
			});
	});
});

