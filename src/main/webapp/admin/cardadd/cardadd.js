/*로그인 정보를 가져와서*/
var cafeMemberNo = "";

$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}
	cafeMemberNo = ajaxResult.data.cafeMemberNo;
});




/** stmpside 넓이 조정 **/
$(function() {
	var width = $('.backcard').css('width');
	var height = $('.backcard').css('height');
	$('.stmpside').css('width', width);
	$('.stmpside').css('height', height);
});




/*******************스탬프 영역 추가하기*********************/
var stampNo = 0;


$(document.body).on('click', '.pbtn', function(event) {
  if (stampNo + 1 > 20) {$('.cd_alert2').css('display', 'inline-block'); return;}
  $('<div>')
    .addClass('stmpare')
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




/* 경고창 */
$(document).ready(function() {
	$('.close_alert1').click(function() {
		//$('.alert').css("display","none");
		$('.cd_alert1').fadeOut(100);
	});
	$('.close_alert2').click(function() {
		//$('.alert').css("display","none");
		$('.cd_alert2').fadeOut(100);
	});
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
$(document).ready( function(){
	$('#btn-pop').click(function(){
		$('.tempPop').fadeIn(200);
	});
	$('.btn_top').click(function(){
		$('.tempPop').fadeOut(200);
	});

	$('.stmp_are .button').click(function(){
		$('.tempPop').fadeOut(200);
		var cardPath = $('.mySlides[style*="display: block"] img').attr('src');
		$('.backcard').remove();
		$('<img>').attr("class","backcard").attr("src",cardPath).insertBefore("#stmpside");
		
		var stmpPath = $(':checked + img').attr('src');
		$('.selectimg').attr("src",stmpPath);
		$('#photo-path').val($('.selectimg').attr("src"));
	});
});






/*********************** 저장 *************************/


var stampCafeCardNo = 0;



$('.btmsubmit').click (function() {
	
	
	var paramCard = {
			"cafeMemberNo": cafeMemberNo,
			"stampCount": $('.midNum').text(),
			"frontImgPath": $('.frontcard').attr("src"),
			"backImgPath": $('.backcard').attr("src"),
			"stampImgPath": $('#photo-path').val(),
			"service": $('.service').text()
	};
	console.log(paramCard);
	$.post(serverRoot + '/cardadd/add.json', paramCard, function(ajaxResult) {
		if (ajaxResult.status != "success") {
			alert(ajaxResult.data);
			return;
		}
		stampCafeCardNo = ajaxResult.data;
		
		
		for(i=0; i < stampNo; i++) {
			var p = $('.stampNo' + i);
			var positionX = p.position().left / $('.stmpside').css('width').split('px')[0];
			var positionY = p.position().top / $('.stmpside').css('height').split('px')[0];
			console.log(p.position().left);
			console.log(p.position().top);
			var paramPosition = {
					"stampCafeCardNo": stampCafeCardNo,
					"positionX": positionX,
					"positionY": positionY,
					"positionOrder": $('.stampNo' + i).text()
			};
			
			console.log(paramPosition);
			$.post(serverRoot + '/cardadd/addStampPosition.json', paramPosition, function(ajaxResult) {
				if (ajaxResult.status != "success") {
					alert(ajaxResult.data);
					return;
				}
			}, 'json');
		}
		
	}, 'json');
	
	
	
	
	//location.href = '../cafeinfoedit/cafeinfoedit3.html';
});






/* 파일 업로드 관련 script 
$('#fileupload').fileupload({
	url: 'http://b.bitcamp.com:8080/bitcamp_stampidle/common/fileupload.json',
	dataType: 'json', 
	done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
		console.log(data.result);
		$('#photo-path').val(data.result.data[0]);
	},
	processalways: function(e, data) {
		console.log(serverRoot + '/../common/fileupload.json');
		console.log('fileuploadprocessalways()...', data.files.length, data.index);
		var img = $('#photo-img');
		if (data.index == 0) {
			console.log('미리보기 처리...');
			var canvas = data.files[0].preview;
			var dataURL = canvas.toDataURL();
			img.attr('src', dataURL).css('width', '48px');
		}
	} 
}); */


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

