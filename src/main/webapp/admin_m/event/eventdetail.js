try {
  var eventNo = location.href.split('?')[1].split('=')[1];
  
} catch (error) {
	var eventNo = -1;
}

/*
if (eventNo > 0) {
	prepareViewForm();
} else {
	prepareNewForm();
}
*/


$.getJSON(serverRoot + '/admin_m/event/detail.json?eventNo=' + eventNo, function(ajaxResult) {
	console.log(eventNo);
  var status = ajaxResult.status;
  
  if (status != "success") {
	  alert(ajaxResult.data);
	  return;
  }
  
  var event = ajaxResult.data;
  
  $('.title span').text(event.eventTitle);
  $('.eventdetail .table1 .tabletd2').text(event.registDate);
  $('.span-period1').text(event.startDate + " ~ " + event.endDate);
  $('.eventdetail .table3 .tabletd4').text(event.eventView);
  $('.event-img').attr('src', '../../upload/' + event.eventPhotoPath);
  $('.event-cont-div .div-contents').text(event.eventContents);
});



$('#use-btn-delete').click(function() {
  $.getJSON(serverRoot + '/admin_m/event/delete.json?eventNo=' + eventNo, function(ajaxResult) {
	  if (ajaxResult.status != "success") { 
		  alert(ajaxResult.data);
		  return;
	  }
	  location.href = clientRoot + '/admin_m/event/eventlist.html';
  });
});

$('#use-btn-edit').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/admin_m/event/eventupdate.html?eventNo='+ eventNo
});
