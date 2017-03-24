$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	var loginUser = ajaxResult.data;
	var cafeMembNo = loginUser.cafeMemberNo;
	if (loginUser == null) {
		location.href = clientRoot + '/auth/login.html'
	}
	$.getJSON(serverRoot + '/cafe/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var cafe = ajaxResult.data;
		
		$.getJSON(serverRoot + '/cafeTime/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
			var cafeTime = ajaxResult.data;

			$.getJSON(serverRoot + '/tag/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
				var tag = ajaxResult.data;

				$.getJSON(serverRoot + '/cafePhoto/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
					var cafePhotos = ajaxResult.data;

					$.getJSON(serverRoot + '/cardinfo/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
						var cardinfo = ajaxResult.data;

						$.getJSON(serverRoot + '/likes/count.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
							var likes = ajaxResult.data;

							$.getJSON(serverRoot + '/menu/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
								var menus = ajaxResult.data;

								$.getJSON(serverRoot + '/comment/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
									var comments = ajaxResult.data;


									$('.cafeLogo img').attr('src', '../../upload/' + cafe.logPath);
									$('.cafeName').text(cafe.cafeName);
									var tag_arr = tag.tagName.split(" ");
									for (var i in tag_arr) {
										$('<span>').appendTo('.tag').text("#" + tag_arr[i]);
									}
									$('.txt').text(cafe.intro);
									$('.like').text(likes);

									$.each(cafePhotos, function(i){
										$("<div class='sl_li'><img src='../../upload/"+cafePhotos[i].path+"' alt='cafe photo image'></div>").appendTo(".cafeImgSlide");
									});

									$.each(cafeTime, function(i){
										$('<span>').text(cafeTime[i].day + " " + cafeTime[i].startTime + "~" + cafeTime[i].endTime + " ").appendTo(".time");

									});
									
									$('.seat').text(cafe.chairNo);
									$('.tel').text(cafe.cafeTel);
									$('.addr').text(cafe.address/* + " " + cafe.detailAddress*/);
									if (cardinfo.backImgPath.slice(0,4) == "temp") {
										$('.cardArea img').attr('src', '../image/' + cardinfo.backImgPath);
									} else {
										$('.cardArea img').attr('src', '../../upload/' + cardinfo.backImgPath);
									}
									$('.stampNum .txt1 span').text(cardinfo.stampCount);
									$('.stampNum .txt2 span').text(cardinfo.service);

									$.each(menus, function(i){
										$("<div class='menu'><p class='mnImg'><img src='../../upload/" + menus[i].menuPath
												+ "' alt='menu image'></p><p class='mnName'>" + menus[i].menuName
												+ "</p><p class='price'>￦" + menus[i].price
												+ "</p></div>").appendTo(".menuSlide");
									});
									
									var totalStar = 0;
									
									$.each(comments, function(i){
										totalStar += comments[i].star;
										
										$("<li><div class='profileImg'><img src='" + membImg(i)
												+ "'></div><div class='comment_txt'><strong>" + check_nickNull(i)
												+ "</strong><p>" + comments[i].contents
												+ "</p></div><div class='etcInfo'><div class='date'>" + comments[i].uploadDate
												+ "</div><div class='star'><span class='" + starScoreCss(comments[i].star)
												+ "'></span></div></div></li>").appendTo(".comment_list ul");
									});
									
									totalStarAverage = totalStar / comments.length;
									$('<span class="' + totalStarScoreCss(totalStarAverage) + '">').appendTo(".starScore .star");
									
									$('.total span').text(commentsCount());
									$('.starScore .result span').text(averStarScore());
									$('.starScore .star span').addClass();

									function membImg(i) {
										if (comments[i].photoPath == null) {
											return clientRoot + '/image/comment_default.png';
										} else {
											return comments[i].photoPath;
										}
									}

									function check_nickNull(i) {
										if (comments[i].nick == null) {
											return "익명고객"
										} else {
											return comments[i].nick;
										}
									}
									function averStarScore() {
										var sum = 0;
										var aver = 0;
										if (comments.length != 0) {
											$.each(comments, function(i){
												sum += comments[i].star;
											});
										} else {
											return 0;
										}
										aver = sum/commentsCount();
										return aver;
									}

									function commentsCount() {
										var count = 0;
										$.each(comments, function(i){
											count++;
										});
										return count;
									}

									function starScoreCss(num) {
										switch(num) {
										case 5: return "star5";
										case 4: return "star4";
										case 3: return "star3";
										case 2: return "star2";
										case 1: return "star1";
										case 0: return "star0";
										}
									}

									function totalStarScoreCss(num) {
										if (4.7 < num && num <= 5) {
											return "star5";
										} else if (4.2 < num && num <= 4.7) {
											return "star4_5";
										} else if (3.7 < num && num <= 4.2) {
											return "star4";
										} else if (3.2 < num && num  <= 3.7) {
											return "star3_5";
										} else if (2.7 < num && num  <= 3.2) {
											return "star3";
										} else if (2.2 < num && num  <= 2.7) {
											return "star2_5";
										} else if (1.7 < num && num  <= 2.2) {
											return "star2";
										} else if (1.2 < num && num  <= 1.7) {
											return "star1_5";
										} else if (0.7 < num && num  <= 1.2) {
											return "star1";
										} else if (0.2 < num && num  <= 0.7) {
											return "star0_5";
										} else {
											return "star0";
										}
									}
									
									var showMap = function() {
										var map;
										var marker;
										var infowindow;
										var loginMember;
										var filename;
										var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
										var labelIndex = 0;
										var contentString = '<div id="content">'+
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

										var lat2;
										var lng2;
										var currentLatLng
										var address=cafe.address.split(" ").join("+");

										$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyDvKW1N-3l0zQzXfPjDh2MlauKigyMH9Eg', function(ajaxResult) {
											console.log(ajaxResult);

											lat2 = parseFloat(ajaxResult.results[0].geometry.location.lat);
											lng2 = parseFloat(ajaxResult.results[0].geometry.location.lng);
											currentLatLng = {lat: lat2, lng: lng2};
											initMap();
										})

										var initMap = function() {
											map = new google.maps.Map(document.getElementById('map'), {
												center: currentLatLng,
												zoom: 17
											});
											infowindow = new google.maps.InfoWindow({
												content: contentString
											});
											marker = new google.maps.Marker({
												position: currentLatLng,
												map: map,
												title: 'Hello World!',
												label: labels[labelIndex++ % labels.length]
											});
											marker.addListener('click', function() {
												infowindow.open(map, marker);
											});
										}
									};
									$(document).ready(function() {
									    $('.btn-showMap').click(function() {
									        $('.map').slideDown(200);
									        $('.btn-hideMap').fadeIn(300);
									        showMap();
									    });
									    $('.btn-hideMap').click(function() {
									        $('.map').slideUp(200);
									        $('.btn-hideMap').fadeOut(300);
									    });
									});
								});
							});
						});
					});
				});
			});
		});
	});
});

