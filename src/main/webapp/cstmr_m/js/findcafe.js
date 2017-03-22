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
			}); // 스크롤 이벤트가 반복되어 일어나고 있음. 수정 필요.
			//console.log(customMemberNo, searchKeyword, postNo, pageCount);
			
			
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
	var marker;
	var infowindow;
	var loginMember;
	var filename;
	var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var labelIndex = 0;

	var lat;
	var lng;
	var contentString;
	var currentLatLng;
	
	initMap();
	
	
	$.getJSON(serverRoot + '/cafe/getCafeMapList.json', function(ajaxResult) {
		var cafeList = ajaxResult.data;
		for (var i = 0; i < cafeList.length; i++) {
			var address = cafeList[i].address;
			$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyDvKW1N-3l0zQzXfPjDh2MlauKigyMH9Eg', function(ajaxResult) {
				console.log(ajaxResult);
				lat = parseFloat(ajaxResult.results[0].geometry.location.lat);
				lng = parseFloat(ajaxResult.results[0].geometry.location.lng);
				contentString = '<div id="content">'+
								'<div id="siteNotice">'+
								'</div>'+
								'<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
								'<div id="bodyContent">'+
								'<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
								'sandstone rock formation in the southern part of the '+
								'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
								'south west of the nearest large town, Alice Springs; 450&#160;km '+
								'(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
								'features of the Uluru - Kata Tjuta National Park. Uluru is '+
								'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
								'Aboriginal people of the area. It has many springs, waterholes, '+
								'rock caves and ancient paintings. Uluru is listed as a World '+
								'Heritage Site.</p>'+
								'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
								'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
								'(last visited June 22, 2009).</p>'+
								'</div>'+
								'</div>';
				
				currentLatLng = {lat: lat, lng: lng};
				
				var infowindow = new google.maps.InfoWindow();
				
				marker = new google.maps.Marker({
					position: currentLatLng,
					map: map,
					title: 'Hello World!',
					label: labels[labelIndex++ % labels.length]
				});
				console.log(i);
				marker.addListener('click', function(i) {
					infowindow.setContent(contentString);
					infowindow.open(map, marker);
				});
				
			});
		}
	});
	

	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 37.4945723, lng: 127.02757780000002},
			zoom: 16
		});
	}//initMap

}