/* var cafeMemberNo = getCookie('cafeMember.cafeMemberNo').replace(/"/g, ''); */


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

});