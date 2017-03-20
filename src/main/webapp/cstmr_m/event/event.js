$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}
	var member = ajaxResult.data;
	var memberNo = member.memberNo;
	var postNo = 4;
    var i = 1;
    
    loadPage(i);
	
    
    var searchCondition;
    
    $(".eventBn .dropdown-menu li").click(function(){
	  	$(".btn.dropdown-toggle:first-child").text($(this).text());
	  	 i =1;
	  	if ($(this).text() == "가까운순") {
	  		searchCondition = "titl"
	  	} else if ($(this).text() == "등록순") {
	  		searchCondition = "ebirth"
	  	} else if ($(this).text() == "이름순") {
	  		searchCondition = "titl"
	  	}
	  	
	  	console.log(searchCondition);
	  	loadPage(i);
	  });

    
	function loadPage(pageCount) {
		$.getJSON(serverRoot + '/event/getAllList.json',
				{'pageCount': pageCount,
				'postNo': postNo,
				'searchCondition':searchCondition}, 
		function(ajaxResult) {
			var status = ajaxResult.status;
			if (status != "success") {console.log(ajaxResult.data); return;}
			var list = ajaxResult.data;
			var eventdiv = $('#event-div');
			var template = Handlebars.compile($('#trTemplate').html());
			if(pageCount == 1) {
				eventdiv.html(template({"list": list}));
			} else {
				eventdiv.append(template({"list": list}));
			}
			
			$('.title').click(function(event) {
				event.preventDefault();
				$.getJSON(serverRoot + '/event/updateView.json?eventNo=' + $(this).attr("data-no"));
				
				location.href = 'eventdetail.html?eventNo=' + $(this).attr("data-no");
			});
			
			$(window).scroll(function(){
				if($(window).scrollTop()+20 >= $(document).height() - $(window).height()) {loadPage(++i);}
			});
		});
	};
	
	
});


$('#top-btn').on('click',function(event) {
	$('html, body').animate({'scrollTop' : 0}, 200);
    return false;
});

