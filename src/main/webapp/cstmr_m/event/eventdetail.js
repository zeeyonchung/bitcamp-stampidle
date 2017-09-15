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
  $('.cafe-name').text(event.cafeName);
  $('.title span').text(event.eventTitle);
  $('.eventdetail .table1 .tabletd2').text(event.registDate);
  $('.startdate-period').text(event.startDate);
  $('.enddate-period').text(event.endDate);
  $('.eventdetail .table3 .tabletd4').text(event.eventView);
  $('#eventImg').attr('src', "../../upload/" + event.eventPhotoPath);
  $('.event-cont-div .span-contents').text(event.eventContents);
  $('.goto .cafe-name').attr('data-no', event.cafeMemberNo);
  
  var start = new Date(event.startDate);
  var end = new Date(event.endDate);
  var nowDate = new Date(); 
  var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate();
  var today = new Date(date);
  if (today >= start && today <= end) {
	  $('.ongoing span').text("진행중");
	  $('.ongoing').removeClass('off');
	  $('.ongoing').addClass('on');
  } else if (today < start) {
	  $('.ongoing span').text("대기중");
	  $('.ongoing').removeClass('on');
	  $('.ongoing').addClass('off');
  } else if (today > end) {
	  $('.ongoing span').text("마감");
	  $('.ongoing').removeClass('on');
	  $('.ongoing').addClass('off');
  }
  
  $('.goto .cafe-name').click(function(event) {
		event.preventDefault();
		location.href = '../cafeinfo/cafeinfo.html?cafeMemberNo=' + $(this).attr("data-no");
  });
  
  $('.goto .list').click(function(event) {
		event.preventDefault();
		location.href = '../event/event.html';
  });
  
});



