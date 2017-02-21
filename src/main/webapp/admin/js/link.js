/*****  sidebar.html  *****/


// 로그인 화면 상단 stampidle 로고
$('.logo').click(function(e) {
	location.href = '../main/main.html'
});

//로그인 화면 상단 stampidle 로고
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

