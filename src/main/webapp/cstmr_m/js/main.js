/*로그인 정보를 가져와서*/

$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		
	}
	var userData = ajaxResult.data;
	var userName = userData.name;
	var customMemberNo = userData.customMemberNo;
	
	
	


	$.getJSON(serverRoot + '/customCard/getRecentCard.json',
		{customMemberNo: customMemberNo},
		function(ajaxResult) {
			
			var customCardList = ajaxResult.data;
			
			if (customCardList == null) {
				$('.btn_show').css('display', 'none');
				$('.btn_hide').css('display', 'none');
				$('.latelyCardSlide').css('display', 'none');
				$('.stampNum').css('display', 'none');
				$('.latelyCard h2 .titl').text('새로운 카페에 방문해보세요!');
			} else {
				$('.latelyCard h2 .titl').html('님의 최근이용 스탬프카드');
				$('h2 > #user-name').append(userName);
				$('.stampNum').css('display', 'inline-block');
				$('.btn_hide').css('display', 'block');
			}
			
			var latelyCardSlide = $('.latelyCardSlide');
			var template = Handlebars.compile($('#trTemplate').html());
			latelyCardSlide.html(template({"customCardList": customCardList}));
			
			$('.cafeTxt .cafeName').click(function(event) {
				event.preventDefault();
				//location.href = '../stampidle_cs/customerdetail.html?customMemberNo=' + $(this).attr("data-no");
			});
			
			
			slide();
			
			
			
			
			$.getJSON(serverRoot + '/event/getAllListBanner.json', function(ajaxResult){
				var status = ajaxResult.status;
				if(status != "success") {
					console.log(ajaxResult.data);
					return;
				}
				var list = ajaxResult.data;
				var eventdiv = $('.event-div');
				var template = Handlebars.compile($('#trTemplate2').html());
				eventdiv.append(template({"list": list}));
				
				
				$('.eventBanner').click(function(event) {
					event.preventDefault();
					location.href = '../event/eventdetail.html?eventNo=' + $(this).attr("data-no");
				});
				
			});
	});
	
	
});






function slide() {

	/* show hide latelyCardSlide */
    $(document).ready(function() {
        $('.btn_show').click(function() {
        	$('.btn_show').hide();
        	$('.btn_hide').show();
            $('.latelyCardSlide').slideDown(00);
            $('.stampNum').slideDown(00);
            $('.latelyCard h2').removeClass('hidden');
        });
        

        $('.btn_hide').click(function() {
        	$('.btn_hide').hide();
            $('.btn_show').show();
            $('.latelyCardSlide').slideUp(00);
            $('.stampNum').slideUp(00);
            $('.latelyCard h2').addClass('hidden');
        });
        
        /* latelyCard slide */
        $(".latelyCardSlide").slick({
        	dots : true,
        	infinite : true,
        	slidesToShow : 1,
        	slidesToScroll : 1
        });
        
        // stampNumS 스탬프개수 stampNum에 넣기(at loading)
        var stampNumHistoryString = $(".slick-current .stampNumS .history").text();
        var stampNumNumAllString = $(".slick-current .stampNumS .numAll").text();
        $(".stampNum .history").text(stampNumHistoryString);
        $(".stampNum .numAll").text(stampNumNumAllString);
        
        // stampNumS 스탬프개수 stampNum에 넣기(at sliding : search 'for cstmr_m/main.html by sinae' in slick.js)
       
        
        $('.cafeName').click(function(event) {
			event.preventDefault();
			location.href = '../cafeinfo/cafeinfo.html?cafeMemberNo=' + $(this).attr("data-no");
		});
    });
    
    
}
