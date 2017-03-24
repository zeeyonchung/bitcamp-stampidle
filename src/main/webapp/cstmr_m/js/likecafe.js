var customMember = "";
var customMemberNo = 0;



/*게시글 몇 개씩 불러올 건지 설정*/
var postNo = 7;

/* 로딩할 페이지 수 */
var pageCount = 1;

/* 정렬 기준 */
var orderBy = "이름순";

/* 검색 결과 총 개수 */
var allCafeCount = 0;



/*로그인 정보*/
$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		location.href = clientRoot + "/auth/login.html";
	}
	customMember = ajaxResult.data;
	customMemberNo = customMember.customMemberNo;
	
	/*제일 먼저 보여지는 1페이지*/
	loadPage(pageCount);
});






/**** 거리 구하기 ****/
function getDistance(origins, destinations, cafeMemberNo) {
	//목적지의 위도경도 구한 후
	$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+destinations+'&key=AIzaSyDvKW1N-3l0zQzXfPjDh2MlauKigyMH9Eg', function(ajaxResult2) {
		var lat2 = parseFloat(ajaxResult2.results[0].geometry.location.lat);
		var lng2 = parseFloat(ajaxResult2.results[0].geometry.location.lng);
		//거리 계산
		$.get(serverRoot + '/../common/distance.json', 
				{lat1: origins.lat,
				 lon1: origins.lng,
				 lat2: lat2,
				 lon2: lng2},
			function(distance) {
				if(distance > 1000) {
					distance = (distance / 10000).toFixed(1) + 'km';
				} else {
					distance += 'm';
				}
				$('.distance[data-no=' + cafeMemberNo +']').text(distance);
		})
	});
}




/**** 글 불러오기 ****/
function loadPage(pageCount) {
	console.log(customMemberNo, postNo, pageCount, orderBy);
	// 나중에 파라미터로 나의 현재 위치도 넘겨야 함. 지금은 그냥 목록 다 꺼내오는 것.
	$.getJSON(
		serverRoot + '/customCard/likeCafe.json',
		{customMemberNo: customMemberNo,
		postNo: postNo,
		pageCount: pageCount,
		orderBy: orderBy},
			
		function(ajaxResult) {
			var status = ajaxResult.status;
			if (status != "success") {console.log(ajaxResult.data); return;}
			var cafeList = ajaxResult.data.cafeList;
			console.log(cafeList);
			
			if (cafeList != null) {
				allCafeCount = ajaxResult.data.allCafeCount;
			}
			$('.likeCafe #num').text(allCafeCount);
			
			var listArea = $('.listArea');
			var template = Handlebars.compile($('#trTemplate').html());
			
			if (pageCount == 1) {
				listArea.html(template({"cafeList": cafeList}));
			} else {
				listArea.append(template({"cafeList": cafeList}));
			}
			
			
			// 거리 구하기
			for (var i in cafeList) {
				var origins = {lat:37.4945723, lng:127.02757780000002}; //비트컴퓨터 - gps로 가져오기
				var destinations = cafeList[i].address;
				
				getDistance(origins, destinations, cafeList[i].cafeMemberNo);
			}
			
			
			$('.list').click(function(event) {
				event.preventDefault();
				event.stopImmediatePropagation();
				location.href = '../cafeinfo/cafeinfo.html?cafeMemberNo=' + $(this).attr("data-no");
			});
			
			
			/* 결과창 높이 조절 */
			$('.listArea').css('height', ($(window).height() - 110) + 'px');
			
			
			/* 무한 스크롤 */
			$(window).scroll(function(event) {
				event.stopImmediatePropagation();
				if($(window).scrollTop() + $(window).height() == $(document).height()) {loadPage(++pageCount);}
			}); // 스크롤 이벤트가 반복되어 일어나고 있음. 수정 필요.
			//console.log(customMemberNo, searchKeyword, postNo, pageCount);
			
			
			$('.myCard').click(function(event) {
				event.stopImmediatePropagation();
				if (!$(this).hasClass('select')) {
					addMyCard($(this).attr("data-no"));
				}
			});
			
			
			$('.likeCafe ul.dropdown-menu li').click(function(event) {
				event.stopImmediatePropagation();
				orderBy = $(this).text();
				pageCount = 1;
				allCafeCount = 0;
				loadPage(pageCount);
			});
		}
	);
};




/* 내 카드로 담기 */
function addMyCard(cafeMemberNo) {
	$.post(serverRoot + '/customMember/addMyCard.json',
			{name: customMember.name,
			tel: customMember.tel,
			cafeMemberNo: cafeMemberNo},
		function(ajaxResult) {
			$('.myCard[data-no=' + cafeMemberNo + ']').addClass('select');
		}
	);
}
