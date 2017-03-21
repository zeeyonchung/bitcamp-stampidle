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


$.getJSON(serverRoot + '/event/detail.json?eventNo=' + eventNo, function(ajaxResult) {
  var status = ajaxResult.status;
  
  if (status != "success") {
	  alert(ajaxResult.data);
	  return;
  }
  
  var event = ajaxResult.data;
  $('.cafe-name1 span').text(event.cafeName);
  $('.title span').text(event.eventTitle);
  $('.eventdetail .table1 .tabletd2').text(event.registDate);
  $('.startdate-period').text(event.startDate);
  $('.enddate-period').text(event.endDate);
  $('.eventdetail .table3 .tabletd4').text(event.eventView);
  $('.cafeImgSlide img').attr('src', '../../upload/' + event.eventPhotoPath);
  $('.event-cont-div .span-contents').text(event.eventContents);
});



