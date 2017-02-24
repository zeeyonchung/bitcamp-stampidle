
/* var cafeMemberNo = getCookie('cafeMember.cafeMemberNo').replace(/"/g, ''); */


$(function() {
	loadPage(1);
});






function loadPage(pageCount) {

$.getJSON(serverRoot + '/event/main.json?cafeMemberNo=' + 10 + "&pageCount=" + pageCount, function(ajaxResult) {
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
$('.active').removeClass("active");
$('.pagination li:nth-of-type(' + (pageCount % 5) + ') a').addClass("active");

$(window).scrollTop($(window).height);

};





function loadPagination(currentPage) {

$.getJSON(serverRoot + '/event/pagination.json?currentPage=' + currentPage, function(ajaxResult) {
  var status = ajaxResult.status;
  if (status != "success")
	  return;
  var list = ajaxResult.data;
  var pagination = $('.pagination');
  var template = Handlebars.compile($('#trTemplate2').html());
  pagination.html(template({"list": list}));

  $('.z .pagination a').click(function(event) {
	  event.preventDefault();
	  var pageCount = $(this).text();
	  
	  loadPage(pageCount);
	  console.log(pageCount);
  });
  
});

};




