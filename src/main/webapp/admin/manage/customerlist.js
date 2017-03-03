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




	/*게시글 몇 개씩 보여줄 건지 설정*/
	var postNo = 15;
	
	/* 정렬 변수 */
	var searchCondition = "";
	
	/*제일 먼저 보여지는 1페이지*/
	loadPage(1);
	
	
	
	
	function loadPage(pageCount) {
ㄴ		
		$.getJSON(
			serverRoot + '/customCard/customList.json',
			{'cafeMemberNo': cafeMemberNo,
			 'pageCount': pageCount,
			 'postNo': postNo,
			 'searchCondition': searchCondition
			 }, 
			function(ajaxResult) {
			  var status = ajaxResult.status;
			  if (status != "success") {console.log(ajaxResult.data); return;}
			  var customCardList = ajaxResult.data.customCardList;
			  
			  /****** 글 목록 ******/
			  var tbody = $('.stamp-log-tbody');
			  var template = Handlebars.compile($('#trTemplate1').html());
			  tbody.html(template({"customCardList": customCardList}));
			  console.log(customCardList);
			  
			  $('.tr-link').click(function(event) {
				event.preventDefault();
			  	location.href = '../stampidle_cs/customerdetail.html?customMemberNo=' + $(this).attr("data-no");
			  });
			  
			  var allStampIssueNo = ajaxResult.data.allStampIssueNo;
			  console.log(allStampIssueNo + "개 있음....");
			  
			  
			  /****** 글 번호 ******/
			  var paginationList = ajaxResult.data.paginationList;
			  
			  var pagination = $('.pagination');
			  var template = Handlebars.compile($('#trTemplate2').html());
			  pagination.html(template({"paginationList": paginationList}));
			  
			  $('.active').removeClass("active");
			  var activelink = pageCount % 5;
			  if (activelink == 0) {activelink = 5;}
			  $('.pagination li:nth-of-type(' + activelink + ') a').addClass("active");
			
			  $('.z .pagination a').click(function(event) {
				  event.preventDefault();
				  var pageCount = $(this).text();
				  
				  loadPage(pageCount);
			  });
			  
			  loadButton(allStampIssueNo);
			 });
		
		$(window).scrollTop($(window).height);
	};
	
	
	
	/* prev, next 버튼 눌렀을 시*/
	function loadButton(allStampIssueNo) {
		$('#prev').click(function() {
			var currentFirstPage = parseInt($('.z .pagination a:nth-of-type(1)').text().substr(0,1));
			if (currentFirstPage <= 1) {loadPage(1); return;}
			loadPage(currentFirstPage - 1);
		});
		
		$('#next').click(function() {
			var pagestr = $('.z .pagination a:nth-of-type(1)').text();
			var currentLastPage = parseInt(pagestr.charAt(pagestr.length - 1));
			if (allStampIssueNo % postNo == 0) {
				var allPageNo = Math.floor(allStampIssueNo / postNo);
			} else {
				var allPageNo = Math.floor(allStampIssueNo / postNo) + 1;
			}
			
			if (currentLastPage <= allPageNo) {
				loadPage(currentLastPage);
			} else {
				loadPage(currentLastPage + 1);
			}
		});
	};
	
	

});
