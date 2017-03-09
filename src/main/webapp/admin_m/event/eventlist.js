/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/admin_m/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/admin_m/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}
	var cafeMember = ajaxResult.data;
	var cafeMemberNo = cafeMember.cafeMemberNo;



	
	
	
/*게시글 몇 개씩 보여줄 건지 설정*/
var postNo = 7;

/*제일 먼저 보여지는 1페이지*/
loadPage(1);

/* 무한 스크롤*/

/****** 페이지 가져오기 ******/
function loadPage(pageCount) {
$.getJSON(
serverRoot + '/admin_m/event/list.json',
{'cafeMemberNo': cafeMemberNo,
 'pageCount': pageCount,
 'postNo': postNo,
 }, 
function(ajaxResult) {
  var status = ajaxResult.status;
  if (status != "success") {console.log(ajaxResult.data); return;}
  var list = ajaxResult.data.list;

  var eventdiv = $('#container');
  var template = Handlebars.compile($('#trTemplate').html());
  eventdiv.html(template({"list": list}));
  
  $('.event-title').click(function(event) {
	event.preventDefault();
	$.getJSON(serverRoot + '/event/updateView.json?eventNo=' + $(this).attr("data-no"));
	
  	location.href = 'eventdetail.html?eventNo=' + $(this).attr("data-no");
  });
  
  
});
$(window).scrollTop($(window).height);
};

});



