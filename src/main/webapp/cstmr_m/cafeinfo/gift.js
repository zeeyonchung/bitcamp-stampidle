/*try {
  var cafeMemberNo = location.href.split('?')[1].split('=')[1];
} catch (error) {
	var cafeMemberNo = -1;
}*/

$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	var loginUser = ajaxResult.data;
	var cafeMemberNo = 11;
	
	if (loginUser.customMemberNo == null) {
		location.href = clientRoot + '/auth/login.html'
	}	
	
	$.getJSON(serverRoot + '/customMember/srchList.json?cafeMemberNo=' + cafeMemberNo, function(ajaxResult) {
        var status = ajaxResult.status;
        if (status != "success") {
        	return;
        }
        
        var availableTags = [];
        $.each( ajaxResult.data, function(index, value) {
        	if (value.customMemberNo != loginUser.customMemberNo) {
        		availableTags.push({"label": value.name + "  (" + value.tel + ")", "value":  value.customMemberNo}) 
        	}
        });
        
        $("#searchbox").autocomplete({
            source: availableTags,
            select: function( event, ui ) {
              return false;
            },
            focus: function(event, ui) {
                $("#searchbox").val(ui.item.label);
                return false;
            }
        });
    });
	
	$.getJSON(serverRoot + '/customCard/customDetail.json', 
			{'customMemberNo': loginUser.customMemberNo,
			'cafeMemberNo': cafeMemberNo},function(ajaxResult) {
		var customCard = ajaxResult.data;
	
	/*$.getJSON(serverRoot + '/customCard/customCardDetail.json', 
			{'customMemberNo': loginUser.customMemberNo,
			'cafeMemberNo': cafeMemberNo},function(ajaxResult) {
		var cardDetail = ajaxResult.data;*/
			
	$.getJSON(serverRoot + '/cafe/detail.json?cafeMemberNo=' + cafeMemberNo, function(ajaxResult) {
		var cafe = ajaxResult.data;
		
		$('.cafeNm').text(cafe.cafeName);
		//$('.stampNum p').text(cardDetail.currentStampCount + "개");
		if (customCard.finishCardCount != 0) {
			$('.freeNum p').text(customCard.finishCardCount + "개");
			$('.freeNum').css('display', 'block');
		} else {
			$('.noFree').css('display', 'block');
		}
		
		$('.send').click(function(e) {
			var usedFreeNum = parseInt($('.freeNum input').val());
			if ($('.srchBar').val() == "") {
				alert("선물하실 친구를 선택해주세요.");
				return $('.srchBar').focus();
			} 
			var customName = $('.srchBar').val().split("  ")[0];
			var customTel = $('.srchBar').val().split("  ")[1].slice(1,-1);
			
			if (usedFreeNum > parseInt($('.freeNum p').text())) {
				alert("사용 가능한 무료쿠폰 수를 초과하여 입력하셨습니다.");
				return;
			} else if ($('.freeNum input').val() == "") {
				alert("사용 할 스탬프/무료쿠폰 수를 입력해 주세요.");
				return $('.freeNum input').focus();
			} else if (usedFreeNum <= 0) {
				alert("값을 잘못 입력하셨습니다.");
				return;
			}
			
			$.getJSON(serverRoot + '/customCard/addGiftNewCustomCard.json', 
				{'name': customName,
				'tel': customTel,
				'cafeMemberNo': cafeMemberNo,
				'usedFreeNum' : usedFreeNum,
				'customMemberNo': loginUser.customMemberNo},
				function(ajaxResult) {}
			);
		
			alert("발송을 완료하였습니다.");
			location.href="";
			
		});
	});
	/*});*/
	});
});

