var cafeMemberNo = null;
var currPageNo = 1;
var pageSize = 5;

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

	getList(cafeMemberNo, currPageNo, pageSize);

});

$('#prevPgBtn').click(function() {
	if (currPageNo > 1) {
		console.log(cafeMemberNo);
		getList(cafeMemberNo, --currPageNo, 5);
	}
});

$('#nextPgBtn').click(function() {
	console.log(cafeMemberNo);
	getList(cafeMemberNo, ++currPageNo, 5);
});

function preparePagingButton(totalCount) {
	if (currPageNo <= 1) {
		$('#prevPgBtn').attr('disabled', true);
	} else {
		$('#prevPgBtn').attr('disabled', false);
	}
	
	var maxPageNo = parseInt(totalCount / pageSize);
	if((totalCount % pageSize) > 0) {
		maxPageNo++;
	}
	
	if (currPageNo >= maxPageNo) {
		$('#nextPgBtn').attr('disabled', true);
	} else {
		$('#nextPgBtn').attr('disabled', false);
	}
	
	$('#pageNo').text(currPageNo);
}


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
	getListSelect(cafeMemberNo,selectCafeList, pageNo, pageSize);
	
});



function getList(cafeMemberNo, pageNo, pageSize) {
	$.getJSON(
		serverRoot + '/customCard/customList.json',
		{
			'cafeMemberNo': cafeMemberNo,
			'pageNo': pageNo,
			'pageSize': pageSize
		}, 
		function(ajaxResult) {
		 if (ajaxResult.status != "success") {
			 return;
		 }
		  
		  var list = ajaxResult.data.list;
		  var tbody = $('#list-table > tbody');
		  // 템플릿 텍스트를 처리하여 HTML을 생성해 줄 함수 얻기
		  var template = Handlebars.compile($('#trTemplate').html());
		  
		  // 템플릿 엔진을 통해 생성된 HTML을 tbody에 넣는다.
		  tbody.html(template({"list": list}));
		  
		  $('.tr-link').click(function(event) {
		  	event.preventDefault();
		  	location.href = '../stampidle_cs/customerdetail.html?customMember=' + $(this).attr("data-no");
		  });
		  
		  preparePagingButton(ajaxResult.data.totalCount);
		  console.log(ajaxResult.data.list);
	});
}


function getListSelect(cafeMemberNo,selectCafeList, pageNo, pageSize) {
	$.getJSON(
		serverRoot + '/customCard/customListSelect.json',
		{
			'cafeMemberNo': cafeMemberNo,
			'selectCafeList': selectCafeList,
			"pageNo": pageNo,
			"pageSize": pageSize
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

