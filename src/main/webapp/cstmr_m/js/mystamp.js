$(window).load(function(){
    if (!document.getElementById('tab_swipe')) return false;
    var mnTab = document.getElementById('tab_swipe').getElementsByTagName('li');
    var elem = document.getElementById('swipe');
    
    window.areaSwipe = Swipe(elem, {
        startSlide: 0,
        continuous: true,
        callback: function(pos) {
            var currentSlide = areaSwipe.getPos() + 1;
            var n = mnTab.length;
            while (n--) {
                mnTab[n].className = ' ';
            }
            mnTab[pos].className = 'on';
            
			var secH = $(".section:nth-of-type(" + currentSlide + ")").outerHeight();
            $("#swipe .swWrap").css('height', secH);
            $(window).scrollTop(0);
            console.log(currentSlide, $(".section:nth-of-type(1)").outerHeight(), $(".section:nth-of-type(2)").outerHeight(), $(".section:nth-of-type(3)").outerHeight());
        }
    });
});


/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		//console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		
	}
	var userData = ajaxResult.data;
	var userNo = userData.customMemberNo;
	
	/********************* section1 전체 카드 리스트 *************************/
	$.getJSON(serverRoot + '/customCard/getMyCardList.json?customMemberNo=' + userNo, function(ajaxResult) {
		var myCardList = ajaxResult.data;
		console.log(myCardList);
		if (myCardList == null) {
			$('.section.all #num').text(0);
		} else {
			$('.section.all #num').text(myCardList.length);
		}
		
		var infodiv = $('.infodiv');
		var template = Handlebars.compile($('#trTemplate1').html());
		infodiv.html(template({"myCardList": myCardList}));
	});
	
	
	/********************* section2 즐겨 찾는 카드 리스트 *************************/
	$.getJSON(serverRoot + '/customCard/getMyFavoriteCardList.json?customMemberNo=' + userNo, function(ajaxResult) {
		var myFavoriteCardList = ajaxResult.data;
		console.log(myFavoriteCardList);
		if (myFavoriteCardList == null) {
			$('.section.favorite #num').text(0);
		} else {
			$('.section.favorite #num').text(myFavoriteCardList.length);
		}
		
		var infodiv = $('.infodiv2');
		var template = Handlebars.compile($('#trTemplate2').html());
		infodiv.html(template({"myFavoriteCardList": myFavoriteCardList}));
	});
	
	
	/********************* section3 다 모은 카드 리스트 *************************/
	$.getJSON(serverRoot + '/customCard/getMyFinishCardList.json?customMemberNo=' + userNo, function(ajaxResult) {
		var myFinishCardList = ajaxResult.data;
		console.log(myFinishCardList);
		if (myFinishCardList == null) {
			$('.section.done #num').text(0);
		} else {
			$('.section.done #num').text(myFinishCardList.length);
		}
		
		var infodiv = $('.infodiv3');
		var template = Handlebars.compile($('#trTemplate3').html());
		infodiv.html(template({"myFinishCardList": myFinishCardList}));
	});
	
	
});
