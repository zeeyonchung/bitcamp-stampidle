/* var cafeMemberNo = getCookie('cafeMember.cafeMemberNo').replace(/"/g, ''); */

/* 첫 페이지 가져오기 */
$.getJSON(serverRoot + '/event/main.json?cafeMemberNo=' + 10 + "&pageCount=1", function(ajaxResult) {
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


/* 페이지 번호 클릭 시 페이지 가져오기 */
$('.z .pagination a').click(function(event) {
	event.preventDefault();
	
	var pageCount = $(this).text();
	
	$.getJSON(serverRoot + '/event/main.json?cafeMemberNo=' + 10 + "&pageCount=" + pageCount, function(ajaxResult) {
		console.log(pageCount);
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
	
	$('.active').removeClass("active");
	$(this).addClass("active");
	
	$(window).scrollTop($(window).height);
});


