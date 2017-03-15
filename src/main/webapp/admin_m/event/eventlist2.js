
$.getJSON(serverRoot + '/admin_m/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/admin_m/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}
	var cafeMember = ajaxResult.data;
	var cafeMemberNo = cafeMember.cafeMemberNo;
	var postNo=10;
    var i = 1;
    loadPage(i)
    
	$(window).scroll(function(){
		{
			++i;
			console.log(i);
	      if($(window).scrollTop()+20 >= $(document).height() - $(window).height())
	    	  {
	    	  loadPage(i);
	    	  }
	      
	    		  
	    }
	});
	

	function loadPage(pageCount) {
	$.getJSON(
	serverRoot + '/admin_m/event/list.json',
	{'cafeMemberNo': cafeMemberNo,
	 'pageCount': pageCount,
	 'postNo': postNo,
	 }, 
	function(ajaxResult) {
	  var status = ajaxResult.status;
	  if (status != "success") {console.log(ajaxResult.data); return;}
	  var list = ajaxResult.data.list;

	  var eventdiv = $('#container');
	  var template = Handlebars.compile($('#trTemplate').html());
	  $('#container').append(template({"list": list}));
	  
	  $('.eventlist .one-event').click(function(event) {
		
	  	location.href = 'eventdetail.html?eventNo=' + $('.title').attr("data-no");
	  });
	  
	  
	});
	};
	
	
});

$('#top-btn').click(function(event) {
	$(window).scrollTop($(window).height);
});

	
	