/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		
	}

	var cafeMember = ajaxResult.data;
	var cafeMemberNo = cafeMember.cafeMemberNo;
//	다음단계 버튼
	$('#btn-next').click(function(event) {
		event.preventDefault();
		var param1 = {
				cafeMemberNo: cafeMemberNo,
				cafeName: $('#cafeName').val(),
				intro: $('#introcafe').val(),
				cafeTel: $('#cafeTel1').val() + "-" + $('.cafeTel2').val() + "-" + $('.cafeTel3').val(),
				address: $('.addr1').val() + "" + $('.addr2').val(),
				detailAddress: $('.daddr').val(),
				chairNo: parseInt($('#chairNo').val()),
				logPath: $('#photo-path').val()
		};
		console.log(param1);
		$.post(serverRoot + '/cafe/add.json', param1, function(ajaxResult) {
			if (ajaxResult.status != "success") {
				alert(ajaxResult.data);
				return;
			}
			alert('등록이 완료되었습니다.');
			$.getJSON(serverRoot + '/cafe/detail.json?cafeMemberNo=' + cafeMemberNo, function(ajaxResult) {
				var detailCafeMember = ajaxResult.data;
				var cafeNumber = detailCafeMember.cafeNo;
			});
		}, 'json');
		
	
		
		var days = $('select[id=day]')
		var daysNum = days.length;
		var start1 = $('select[id=startTime1]');
		var start2 = $('select[id=startTime2]');
		var end1 = $('select[id=endTime1]');
		var end2 = $('select[id=endTime2]');
		
		for (var i=0; i < daysNum; i++) {
			var param2 = {
		    cafeNo: cafeNumber,
		    day: days.eq(i).val(),
			startTime: start1.eq(i).val() + ":" + start2.eq(i).val(),
			endTime: end1.eq(i).val() + ":" + end2.eq(i).val()
			}
			console.log(param2);
			/*
			$.post(serverRoot + '/cafeTime/add.json', param2, function(ajaxResult) {
				if (ajaxResult.status != "success") {
					alert(ajaxResult.data);
					return;
				}
				alert('태그등록 완료되었습니다.');
			}, 'json');*/
		};
		
		
		
		var tags = [];
		var checked = $(".tag input[type='checkbox']:checked");
		for(var i=0; i<checked.length; i++){
			if (checked.eq(i).attr('id') != 'self')
				tags += checked.eq(i).val() + " ";
		};
		if($('.inperson').val() != null) {
			tags += $('.inperson').val()
		};
		
		var param3 = {
				cafeMemberNo: cafeMemberNo,
				tagName: tags
		}
		console.log(param3);
		
	}); // click()
});

//파일 업로드

$('#photo').fileupload({
    url: 'http://b.bitcamp.com:8080/bitcamp_stampidle/common/fileupload.json', // 서버에 요청할 URL
    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
    disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
    previewMaxWidth: 800,   // 미리보기 이미지 너비
    previewMaxHeight: 800,  // 미리보기 이미지 높이 
    previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
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
	        img.attr('src', dataURL).css('width', '100%');
	        img.attr('src', dataURL).css('height', '100%');
	        $('#photo-label').css('display', '');
        }
    } 
});
