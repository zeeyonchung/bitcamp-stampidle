/*****  sidebar.html  *****/

//move to auth/main.js
/*$('#logoff-div').click(function(e) {
    location.href = '../auth/main.html'
});
//move to js/common.js
$('#logout-btn').click(function(e) {
    location.href = '../auth/main.html'
}); */
$('#logon-div').click(function(e) {
	location.href = '../mypage/mypage.html'
});
$('.mn_myStamp a').click(function(e) {
	e.preventDefault();
	location.href = '../mystamp/mystamp.html'
});
$('.mn_findCafe').click(function(e) {
	location.href = '../findcafe/findcafe.html'
});
$('.like a').click(function(e) {
	e.preventDefault();
	location.href = '../likecafe/likecafe.html'
});
$('.event a').click(function(e) {
	e.preventDefault();
	location.href = '../event/event.html'
});
$('.msg a').click(function(e) {
	e.preventDefault();
	location.href = '../message/message.html'
});



/*****  main/main.html  *****/

