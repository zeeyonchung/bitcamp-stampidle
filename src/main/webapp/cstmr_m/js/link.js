/** *** sidebar.html **** */

// move to auth/main.js
/*
$('#logoff-div').click(function(e) { location.href = '../auth/main.html' });
//move to js/common.js 
$('#logout-btn').click(function(e) { location.href ='../auth/main.html' });
*/
$('.sidebar #logon-div').click(function(e) {
	location.href = '../mypage/mypage.html'
});
$('.sidebar .mn_myStamp a').click(function(e) {
	e.preventDefault();
	location.href = '../mystamp/mystamp.html'
});
$('.sidebar .mn_findCafe').click(function(e) {
	location.href = '../findcafe/findcafe.html'
});
$('.sidebar .like a').click(function(e) {
	e.preventDefault();
	location.href = '../likecafe/likecafe.html'
});
$('.sidebar .event a').click(function(e) {
	e.preventDefault();
	location.href = '../event/event.html'
});
$('.sidebar .msg a').click(function(e) {
	e.preventDefault();
	location.href = '../message/message.html'
});


/** *** main/main.html **** */

$('.main .all .mn').click(function(e) {
	location.href = '../mystamp/mystamp.html'
});
$('.main .msg .mn').click(function(e) {
	location.href = '../message/message.html'
});


/** *** cafeinfo/cafeinfo.html **** */
$('.cafeinfo .btn-gift').click(function(e) {
	location.href = '../cafeinfo/gift.html'
});
$('.cafeinfo .btn-message').click(function(e) {
	location.href = '../message/message.html'
});


/** *** cafeinfo/gift.html **** */
$('.gift .back-btn').click(function(e) {
	location.href = '../cafeinfo/cafeinfo.html'
});


/** *** event/event.html **** */
$('.event .eventBn').click(function(e) {
	location.href = '../event/eventdetail.html'
});


/** *** event/eventadd.html **** */
$('.eventadd .add-new-btn').click(function(e) {
	location.href = '../event/event.html'
});


/** *** event/eventdetail.html **** */
$('.eventdetail #use-btn').click(function(e) {
	location.href = '../event/event.html'
});


/** *** findcafe/findcafe.html **** */


/** *** likecafe/likecafe.html **** */
$('.likeCafe .list').click(function(e) {
	location.href = '../cafeinfo/cafeinfo.html'
});


/** *** message/message.html **** */
/*$('.message .one-msg').click(function(e) {
	location.href = '../message/messagedetail.html'
});*/


/** *** messagedetail/messagedetail.html **** */
$('.messageDetail .back-btn').click(function(e) {
	location.href = '../message/message.html'
});


/** *** mypage/mypage.html **** */
$('.myPage .submit').click(function(e) {
	location.href = '../mypage/mypage.html'
});


/** *** mystamp/mystamp.html **** */



/** *** header.html **** */
$('#header .logo').click(function(e) {
	location.href = '../main/main.html'
});
$('#header .btn_home').click(function(e) {
	e.preventDefault();
	location.href = '../main/main.html'
});


