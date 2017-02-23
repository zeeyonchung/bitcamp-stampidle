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


$.getJSON(serverRoot + 'event/detail.json?eventNo=' + eventNo, function(ajaxResult) {
  var status = ajaxResult.status;
  
  if (status != "success") {
	  alert(ajaxResult.data);
	  return;
  }
  
  var event = ajaxResult.data;
  
  $('.title').text(event.eventTitle);
  $('.table1 .tabletd2').text(event.registDate);
  $('.table2 .tabletd2').text(event.startDate + " ~ " + event.endDate);
  $('.table3 .tabletd4').text(event.eventView);
  $('#evnet-img').attr('src', '../../upload/' + event.eventPhotoPath);
  
});