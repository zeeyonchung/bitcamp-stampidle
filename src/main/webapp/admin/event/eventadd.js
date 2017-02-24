var now = new Date();
      var year= now.getFullYear();
      var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
      var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
              
      var chan_val = year + '-' + mon + '-' + day;


출처: http://wfreud.tistory.com/21 [wfreud 개인 라이브러리]

$('.event-regi-btn').click(function() {
    var param = {
		"cafeNo": 10,
		"eventTitle": $('.event-title').val(),
		"eventContents": $('.event-contents').val(),
		"registDate": chan_val,
		"eventPhotoPath": '../image/cafe_event.jpg',
		"eventView": 0,
		"startDate": $('.startDate').val(),
		"endDate": $('.endDate').val() 
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






