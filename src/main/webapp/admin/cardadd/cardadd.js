

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


//위치 정보 저장




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

$('.btmsubmit').click (function() {
	var array=[];
	for(i=0; i < stampNo; i++) {
	var p = $('.stampNo' + i);
	  var position = p.position();
	  array.push(position);
	}
	console.log(array);
});




/* 파일 업로드 관련 script */
$('#fileupload').fileupload({
	dataType: 'json', /* "서버가 보낸 데이터가 JSON 문자열이다. 자바스크립트 객체로 바꿔라." 라는 의미*/
	done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
		console.log(data.result);
		var param = data.result.params[0];
		console.log(param);
		$('#photo-path').val(param.filepath);
	},
	processalways: function(e, data) {
		console.log('fileuploadprocessalways()...');
		var img = $('#photo-img');
		if (!img.attr('src')) {
			console.log('미리보기 처리...');
			var canvas = data.files[0].preview;
			var dataURL = canvas.toDataURL();
			img.attr('src', dataURL).css('width', '48px');
		}
	} 
});






/* 탬플릿 이용버튼 클릭시 팝업관련 script */
/* pulldownPop */
$(document).ready( function(){
	$('#btn-pop').click(function(){
		$('.tempPop').fadeIn(200);
	});
	$('.btn_top').click(function(){
		$('.tempPop').fadeOut(200);
	});

	$('.button').click(function(){
		$('.tempPop').fadeOut(200);
		var cardPath = $('.mySlides[style*="display: block"] img').attr('src');
		$('.backcard').remove();
		$('<img>').attr("class","backcard").attr("src",cardPath).insertBefore("#stmpside");
		
		var stmpPath = $(':checked + img').attr('src');
		$('.selectimg').remove();
		$('<img>').attr("class","selectimg").attr("src",stmpPath).css('z-index','1').insertBefore("#photo-img");
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





/** stmpside 넓이 조정 **/
$(function() {
	var width = $('.backcard').css('width');
	var height = $('.backcard').css('height');
	$('.stmpside').css('width', width);
	$('.stmpside').css('height', height);
});