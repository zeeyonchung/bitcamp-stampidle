
/*****  sidebar.html  *****/
// 로그인 화면 상단 stampidle 로고
$('.logo').click(function(e) {
	location.href = clientRoot + '/main/main.html'
});


/*//sidebar link*******************************************
//링크작동안하는 문제때문에 sidebar.html에 임시로 옮겨둠
$('.searchCstmr a').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/stampidle_cs/customerdetail.html'
});
$('.statistics a').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/manage/statistics.html'
});
$('.event a').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/event/main.html'
});
$('.btn_cafeInfo').click(function(e) {
	alert('test');
	$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
		$.getJSON(serverRoot + '/cafe/detail.json?cafeMemberNo=' + ajaxResult.data.cafeMemberNo, function(ajaxResult1) {
			if (ajaxResult1.status == "fail") {
				//alert('카페정보를 입력해주세요.');
				 location.href = clientRoot + '/cafeinfoedit/cafeinfoedit.html'
			} else {
				location.href = clientRoot + '/cafeinfo/cafeinfo.html'
			}
		});
	});
}); */


// header link ********************************************
$('.logo-img-src').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/main/main.html'
});
$('.srchList li a').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/stampidle_cs/customerdetail.html'
});



// event page link ********************************************
$('#add-event').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/event/eventadd.html'
});


// eventdetail page link ****************************
$('#use-btn-list').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/event/main.html'
});



// statistics page link *****************************
$('.statistics-one').click(function(e) {
    location.href = clientRoot + '/manage/statistics.html'
});
$('.statistics-two').click(function(e) {
    location.href = clientRoot + '/manage/customerlist.html'
});
$('.statistics-three').click(function(e) {
    location.href = clientRoot + '/manage/stamplog.html'
});


// cafeinfo page link ******************************
$('.cafeTxt .btn-edit').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/cafeinfoedit/cafeinfoedit.html'
});


//cafeinfoedit page link ******************************

$('.mn-info.card').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/cardadd/cardadd.html'
});





