var customMemberNo = 0;
var cafeMemberNo = 0;


try {
  customMemberNo = location.href.split('?')[1].split('=')[1];
} catch (error) {
  customMemberNo = -1;
}

/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}
	var cafeMember = ajaxResult.data;
	cafeMemberNo = cafeMember.cafeMemberNo;
	
	loadPage();
});



var currentStampCount = 0;


function loadPage(){
	/******************* 오른쪽 영역 ********************/
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
		currentStampCount = ajaxResult.data.currentStampCount;
		
		
		$('#card-back').attr('src', serverRoot + '/../upload/' + cardDetail.backImgPath); /* 하... 경로가.....ㅠㅠ */
		$('.current-stamp-count').text(currentStampCount);
	
		
		/**** 카드 뒷면 이미지 로드된 후 스탬프 영역, 찍힌 스탬프 가져오기 ****/
		$('#card-back').load(function(event) {
			event.stopImmediatePropagation()
			var width = $('#card-back').width();
			var height = $('#card-back').height();
			/** stmpside 넓이 조정 **/
			$('.stmpside').css('width', width);
			$('.stmpside').css('height', height);
	
			/** imgbox 높이 조정 **/
			$('#imgbox').css('height', height + 20);
			
			
			// positionOrder대로 재정렬
			cardDetail.stampPositionList.sort(function (a, b) { 
				return a.positionOrder > b.positionOrder;
			});
			
			
			/** 스탬프 영역 가져오기 **/
			
			//가져오기 전에 이전에 만들어진 영역 삭제
			$('.stmpare').remove();
			//사용할 개수 적는 인풋 박스도 초기화하고
			$('.usecp').val('');
			
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
			
			
			/** 찍힌 스탬프 가져오기 **/
			for (var i = 0; i < currentStampCount; i++) {
				$('<img>')
				.addClass('stamp-img')
				.appendTo('.stampNo' + i)
				.attr('src', serverRoot + '/../upload/' + cardDetail.stampImgPath)
				.css('width', 40)
			}
			
			
			
			
			/** 스탬프 영역 클릭 이벤트 **/
			$(document).on('click', '.stmpare', function(event) {
				event.stopImmediatePropagation();
				var stampNo = this.getAttribute('class').split(" ")[1].split("stampNo")[1];
				//console.log('this stampNo... : ', stampNo);
				//console.log('this.getAttribute("class").search("add-check"):', this.getAttribute('class').search('add-check'))
				//console.log(currentStampCount)
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
		});
		
		
		/**** 스탬프 등록 버튼 클릭 이벤트 (스탬프 추가) ****/
		$('.stamp-btn').click(function(event) {
			event.stopImmediatePropagation();
			var stampIssueCount = $('#stmpside').children('.add-check').length;
			//console.log('stampIssueCount: ', stampIssueCount);
			$.post(serverRoot + '/customCard/addStamp.json', 
					{'customMemberNo': customMemberNo,
					'cafeMemberNo': cafeMemberNo,
					'stampIssueCount' : stampIssueCount},
			function(ajaxResult) {
						swal({title:"도장이 발급되었습니다.",
						type:"success"});
				loadPage();
			});
		});
		
		
		/**** 리셋 버튼 클릭 이벤트 (새 카드 발행) ****/
		$('#reset-btn').click(function(event) {
			event.stopImmediatePropagation();
			if (currentStampCount != $('.stmpare').length) {
				swal({title:"도장을 다 모으지 않았습니다.",
					type:"warning"});
				return;
			}
			$.getJSON(serverRoot + '/customCard/addNewCustomCard.json', 
					{'customMemberNo': customMemberNo,
					'cafeMemberNo': cafeMemberNo},
				function(ajaxResult) {
						swal({title:"무료쿠폰이 추가되었습니다.",
							type:"success"});
					loadPage();
				}
			);
		});
		
	});
	
	
	
	
	/******************* 왼쪽 영역 ********************/
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
		
		$('#send-text').attr('data-no', customMemberNo);
		$('#name').text(customCard.customName);
		$('#email').text(customCard.customEmail);
		$('#phone-number').text(customCard.customTel);
		$('.finish-coupon').text(customCard.finishCardCount);
		$('.first-visit-date').text(customCard.firstVisitDate);
		$('.last-visit-date').text(customCard.lastVisitDate);
		$('.all-stamp').text(customCard.allStampCount);
		
		
		/**** 다 채운 카드 사용 버튼 클릭 이벤트 ****/
		$('#use-btn').click(function(event) {
			event.stopImmediatePropagation();
			
			//사용할 카드 개수
			var usedCardCount = parseInt($('.usecp').val());
			
			if (usedCardCount > parseInt($('.finish-coupon').text())) {
				swal({title:"사용 가능한 쿠폰 수를<br> 초과하여 입력하셨습니다.",
					type:"warning",
					html: true});
				return;
			} else if (usedCardCount <= 0 || usedCardCount == "") {
				swal({title:"사용 할 쿠폰 수를 입력해 주세요.",
					type:"warning",
					html: true});
				return;
			}
		
			
			$.getJSON(serverRoot + '/customCard/useCustomCard.json', 
					{'customMemberNo': customMemberNo,
					'cafeMemberNo': cafeMemberNo,
					'usedCardCount': usedCardCount
					},
				function(ajaxResult) {
						swal({title:"무료 쿠폰을 사용하였습니다.",
							type:"success"});
					loadPage();
				}
			);
		});
		
		
		
		/**** 메시지 버튼 ****/
		$('#send-text').click(function() {
			event.stopImmediatePropagation();
    		var no = $(this).attr('data-no')
    		
    		$('#myModal').modal({
    	        show: true,
    	        remote: '../message.html'
    		});
    		
    		$('#myModal').on('shown.bs.modal', function (e) {
    			$('body.message').css("overflow-y","hidden");
    			var popTop = $(window).height()/2 - $(".writeArea").outerHeight()/2 - 150;
    			$('.writeWrap').fadeIn(800);
    			$('.writeArea').fadeIn(600);
    			$('.writeArea').css("margin-top",popTop);
    			$('select[name=customerNo]').val(no);
			})
    		
		});
		
	});
}