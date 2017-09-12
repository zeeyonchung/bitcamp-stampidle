try {
  var eventNo = location.href.split('?')[1].split('=')[1];
} catch (error) {
	var eventNo = -1;
}


$.getJSON(serverRoot + '/event/detail.json?eventNo=' + eventNo, function(ajaxResult) {
  var status = ajaxResult.status;
  
  if (status != "success") {
	  alert(ajaxResult.data);
	  return;
  }
  
  var event = ajaxResult.data;
  
  $('.event-title').val(event.eventTitle);
  $('.event-contents').val(event.eventContents);
  $('.startDate').val(event.startDate);
  $('.endDate').val(event.endDate);
  console.log('src', '../upload/' + event.eventPhotoPath);
  $('#photo-img').attr('src', '../../upload/' + event.eventPhotoPath);
});



var now = new Date();
  var year= now.getFullYear();
  var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
  var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();
          
  var chan_val = year + '-' + mon + '-' + day;


$('.event-update-btn').click(function() {
    var param = {
		"eventNo": eventNo,
		"eventTitle": $('.event-title').val(),
		"eventContents": $('.event-contents').val(),
		"registDate": chan_val,
		"eventPhotoPath": $('#photo-path').val(),
		"eventView": 0,
		"startDate": $('.startDate').val(),
		"endDate": $('.endDate').val() 
    };
    console.log(param);
    
    $.post(serverRoot + '/event/update.json', param, function(ajaxResult) {
    	if (ajaxResult.status != "success") {
    		alert(ajaxResult.data);
    		return;
    	}
    	swal({
			title:"이벤트 수정이 완료되었습니다.",
			type:"success",
			closeOnConfirm: true
		},function(isConfirm) {
			location.href = 'main.html';}
		);
    }, 'json');
    
}); // click()


//파일 업로드

$('#photo').fileupload({
    url: serverRoot + '/../common/fileupload.json', // 서버에 요청할 URL
    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
    disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
    previewMaxWidth: 600,   // 미리보기 이미지 너비
    previewMaxHeight: 1000,  // 미리보기 이미지 높이 
    previewCrop: false,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
    done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    	console.log('done()...');
    	console.log(data.result);
        $('#photo-path').val(data.result.data[0]);
    }, 
    processalways: function(e, data) {
        console.log('fileuploadprocessalways()...', data.files.length, data.index);
        var img = $('#photo-img');
        if (data.index == 0) {
        	console.log('미리보기 처리...');
	        var canvas = data.files[0].preview;
	        var dataURL = canvas.toDataURL();
	        img.attr('src', dataURL);
	        $('#photo-label').css('display', '');
        }
    } 
});

