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
  
  $('.eventdetail .title').text(event.eventTitle);
  $('.eventdetail .table1 .tabletd2').text(event.registDate);
  $('.eventdetail .table2 .tabletd2').text(event.startDate + " ~ " + event.endDate);
  $('.eventdetail .table3 .tabletd4').text(event.eventView);
  $('.eventdetail #evnet-img').attr('src', '../../upload/' + event.eventPhotoPath);
  $('.eventdetail .contents').text(event.eventContents);
});



$('#use-btn-delete').click(function() {
  $.getJSON('delete.json?eventNo=' + eventNo, function(ajaxResult) {
	  if (ajaxResult.status != "success") { 
		  alert(ajaxResult.data);
		  return;
	  }
	  swal({title:'삭제되었습니다', 
		    type:'success'}, 
		    function(isConfirm) {
		    	location.href = clientRoot + '/event/main.html';}
		);
	  
  });
});

$('#use-btn-edit').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/event/eventupdate.html?eventNo='+ eventNo
});
