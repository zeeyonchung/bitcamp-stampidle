/* var cafeMemberNo = getCookie('cafeMember.cafeMemberNo').replace(/"/g, ''); */


$.getJSON(serverRoot + '/event/main.json?cafeMemberNo=' + 10, function(ajaxResult) {
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


