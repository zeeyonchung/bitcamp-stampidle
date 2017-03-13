
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}
	var member = ajaxResult.data;
	var memberNo = member.memberNo;
	var postNo=10;
    var i = 1;
    var searchCondition = null;
    console.log(searchCondition);
    loadPage(i);
	$(window).scroll(function(){
		{
	      if($(window).scrollTop()+100 >= $(document).height() - $(window).height())
	    	  {
	    	  loadPage(++i);
	    	  }
	    		  
	    }
	});
    
    
    $(".eventBn .dropdown-menu li").click(function(){
	  	$(".btn.dropdown-toggle:first-child").text($(this).text());
	  	 i =1;
	  	if ($(this).text() == "가까운순") {
	  		searchCondition = "e.titl"
	  	} else if ($(this).text() == "등록순") {
	  		searchCondition = "e.ebirth"
	  	} else if ($(this).text() == "이름순") {
	  		searchCondition = "e.titl"
	  	}
	  	
	  	
	  	loadPage(i,searchCondition)
	    
		$(window).scroll(function(){
			{
		      if($(window).scrollTop()+100 >= $(document).height() - $(window).height())
		    	  {
		    	  loadPage(++i,searchCondition);
		    	  }
		    		  
		    }
		});
	  });

	function loadPage(pageCount,searchCondition) {
			
		console.log(searchCondition);
	$.getJSON(
	serverRoot + '/event/getAllList.json',
	{
	 'pageCount': pageCount,
	 'postNo': postNo,
	 'searchCondition':searchCondition
	 }, 
	function(ajaxResult) {
	  var status = ajaxResult.status;
	  if (status != "success") {console.log(ajaxResult.data); return;}
	  console.log(ajaxResult.data);
	  var list = ajaxResult.data;
	  var eventdiv = $('#container');
	  var template = Handlebars.compile($('#trTemplate').html());
      if(i == 1) {
    	  $('#container').html(template({"list": list}));
      } else {
		  $('#container').append(template({"list": list}));
      }
	  $('.title').click(function(event) {
		event.preventDefault();
		$.getJSON(serverRoot + '/event/updateView.json?eventNo=' + $(this).attr("data-no"));
		
	  	location.href = 'eventdetail.html?eventNo=' + $(this).attr("data-no");
	  });
	  /* 검색조건 */
	  
	  
	});
	};
	
	
});
$('#top-btn').click(function(event) {
	$(window).scrollTop($(window).height);
});





$("#search-event-btn").click(function(){
	searchKeyword = $('.keyword-event').val();
	if (searchCondition == '') {alert('검색 조건 설정하세요');}
	loadPage(1, searchCondition, searchKeyword);
});



	