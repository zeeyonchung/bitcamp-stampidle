/*try {
  var cafeMemberNo = location.href.split('?')[1].split('=')[1];
} catch (error) {
	var cafeMemberNo = -1;
}*/

$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	var loginUser = ajaxResult.data;
	var cafeMemberNo = 11;
	
	$.getJSON(serverRoot + '/customCard/customDetail.json', 
			{'customMemberNo': loginUser.customMemberNo,
			'cafeMemberNo': cafeMemberNo},function(ajaxResult) {
		var customCard = ajaxResult.data;
	
	$.getJSON(serverRoot + '/customCard/customCardDetail.json', 
			{'customMemberNo': loginUser.customMemberNo,
			'cafeMemberNo': cafeMemberNo},function(ajaxResult) {
		var cardDetail = ajaxResult.data;
			
	$.getJSON(serverRoot + '/cafe/detail.json?cafeMemberNo=' + cafeMemberNo, function(ajaxResult) {
		var cafe = ajaxResult.data;
		
		$('.cafeNm').text(cafe.cafeName);
		$('.stampNum p').text(cardDetail.currentStampCount + "개");
		$('.freeNum p').text(customCard.finishCardCount + "개");
		
		

		alert("t23t");
		$('.send').click(function(e) {
			var usedStampNum = parseInt($('.stampNum input').val());
			var usedFreeNum = parseInt($('.freeNum input').val());
			var customNm = $('.srchBar').val().split(" ")[1];
			console.log($('.srchBar').val().split("  ")[1]);
			
			if (customNm == null) {
				alert("선물하실 친구를 선택해주세요.");
				$('.srchBar').focus();
			} 
			if (usedStampNum > parseInt($('.freeNum p').text())) {
				alert("사용 가능한 스탬프 수를 초과하여 입력하셨습니다.");
				return;
			} else if (usedFreeNum > parseInt($('.freeNum p').text())) {
				alert("사용 가능한 무료쿠폰 수를 초과하여 입력하셨습니다.");
				return;
			} else if (usedStampNum == "" && usedFreeNum == "") {
				alert("사용 할 스탬프/무료쿠폰 수를 입력해 주세요.");
				return;
			} else if (usedStampNum <= 0 || usedFreeNum <= 0) {
				alert("값을 잘못 입력하셨습니다.");
				return;
			}
			
			/*if (usedFreeNum != "") {
				$.getJSON(serverRoot + '/customCard/useCustomCard.json', 
						{'customMemberNo': loginUser.customMemberNo,
						'cafeMemberNo': cafeMemberNo,
						'usedCardCount': usedFreeNum
						}, function(ajaxResult) {
					}
				);
			}
			
			if (usedFreeNum != "") {
				$.post(serverRoot + '/customCard/addStamp.json', 
						{'customMemberNo': loginUser.customMemberNo, //////
						'cafeMemberNo': cafeMemberNo,
						'stampIssueCount' : usedStampNum
						}, function(ajaxResult) {
				});
			}
			alert("발송을 완료하였습니다.")*/
			
			
		});
	});
	});
	});
});

