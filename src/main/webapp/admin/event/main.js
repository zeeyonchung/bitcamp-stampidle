/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}
	
	var cafeMember = ajaxResult.data;
	var cafeMemberNo = cafeMember.cafeMemberNo;



	
	
	
	
/*제일 먼저 보여지는 1페이지*/
loadPage(1);





/****** 페이지 가져오기 ******/
function loadPage(pageCount) {
$.getJSON(serverRoot + '/event/main.json?cafeMemberNo=' + cafeMemberNo + "&pageCount=" + pageCount, function(ajaxResult) {
  var status = ajaxResult.status;
  if (status != "success")
	  return;
  var list = ajaxResult.data;

  var eventdiv = $('.eventdiv');
  var template = Handlebars.compile($('#trTemplate').html());
  eventdiv.html(template({"list": list}));
  
  $('.event-title').click(function(event) {
	event.preventDefault();
  	location.href = 'eventdetail.html?eventNo=' + $(this).attr("data-no");
  });
});

loadPagination(pageCount);


$(window).scrollTop($(window).height);
};




/****** 페이지 번호들 가져오기 ******/
function loadPagination(currentPage) {
$.getJSON(serverRoot + '/event/pagination.json?currentPage=' + currentPage, function(ajaxResult) {
  var status = ajaxResult.status;
  if (status != "success")
	  return;
  var list = ajaxResult.data;
  var pagination = $('.pagination');
  var template = Handlebars.compile($('#trTemplate2').html());
  pagination.html(template({"list": list}));
  
  $('.active').removeClass("active");
  activelink = currentPage % 5;
  if (activelink == 0) {activelink = 5;}
  $('.pagination li:nth-of-type(' + activelink + ') a').addClass("active");

  $('.z .pagination a').click(function(event) {
	  event.preventDefault();
	  var pageCount = $(this).text();
	  
	  loadPage(pageCount);
  });
});




};




/* prev, next 버튼 눌렀을 시*/
$('#prev').click(function() {
	var currentFirstPage = parseInt($('.z .pagination a:nth-of-type(1)').text().substr(0,1));
	console.log(currentFirstPage);
	if (currentFirstPage <= 1) {loadPage(1); return;}
	
	loadPage(currentFirstPage - 1);
	console.log("prev...");
});


$('#next').click(function() {
	var currentLastPage = parseInt($('.z .pagination a:nth-of-type(1)').text().substr(4,1));
	console.log(currentLastPage);
	loadPage(currentLastPage + 1);
	console.log("next...");
});




});
