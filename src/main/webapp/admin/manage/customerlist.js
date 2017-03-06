/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}

	var cafeMember = ajaxResult.data;
	var cafeMemberNo = cafeMember.cafeMemberNo;


	console.log(cafeMemberNo);
	
	
	
		$.getJSON(
			serverRoot + '/customCard/customList.json',
			{'cafeMemberNo': cafeMemberNo
			 }, 
			function(ajaxResult) {
			 if (ajaxResult.status != "success") {
				 console.log(ajaxResult.data);
				 return;
			 }
			  
			  var list = ajaxResult.data;
			  var tbody = $('#list-table > tbody');
			  console.log(ajaxResult.data);
			  // 템플릿 텍스트를 처리하여 HTML을 생성해 줄 함수 얻기
			  var template = Handlebars.compile($('#trTemplate').html());
			  
			  // 템플릿 엔진을 통해 생성된 HTML을 tbody에 넣는다.
			  tbody.html(template({"list": list}));
			  
			  // 학생 목록에서 이름 링크에 click 이벤트를 처리한다.
			});
		
	
	
	
	

});
