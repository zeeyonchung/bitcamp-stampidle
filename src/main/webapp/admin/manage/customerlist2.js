 $("#customer-select").click(function(){
	 var cafeListMeme
	 console.log()
	 $.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
			if (ajaxResult.status != "success") {
				console.log(ajaxResult.data);
				location.href = clientRoot + "/auth/login.html";
				/*로그인 안 했으면 로그인 페이지로 보내기*/
			}

			var cafeMember = ajaxResult.data;
			var cafeMemberNo = cafeMember.cafeMemberNo;
			

			
			console.log(serchListCondition);
			console.log(cafeMemberNo);
				
				
			
			
			
			

		});
});
/*로그인 정보를 가져와서*/

