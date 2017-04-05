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
				
				$('.visit span').text(allStampList.visitMember);
				$('.new-card span').text(allStampList.finishCard);
				$('.new-stmp span').text(allStampList.stampMany);
				$('.new-memb span').text(allStampList.newMember);
				$('.get-message span').text(allStampList.messageCount);
				$('.service-drink span').text(allStampList.freeItem);
			});
	
})





