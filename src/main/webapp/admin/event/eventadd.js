

$('.event-regi-btn').click(function() {
    var param = {
		"cafeNo": 10,
		"eventTitle": $('.event-title').val(),
		"eventContents": $('.event-contents').val(),
		"registDate": '2012-12-12',
		"eventPhotoPath": '../image/cafe_event.jpg',
		"eventView": 0,
		"startDate": '2017-02-11',
		"endDate": '2017-02-11', 
    };
    console.log(param);
    
    $.post(serverRoot + '/event/add.json', param, function(ajaxResult) {
    	if (ajaxResult.status != "success") {
    		alert(ajaxResult.data);
    		return;
    	}
    	location.href = 'main.html';
    }, 'json');
    
}); // click()






