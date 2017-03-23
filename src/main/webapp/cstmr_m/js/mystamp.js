var userNo;


/*로그인 정보를 가져와서*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		//console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
	}
	
	var userData = ajaxResult.data;
	userNo = userData.customMemberNo;
	loadPage();
});
	




function loadPage() {
	$.getJSON(serverRoot + '/customCard/getMyCardList.json?customMemberNo=' + userNo, function(ajaxResult) {
		/********************* section1 전체 카드 리스트 *************************/
		var myCardList = ajaxResult.data.myCardList;
		console.log(myCardList);
		if (myCardList == null) {
			$('.section.all #num').text(0);
		} else {
			$('.section.all #num').text(myCardList.length);
		}
		
		var infodiv1 = $('.infodiv');
		var template = Handlebars.compile($('#trTemplate1').html());
		infodiv1.html(template({"myCardList": myCardList}));
		
		
		
		/********************* section2 즐겨 찾는 카드 리스트 *************************/
		var myFavoriteCardList = ajaxResult.data.myFavoriteCardList;
		console.log(myFavoriteCardList);
		if (myFavoriteCardList == null) {
			$('.section.favorite #num').text(0);
		} else {
			$('.section.favorite #num').text(myFavoriteCardList.length);
		}
		
		var infodiv2 = $('.infodiv2');
		var template = Handlebars.compile($('#trTemplate2').html());
		infodiv2.html(template({"myFavoriteCardList": myFavoriteCardList}));
		
		
		
		/********************* section3 다 모은 카드 리스트 *************************/
		var myFinishCardList = ajaxResult.data.myFinishCardList;
		console.log(myFinishCardList);
		if (myFinishCardList == null) {
			$('.section.done #num').text(0);
		} else {
			$('.section.done #num').text(myFinishCardList.length);
		}
		
		var infodiv3 = $('.infodiv3');
		var template = Handlebars.compile($('#trTemplate3').html());
		infodiv3.html(template({"myFinishCardList": myFinishCardList}));
		
		
		$('.list').click(function(event) {
			event.preventDefault();
			location.href = '../cafeinfo/cafeinfo.html?cafeMemberNo=' + $(this).attr("data-no");
		});
		
		loadSwipe();
	});
}




function loadSwipe() {
	$('#swipe .swWrap').css('min-height', window.innerHeight - 100);
	
	
    if (!document.getElementById('tab_swipe')) return false;
    var mnTab = document.getElementById('tab_swipe').getElementsByTagName('li');
    var elem = document.getElementById('swipe');
    var secH;
    window.areaSwipe = Swipe(elem, {
        startSlide: 0,
        continuous: true,
        stopPropagation: true,
        callback: function(pos) {
            var currentSlide = pos + 1;
            var n = mnTab.length;
            while (n--) {
                mnTab[n].className = ' ';
            }
            mnTab[pos].className = 'on';
            
            
            secH = $(".section[data-index='" + pos + "']").outerHeight();
            $('#swipe .swWrap').height(secH);
            $(window).scrollTop(0);
            console.log(currentSlide, $(".section[data-index='0']").outerHeight(), $(".section:nth-of-type(2)").outerHeight(), $(".section:nth-of-type(3)").outerHeight());
        }
    });
    
    $('#swipe .swWrap').css('height', $(".section[data-index='0']").outerHeight(true) + 40);
    
}

