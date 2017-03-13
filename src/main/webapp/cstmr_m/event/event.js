
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
    loadPage(i)
    
	$(window).scroll(function(){
		{
	      if($(window).scrollTop()+100 >= $(document).height() - $(window).height())
	    	  {
	    	  loadPage(++i);
	    	  }
	    		  
	    }
	});
	

	function loadPage(pageCount) {
		console.log(pageCount)
	$.getJSON(
	serverRoot + '/event/getAllList.json',
	{
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
	  
	  $('.title').click(function(event) {
		event.preventDefault();
		$.getJSON(serverRoot + '/event/updateView.json?eventNo=' + $(this).attr("data-no"));
		
	  	location.href = 'eventdetail.html?eventNo=' + $(this).attr("data-no");
	  });
	  
	  
	});
	};
	
	
});
$('#top-btn').click(function(event) {
	$(window).scrollTop($(window).height);
});

	
	