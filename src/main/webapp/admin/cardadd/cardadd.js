/*로그인 정보를 가져와서*/
var cafeMemberNo = "";
var stampNo = 0;

$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}
	cafeMemberNo = ajaxResult.data.cafeMemberNo;
	
	getPreData();
	updateStmpsideSize();
});
	
	

/*******************이전에 저장된 데이터 가져오기********************/
function getPreData() {
	$.getJSON(serverRoot + '/cardadd/getCafeCardDetail.json', {cafeMemberNo: cafeMemberNo}, function(ajaxResult) {
		if (ajaxResult.data.length > 0) {
			var stampCardInfo = ajaxResult.data[0];
			console.log(stampCardInfo);
			
			$('#front-photo-img').attr('src', '../../upload/' + stampCardInfo.frontImgPath);
			$('#front-photo-path').val(stampCardInfo.frontImgPath);
			
			$('#back-photo-img').attr('src', '../../upload/' + stampCardInfo.backImgPath);
			$('#back-photo-path').val(stampCardInfo.backImgPath);
			
			$('#photo-img').attr('src', '../../upload/' + stampCardInfo.stampImgPath);
			$('#photo-path').val(stampCardInfo.stampImgPath);
			
			$('img.backcard').load(function() {
				updateStmpsideSize();
				updateMidtopSize();
				updateBtmlineSize();
				updateFrontimgdivSize();
			});
			
			/**** 이전에 저장된 스탬프 영역 가져오기 ****/
			// positionOrder대로 재정렬
			stampCardInfo.stampPositionList.sort(function (a, b) { 
				return a.positionOrder > b.positionOrder;
			});
			
			
			/** 스탬프 영역 가져오기 **/
			for (var i = 0; i < stampCardInfo.stampPositionList.length; i++) {
				var positionOrder = stampCardInfo.stampPositionList[i].positionOrder;
				var positionX = parseFloat(stampCardInfo.stampPositionList[i].positionX) * $('.stmpside').css('width').split("px")[0];
				var positionY = parseFloat(stampCardInfo.stampPositionList[i].positionY) * $('.stmpside').css('height').split("px")[0];
				
				$('<div>')
				.addClass('stmpare')
				.addClass('stampNo' + (positionOrder - 1))
				.appendTo("#stmpside")
				.text(positionOrder)
				.draggable({containment : 'parent'})
				.css({top: positionY, left: positionX})
				.addTouch();
			}
			
			stampNo = stampCardInfo.stampPositionList.length;
			$('.midNum').text(stampNo);

			addStampPosition();
			save();
			
		} else {
			console.log("카드 등록은 처음입니다..")
			$('#front-photo-img').attr('src', '../image/xbox.png');
			$('#front-photo-path').val('../image/xbox.png');
			
			$('#back-photo-img').attr('src', '../image/template1.jpg');
			$('#back-photo-path').val('../image/template1.jpg');
			
			$('#photo-img').attr('src', '../image/stmp4.png');
			$('#photo-path').val('../image/stmp4.png');
			
			$('img.backcard').load(function() {
				updateStmpsideSize();
				updateMidtopSize();
				updateBtmlineSize();
				updateFrontimgdivSize();
			});
			
			addStampPosition();
			save();
		}
			
	});
}




/** stmpside 넓이 조정 **/
function updateStmpsideSize() {
	var width = $('.backcard').css('width');
	var height = $('.backcard').css('height');
	$('.stmpside').css('width', width);
	$('.stmpside').css('height', height);
};
/** mid-top 높이 조정 **/
function updateMidtopSize() {
	var height = $('.backcard').css('height');
	$('.mid-top').css('height', height);
	console.log(height);
}
/** btmLine 높이 조정 **/
function updateBtmlineSize() {
	var height = parseInt($('.backcard').css('height').split("px")[0]) + 280;
	$('.btmLine').css('height', height);
}
/** front-img-div 높이 조정 **/
function updateFrontimgdivSize() {
	var height = parseInt($('.frontcard').css('height').split("px")[0]) + 10;
	$('.front-img-div').css('height', height);
}






/*******************스탬프 영역 추가하기*********************/
function addStampPosition() {
	$(document.body).on('click', '.pbtn', function(event) {
	  if (stampNo + 1 > 20) {$('.cd_alert2').css('display', 'inline-block'); return;}
	  $('<div>')
	    .addClass('new-stmpare')
	    .addClass('stampNo' + stampNo)
	    .appendTo("#stmpside")
	    .draggable({containment : 'parent'})
	    .text(stampNo+1)
	    .addTouch();
	
	  
	
	  stampNo++;
	  $('.midNum').text(stampNo);
	});
	
	$(document.body).on('click', '.mbtn', function(event) {
		if (stampNo - 1 < 0) {$('.cd_alert1').css('display', 'inline-block'); return;}
		stampNo--;
		$('.stampNo' + stampNo).remove();
		$('.midNum').text(stampNo);
	});
}











/*********************** 저장 *************************/
function save() {
	
	var stampCafeCardNo = 0;
	
	
	$('.btmsubmit').click (function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		
		var stampPositionList = [];
		
		//실패 : 도장영역안만들었음
		if (stampNo < 1) {
			swal({
				title: "도장 영역을 안 만들셨습니다.",
				text: "플러스 버튼을 눌러 도장 영역을 한 개 이상 지정해주세요.",
				type: "warning",
				confirmButtonColor: "#DD6B55",
				closeOnConfirm: true
			});
			return;
		}
		
		//실패 : 서비스내용안씀
		if ($('.service').val().trim() == "") {
			swal({
				title: "서비스 내용을 입력해 주세요.",
				type: "warning",
				confirmButtonColor: "#DD6B55",
				closeOnConfirm: true
			});
			return;
		}
		
		
		for(i=0; i < stampNo; i++) {
			var p = $('.stampNo' + i);
			var positionX = p.position().left / $('.stmpside').css('width').split('px')[0];
			var positionY = p.position().top / $('.stmpside').css('height').split('px')[0];
			var paramPosition = {
					"stampCafeCardNo": stampCafeCardNo,
					"positionX": positionX,
					"positionY": positionY,
					"positionOrder": $('.stampNo' + i).text()
			};
			
			stampPositionList.push(paramPosition);
		}
	
		var paramCard = {
				"cafeMemberNo": cafeMemberNo,
				"stampCount": $('.midNum').text(),
				"frontImgPath": $('#front-photo-path').val(),
				"backImgPath": $('#back-photo-path').val(),
				"stampImgPath": $('#photo-path').val(),
				"service": $('.service').val(),
				"stampPositionList": stampPositionList
		};
		
		console.log(paramCard);
		
		$.ajaxSettings.traditional = true;
		
		$.ajax({
			  type: 'POST',
			  url: serverRoot + '/cardadd/add.json',
			  data: JSON.stringify(paramCard),
			  dataType: "json",
			  accepts: 'application/json',
			  contentType: "application/json; charset=UTF-8",
			  error: function(e) {
				  console.log(e);
			  },
			  success: function(msg) {
				  swal({
					  title:"카드 등록이 완료되었습니다.",
					  closeOnConfirm: true,
					  type: "success"},
					  function(isConfirm) {
					  	location.href = clientRoot + "/cafeinfo/cafeinfo.html";
					  });
			  }
			});
		
	});
}






/* 경고창 */
$('.close_alert1').click(function() {
	//$('.alert').css("display","none");
	$('.cd_alert1').fadeOut(100);
});
$('.close_alert2').click(function() {
	//$('.alert').css("display","none");
	$('.cd_alert2').fadeOut(100);
});




/* 탬플릿 슬라이드 관련 script */
var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
	showSlides(slideIndex += n);
}
function currentSlide(n) {
	showSlides(slideIndex = n);
}
function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");
	if (n > slides.length) {
		slideIndex = 1
	}
	if (n < 1) {
		slideIndex = slides.length
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";
}




/* 탬플릿 이용버튼 클릭시 팝업관련 script */
/* pulldownPop */
	$('#btn-pop').click(function(){
		$('.tempPop').fadeIn(200);
	});
	$('.btn_top').click(function(){
		$('.tempPop').fadeOut(200);
	});

	$('.stmp_are .button').click(function(){
		$('.tempPop').fadeOut(200);
		var cardPath = $('.mySlides[style*="display: block"] img').attr('src');
		$('#back-photo-img').attr("src",cardPath);
		$('#back-photo-path').val($(".mid-top").children(".backcard").attr("src"));
		
		var stmpPath = $(':checked + img').attr('src');
		$('.selectimg').attr("src",stmpPath);
		$('#photo-path').val($('.selectimg').attr("src"));
	});



/************ 스탬프 이미지 저장 **************/
$('#fileupload').fileupload({
    url: serverRoot + '/../common/fileupload.json', // 서버에 요청할 URL
    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
    disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
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
	        img.attr('src', dataURL).css('width', '50px');
	        $('#photo-label').css('display', '');
        }
    } 
});




/************ 뒷면 이미지 저장 **************/
$('#back-fileupload').fileupload({
    url: serverRoot + '/../common/fileupload.json', // 서버에 요청할 URL
    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
    disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
    done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    	console.log('done()...');
    	console.log(data.result);
        $('#back-photo-path').val(data.result.data[0]);
    }, 
    processalways: function(e, data) {
        console.log('fileuploadprocessalways()...', data.files.length, data.index);
        var img = $('#back-photo-img');
        if (data.index == 0) {
        	console.log('미리보기 처리...');
	        var canvas = data.files[0].preview;
	        var dataURL = canvas.toDataURL();
	        img.attr('src', dataURL).css('width', '270px');
	        updateStmpsideSize();
	        updateMidtopSize();
	        updateBtmlineSize();
        }
    } 
});



/************ 앞면 이미지 저장 **************/
$('#front-fileupload').fileupload({
    url: serverRoot + '/../common/fileupload.json', // 서버에 요청할 URL
    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
    disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
    done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    	console.log('done()...');
    	console.log(data.result);
        $('#front-photo-path').val(data.result.data[0]);
    }, 
    processalways: function(e, data) {
        console.log('fileuploadprocessalways()...', data.files.length, data.index);
        var img = $('#front-photo-img');
        if (data.index == 0) {
        	console.log('미리보기 처리...');
	        var canvas = data.files[0].preview;
	        var dataURL = canvas.toDataURL();
	        img.attr('src', dataURL).css('width', '130px');
	        updateFrontimgdivSize();
        }
    } 
});

