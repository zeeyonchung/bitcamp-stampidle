try {
  var customMemberNo = location.href.split('?')[1].split('=')[1];
} catch (error) {
	var customMemberNo = -1;
}


var cafeMemberNo = 0;

/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}
	var cafeMember = ajaxResult.data;
	cafeMemberNo = cafeMember.cafeMemberNo;
	
	
	/** stmpside 넓이 조정 **/
	var width = $('#card-back').css('width');
	var height = $('#card-back').css('height');
	$('.stmpside').css('width', width);
	$('.stmpside').css('height', height);
	
	

	$.getJSON(serverRoot + '/customCard/customCardDetail.json', 
			{'customMemberNo': customMemberNo,
			'cafeMemberNo': cafeMemberNo},
		function(ajaxResult) {
		var status = ajaxResult.status;
		
		if (status != "success") {
			alert(ajaxResult.data);
			return;
		}
		
		var cardDetail = ajaxResult.data.cardDetail;
		var currentStampCount = ajaxResult.data.currentStampCount;
		
		
		console.log(cardDetail);
		console.log(cardDetail.backImgPath);
		
		$('#card-back').attr('src', serverRoot + '/../upload/' + cardDetail.backImgPath);
		/* 하... 경로가.....ㅠㅠ */
		$('.current-stamp-count').text(currentStampCount);
		
		
		// positionOrder대로 재정렬
		cardDetail.stampPositionList.sort(function (a, b) { 
			return a.positionOrder > b.positionOrder;
		});
		
		
		for (var i = 0; i < cardDetail.stampPositionList.length; i++) {
			var positionOrder = cardDetail.stampPositionList[i].positionOrder;
			var positionX = parseFloat(cardDetail.stampPositionList[i].positionX) * $('.stmpside').css('width').split("px")[0];
			var positionY = parseFloat(cardDetail.stampPositionList[i].positionY) * $('.stmpside').css('height').split("px")[0];
			
			$('<div>')
		    .addClass('stmpare')
		    .addClass('stampNo' + (positionOrder - 1))
		    .appendTo("#stmpside")
		    .text(positionOrder)
		    .css({top: positionY, left: positionX})
		    .addTouch();
		}
		
		
		for (var i = 0; i < currentStampCount; i++) {
			$('<img>')
		    .addClass('stamp-img')
		    .appendTo('.stampNo' + i)
		    .attr('src', serverRoot + '/../upload/' + cardDetail.stampImgPath)
		    .css('width', 40)
		}
		
		

		$(document.body).on('click', '.stmpare', function(event) {
			var stampNo = this.getAttribute('class').split(" ")[1].split("stampNo")[1];
			if (stampNo > currentStampCount - 1 && this.getAttribute('class').search('add-check') == -1) {
				
				$('<img>')
				.addClass('stamp-img')
				.appendTo('.stampNo' + stampNo)
				.attr('src', serverRoot + '/../upload/' + cardDetail.stampImgPath)
				.css('width', 40);
				
				$(this).addClass('add-check');
				
			} else if (stampNo > currentStampCount - 1 && this.getAttribute('class').search('add-check') != -1) {
				
				$('.stampNo' + stampNo).children('img').remove();
				$(this).removeClass('add-check');
			}
		});
		
		
		
		
		$('.stamp-btn').click(function(e) {
			var stampIssueCount = $('#stmpside').children('.add-check').length;
			$.post(serverRoot + '/customCard/addStamp.json', 
					{'customMemberNo': customMemberNo,
					'cafeMemberNo': cafeMemberNo,
					'stampIssueCount' : stampIssueCount},
			function(ajaxResult) {
				location.href="";
			});
		});
			
		
		
		
		$('#reset-btn').click(function(e) {
			if ($('#stmpside').children('.add-check').length + currentStampCount != $('.stmpare').length) {
				console.log('아직 리셋 안 됨...');
				return;
			}
			
			$.getJSON(serverRoot + '/customCard/addNewCustomCard.json', 
					{'customMemberNo': customMemberNo,
					'cafeMemberNo': cafeMemberNo},
				function(ajaxResult) {
					location.href="";
				}
			);
		});
		
	});
	




	$.getJSON(serverRoot + '/customCard/customDetail.json', 
			{'customMemberNo': customMemberNo,
			'cafeMemberNo': cafeMemberNo},
		function(ajaxResult) {
		
		var status = ajaxResult.status;
		
		if (status != "success") {
			alert(ajaxResult.data);
			return;
		}
		
		var customCard = ajaxResult.data;
		console.log(customCard);
		
		if (customCard.customPhoto == null) {
			$('#custom-photo').attr('src', '../image/stmp4.png');
		} else {
			$('#custom-photo').attr('src', '../../upload/' + customCard.customPhoto);
		}
		$('#name').text(customCard.customName);
		$('#phone-number').text(customCard.customTel);
		$('.finish-coupon').text(customCard.finishCardCount);
		$('.first-visit-date').text(customCard.firstVisitDate);
		$('.last-visit-date').text(customCard.lastVisitDate);
		$('.all-stamp').text(customCard.allStampCount);
		
		
		
		
		
		$('#use-btn').click(function(e) {
			//사용할 카드 개수
			var usedCardCount = parseInt($('.usecp').val());
			
			if (usedCardCount > parseInt($('.finish-coupon').text())) {
				alert("사용 가능한 쿠폰 수를 초과하여 입력하셨습니다.");
				return;
			} else if (usedCardCount <= 0 || usedCardCount == "") {
				alert("사용 할 쿠폰 수를 입력해 주세요.");
				return;
			}
			
			
			$.getJSON(serverRoot + '/customCard/useCustomCard.json', 
					{'customMemberNo': customMemberNo,
					'cafeMemberNo': cafeMemberNo,
					'usedCardCount': usedCardCount
					},
				function(ajaxResult) {
					location.href="";
				}
			);
		});
		
	});
	
	
	
	
});

