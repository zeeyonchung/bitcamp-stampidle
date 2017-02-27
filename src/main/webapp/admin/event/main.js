/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}
	
	var cafeMember = ajaxResult.data;
	var cafeMemberNo = cafeMember.cafeMemberNo;



	
	
	
/*게시글 몇 개씩 보여줄 건지 설정*/
var postNo = 5;

/*제일 먼저 보여지는 1페이지*/
loadPage(1);






/****** 페이지 가져오기 ******/
function loadPage(pageCount) {
$.getJSON(
serverRoot + '/event/loadPage.json',
{'cafeMemberNo': cafeMemberNo,
 'pageCount': pageCount,
 'postNo': postNo}, 
function(ajaxResult) {
  var status = ajaxResult.status;
  if (status != "success")
	  return;
  var list = ajaxResult.data.list;

  var eventdiv = $('.eventdiv');
  var template = Handlebars.compile($('#trTemplate').html());
  eventdiv.html(template({"list": list}));
  
  $('.event-title').click(function(event) {
	event.preventDefault();
  	location.href = 'eventdetail.html?eventNo=' + $(this).attr("data-no");
  });
  
  var allEventNo = ajaxResult.data.allEventNo;
  loadPagination(pageCount, allEventNo);
});

$(window).scrollTop($(window).height);
};




/****** 페이지 번호들 가져오기 ******/
function loadPagination(currentPage, allEventNo) {
$.getJSON(
serverRoot + '/event/pagination.json',
{'cafeMemberNo': cafeMemberNo,
 'currentPage': currentPage,
 'postNo': postNo
},
function(ajaxResult) {
  var status = ajaxResult.status;
  if (status != "success")
	  return;
  var list = ajaxResult.data;
  var pagination = $('.pagination');
  var template = Handlebars.compile($('#trTemplate2').html());
  pagination.html(template({"list": list}));
  
  $('.active').removeClass("active");
  var activelink = currentPage % 5;
  if (activelink == 0) {activelink = 5;}
  $('.pagination li:nth-of-type(' + activelink + ') a').addClass("active");

  $('.z .pagination a').click(function(event) {
	  event.preventDefault();
	  var pageCount = $(this).text();
	  
	  loadPage(pageCount);
  });
  
  loadButton(allEventNo);
});


};






/* prev, next 버튼 눌렀을 시*/
function loadButton(allEventNo) {
	$('#prev').click(function() {
		var currentFirstPage = parseInt($('.z .pagination a:nth-of-type(1)').text().substr(0,1));
		if (currentFirstPage <= 1) {loadPage(1); return;}
		loadPage(currentFirstPage - 1);
	});
	
	$('#next').click(function() {
		var pagestr = $('.z .pagination a:nth-of-type(1)').text();
		var currentLastPage = parseInt(pagestr.charAt(pagestr.length - 1));
		if (allEventNo % postNo == 0) {
			var allPageNo = Math.floor(allEventNo / postNo);
		} else {
			var allPageNo = Math.floor(allEventNo / postNo) + 1;
		}
		
		if (currentLastPage >= allPageNo) {
			loadPage(currentLastPage);
		} else {
			loadPage(currentLastPage + 1);
		}
	});
};




});
