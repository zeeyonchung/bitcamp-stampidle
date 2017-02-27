/* div 드래그관련 script */
$( function() {
	for(var i = 0; i < 21; i++) {
		$("<div>").attr("class","stmpare")
		.css("display","none")
		.appendTo("#stmpside")
		.draggable({containment : 'parent' })
		.addTouch();
	};
})







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








/* div 추가,제거 관련 script1 */
function add_item() {
	/*
      var div = document.createElement('div');
      div.className = "stmpare";
      div.id="stmpare";
      document.getElementById('stmpside').appendChild(div);
	 */
	var num = $('.midNum').text();
	$(".stmpside").children().eq(num).css("display","");
	$(".stmpside").children().eq(num).css("left","0px");
	$(".stmpside").children().eq(num).css("top","0px");
}
function remove_item() {
	//$('.stmpare').remove();
	/*$('.stmpside .stmpare:last-child').remove();*/
	var num = $('.midNum').text();
	$(".stmpside").children().eq(num-1).css("display","none");
	$(".stmpside").children().eq(num).css("left","0px");
	$(".stmpside").children().eq(num).css("top","0px");
}








/* div 추가,제거 관련 script2 */
$(function() {
	$('.mbtn').click(function(e) {
		e.preventDefault();
		var stat = $('.midNum').text();
		var num = parseInt(stat, 10);
		num--;
		if (num <= 0) {
			//alert('1개이상 존재해야 합니다.');
			//$('.alert').css("display", "block");
			$('.cd_alert1').fadeIn(100);
			num = 0;
		}
		$('.midNum').text(num);
	});
	$('.pbtn').click(function(e) {
		e.preventDefault();
		var stat = $('.midNum').text();
		var num = parseInt(stat, 10);
		num++;
		if (num > 21) {
			$('.cd_alert2').fadeIn(100);
			//alert('더이상 추가할수 없습니다.');
			num = 21;
		}
		$('.midNum').text(num);
	});
});






/* 경고창 관련 script */
/* alert */
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
