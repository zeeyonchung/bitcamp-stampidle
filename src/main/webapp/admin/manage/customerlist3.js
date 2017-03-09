var cafeMemberNo = null;
/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}

	var cafeMember = ajaxResult.data;
	cafeMemberNo = cafeMember.cafeMemberNo;
	var selectCafeList = null;

	console.log(cafeMemberNo);
	getList(cafeMemberNo);
	
	
	

	
	

});



/* 검색조건 */
$(".dropdown .dropdown-menu .dropdown-item ").click(function(){
	$(".dropdown button").text($(this).text());
	if ($(this).text() == "등록순") {
		selectCafeList = "mcard.birth"
	} else if ($(this).text() == "가나다순") {
		selectCafeList = "memb.name"
	} else if ($(this).text() == "최근방문순") {
		selectCafeList = "memb.tel"
	}
	console.log(cafeMemberNo);
	console.log(selectCafeList);
	getListSelect(cafeMemberNo,selectCafeList);
	
});



function getList(cafeMemberNo) {
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
}


function getListSelect(cafeMemberNo,selectCafeList) {
	$.getJSON(
		serverRoot + '/customCard/customListSelect.json',
		{'cafeMemberNo': cafeMemberNo,
		 'selectCafeList': selectCafeList
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
}

