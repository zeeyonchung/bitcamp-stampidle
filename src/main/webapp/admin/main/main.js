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
				
				$('#visit h2').text(allStampList.visitMember +"명");
				$('#new-coupone h2').text(allStampList.finishCard + "개");
				$('#give-stamp h2').text(allStampList.stampMany+ "개");
				$('#new-member h2').text(allStampList.newMember+ "명");
				$('#new-message h2').text( "0개");
				$('#free-drink h2').text(allStampList.freeItem+ "개");
				$('.cafeImgSlide img').attr('src', '../../upload/' + event.eventPhotoPath);
				$('.event-cont-div .span-contents').text(event.eventContents);
			});
})