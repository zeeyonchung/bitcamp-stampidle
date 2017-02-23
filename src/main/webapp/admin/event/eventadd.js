

$('.event-regi-btn').click(function() {
    var param = {
		"eventTitle": $('.event-title').val(),
		"eventContents": $('.event-contents').val(),
		"registDate": $('#email').val(),
		"eventPhotoPath": '../image/cafe_event.jpg',
		"eventView": 0,
		"startDate": $('.startDate').val(),
		"endDate": $('.endDates').val(), 
    };
    console.log(param);
    
    $.post(serverRoot + '/student/update.json', param, function(ajaxResult) {
    	if (ajaxResult.status != "success") {
    		alert(ajaxResult.data);
    		return;
    	}
    	location.href = 'main.html';
    }, 'json');
    
}); // click()






