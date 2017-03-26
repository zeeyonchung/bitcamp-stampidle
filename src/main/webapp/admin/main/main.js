$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		location.href = clientRoot + "/auth/login.html";
	}
	
	var cafeMember = ajaxResult.data;
	cafeMemberNo = cafeMember.cafeMemberNo;
	
	
	$.getJSON(serverRoot + '/customCard/getAllStampList.json',
			{
		      'cafeMemberNo':cafeMemberNo
			}, function(ajaxResult) {
				var status = ajaxResult.status;
				if(status != "success") {
					
					return;
				}
				var allStampList = ajaxResult.data;
				console.log(ajaxResult.data);
				
				$('#visit h2 .result-val').text(allStampList.visitMember);
				$('#new-coupone h2 .result-val').text(allStampList.finishCard);
				$('#give-stamp h2 .result-val').text(allStampList.stampMany);
				$('#new-member h2 .result-val').text(allStampList.newMember);
				$('#new-message h2 .result-val').text(allStampList.messageCount);
				$('#free-drink h2 .result-val').text(allStampList.freeItem);
				$('.cafeImgSlide img').attr('src', '../../upload/' + event.eventPhotoPath);
				$('.event-cont-div .span-contents').text(event.eventContents);
			});
	
})