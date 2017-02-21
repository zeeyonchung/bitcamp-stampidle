/*****  sidebar.html  *****/


// 로그인 화면 상단 stampidle 로고
$('.logo').click(function(e) {
	location.href = '../main/main.html'
});

//sidebar link*******************************************
$('.searchCstmr').click(function(e) {
    location.href = '../stampidle_cs/customerdetail.html'
});
$('.statistics').click(function(e) {
    location.href = '../manage/statistics.html'
});
$('.event').click(function(e) {
    location.href = '../event/main.html'
});

// header link ********************************************
$('.logo-img-src').click(function(e) {
	e.preventDefault();
    location.href = '../main/main.html'
});

$('.srchList li a').click(function(e) {
	e.preventDefault();
    location.href = '../stampidle_cs/customerdetail.html'
});


// event page link
$('.one a').click(function(e) {
	e.preventDefault();
    location.href = 'main.html'
});

$('.two a').click(function(e) {
	e.preventDefault();
    location.href = 'pastevent.html'
});

$('#add-event').click(function(e) {
	e.preventDefault();
    location.href = 'eventadd.html'
});

$('#event-title a').click(function(e) {
	e.preventDefault();
    location.href = 'eventdetail.html'
});


// eventdetail page link ****************************

$('#use-btn-list').click(function(e) {
	e.preventDefault();
    location.href = 'main.html'
});

$('#use-btn-edit').click(function(e) {
	e.preventDefault();
    location.href = 'eventupdate.html'
});

//eventupdate page link ****************************
$('#cancle-btn2').click(function(e) {
	e.preventDefault();
    location.href = 'eventdetail.html'
});

$('.event-regi-btn').click(function(e) {
	e.preventDefault();
    location.href = 'main.html'
});

// statistics page link *****************************
$('.statistics-one').click(function(e) {
    location.href = '../manage/statistics.html'
});
$('.statistics-two').click(function(e) {
    location.href = '../manage/customerlist.html'
});
$('.statistics-three').click(function(e) {
    location.href = '../manage/stamplog.html'
});


// cafeinfo page link ******************************
$('.cafeTxt .btn-edit').click(function(e) {
	e.preventDefault();
    location.href = '../cafeinfoedit/cafeinfoedit.html'
});


//cafeinfoedit page link ******************************
$('.manage-navi ul .one').click(function(e) {
	e.preventDefault();
    location.href = '../cafeinfoedit/cafeinfoedit.html'
});

$('.manage-navi ul .two').click(function(e) {
	e.preventDefault();
    location.href = '../cafeinfoedit/cafeinfoedit2.html'
});

$('.manage-navi ul .three').click(function(e) {
	e.preventDefault();
    location.href = '../cafeinfoedit/cafeinfoedit3.html'
});

