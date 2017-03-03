
/*****  sidebar.html  *****/
// 로그인 화면 상단 stampidle 로고
$('.logo').click(function(e) {
	location.href = clientRoot + '/main/main.html'
});


//sidebar link*******************************************
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
	e.preventDefault();
    location.href = clientRoot + '/cafeinfo/cafeinfo.html'
});


// header link ********************************************
$('.logo-img-src').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/main/main.html'
});
$('.srchList li a').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/stampidle_cs/customerdetail.html'
});
$('.btn-joinInfo btnStyle1').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/cafeinfoedit/cafeinfoedit.html'
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




//eventupdate page link ****************************
$('#cancle-btn2').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/event/eventdetail.html'
});

$('.event-regi-btn').click(function(e) {
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
$('.manage-navi ul .one').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/cafeinfoedit/cafeinfoedit.html'
});

$('.manage-navi ul .two').click(function(e) {
	e.preventDefault();
    location.href = clientRoot + '/cardadd/cardadd.html'
});





