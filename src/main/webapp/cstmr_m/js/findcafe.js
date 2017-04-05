var customMember = "";
var customMemberNo = 0;



/*게시글 몇 개씩 불러올 건지 설정*/
var postNo = 7;

/* 검색어 */
var searchKeyword = "";

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
						distance = (distance / 1000).toFixed(1) + 'km';
					} else {
						distance += 'm';
					}
					$('.distance[data-no=' + cafeMemberNo +']').text(distance);
		})
	});
}



/**** 글 불러오기 ****/
function loadPage(pageCount) {
	console.log(customMemberNo, searchKeyword, postNo, pageCount, orderBy);
	// 나중에 파라미터로 나의 현재 위치도 넘겨야 함. 지금은 그냥 목록 다 꺼내오는 것.
	$.getJSON(
		serverRoot + '/customCard/findCafe.json',
		{customMemberNo: customMemberNo,
		searchKeyword: searchKeyword,
		postNo: postNo,
		pageCount: pageCount,
		orderBy: orderBy},
			
		function(ajaxResult) {
			var status = ajaxResult.status;
			if (status != "success") {console.log(ajaxResult.data); return;}
			var cafeList = ajaxResult.data.cafeList;
			console.log(cafeList);
			
			if (cafeList == null) {
				$('.cafeListArea #num').text(allCafeCount);
			} else {
				allCafeCount = ajaxResult.data.allCafeCount;
				$('.cafeListArea #num').text(allCafeCount);
			}
			
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
			
			
			$('.cafeName').click(function(event) {
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
			}); 
			
			
			$('.myCard').click(function(event) {
				event.stopImmediatePropagation();
				if (!$(this).hasClass('select')) {
					addMyCard($(this).attr("data-no"));
				}
			});
			
			
			$('.cafeListArea ul.dropdown-menu li').click(function(event) {
				event.stopImmediatePropagation();
				orderBy = $(this).text();
				searchKeyword = $('.sb-search-input').val().trim();
				pageCount = 1;
				allCafeCount = 0;
				loadPage(pageCount);
			});
		}
	);
	
	showMap();
};




/* 검색하기 */
function searchLink() {
	orderBy = "이름순";
	searchKeyword = $('.sb-search-input').val().trim();
	pageCount = 1;
	allCafeCount = 0;
	loadPage(pageCount);
}



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



/*************************** 지도 ****************************/

var showMap = function() {
	var map;
	var infowindow;
	var loginMember;
	var filename;
	var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var labelIndex = 0;

	var address;
	var cafeList;
	
	initMap();
	
	
	$.getJSON(serverRoot + '/cafe/getCafeMapList.json', {"searchKeyword": searchKeyword}, function(ajaxResult) {
		cafeList = ajaxResult.data;
		//console.log(cafeList);
		for (var i = 0; i < cafeList.length; i++) {
			address = cafeList[i].address;
			initMaker(cafeList[i]);
		}
		
		
		$(document.body).on('click', '.firstHeading', function(event) {
			location.href= serverRoot + "/cafeinfo/cafeinfo.html?cafeMemberNo=" + $(this).attr('data-no');
		});
		
	});
	
	
	function initMaker(cafeList) {
		$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyDvKW1N-3l0zQzXfPjDh2MlauKigyMH9Eg', function(ajaxResult2) {
			//console.log(ajaxResult2)
			var lat = parseFloat(ajaxResult2.results[0].geometry.location.lat);
			var lng = parseFloat(ajaxResult2.results[0].geometry.location.lng);
			var contentString = '<div class="content marker">'+
			'<div class="siteNotice">'+
			'</div>'+
			'<h1 class="firstHeading"'+ ' data-no="'+ cafeList.cafeMemberNo +'"' +'>'+ cafeList.cafeName +'</h1>'+ '〉' +
			'<div class="bodyContent">'+
			'<p>'+ cafeList.intro +'</p>' +
			'<p>TEL) ' + cafeList.cafeTel + '</p>' +
			'</div>'+
			'</div>';
			
			var currentLatLng = {lat: lat, lng: lng};
			
			var infowindow = new google.maps.InfoWindow();
			
			var marker = new google.maps.Marker({
				position: currentLatLng,
				map: map,
				title: 'Hello World!',
				label: labels[labelIndex++ % labels.length]
			});
			marker.addListener('click', function(i) {
				infowindow.setContent(contentString);
				infowindow.open(map, marker);
			});
			
		});
	}

	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 37.4945723, lng: 127.02757780000002},
			zoom: 16
		});
	}//initMap

}