/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		location.href = clientRoot + "/auth/login.html";
	}
	var customMember = ajaxResult.data;
	var customMemberNo = customMember.customMemberNo;
	
	
	
	
	/*게시글 몇 개씩 보여줄 건지 설정*/
	var postNo = 15;
	
	/* 검색어 */
	var searchKeyword = "";
	
	/*제일 먼저 보여지는 1페이지*/
	loadPage(1);
	
	
	
	
	function loadPage(pageCount) {
		// 나중에 파라미터로 나의 현재 위치도 넘겨야 함. 지금은 그냥 목록 다 꺼내오는 것.
		$.getJSON(
			serverRoot + '/customCard/findCafe.json',
			{customMemberNo: customMemberNo,
			searchKeyword: searchKeyword,
			postNo: postNo,
			pageCount: pageCount},
			
			function(ajaxResult) {
			  var status = ajaxResult.status;
			  if (status != "success") {console.log(ajaxResult.data); return;}
			  var cafeList = ajaxResult.data;
			  console.log(cafeList);
			  
			  if (cafeList == null) {
				  $('.cafeListArea #num').text(0);
			  } else {
				  $('.cafeListArea #num').text(cafeList.length);
			  }
			  
			  var listArea = $('.listArea');
			  var template = Handlebars.compile($('#trTemplate').html());
			  listArea.append(template({"cafeList": cafeList}));
			});
	};
	
	
	
	
});