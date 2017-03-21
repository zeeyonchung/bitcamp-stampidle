var cafeMembNo = location.href.split('?')[1].split('=')[1];

var userNo = 0;

$.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
	if (ajaxResult.status != "success") {
		console.log(ajaxResult.data);
		location.href = clientRoot + "/auth/login.html";
		/*로그인 안 했으면 로그인 페이지로 보내기*/
	}
	userNo = ajaxResult.data.customMemberNo;
	var userName = ajaxResult.data.name;
	
	
	$(window).scrollTop($(window).height);

	// 1페이지 시작
	$.getJSON(serverRoot + '/cafe/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var cafe = ajaxResult.data;
		$('.cafeName').text(cafe.cafeName);
		$('.txt').text(cafe.intro);
		$('.addr').text(cafe.address +" "+ cafe.detailAddress);
		$('.tel').text(cafe.cafeTel);
		$('.seat').text(cafe.chairNo + "석");
		
		
		// 즐겨찾기 상태 가져와서 별에 불킬지 말지 결정하는 부분//
		$.getJSON(serverRoot + '/favorite/getFavoriteCount.json', 
			    {'customMemberNo': userNo,
			    'cafeMemberNo': cafeMembNo
			    }, function(ajaxResult) {
			        if (ajaxResult.data > 0) {
			        	$('#favorite').removeClass();
						$('#favorite').toggleClass('yes');
						$('#favorite').addClass('yes');
			        } else {
			        	$('#favorite').removeClass();
			        	$('#favorite').toggleClass('no');
			        }
			    });
		// 즐겨찾기//
		$("#favorite").click(function() {
		  if ($(this).hasClass('no')) {
			$(this).removeClass();
			$(this).toggleClass('yes');
			$('#favorite').addClass('yes');
			var param1 = {
					customMemberNo: userNo,
					cafeMemberNo : cafeMembNo
				};
			console.log(param1);
			$.post(serverRoot + '/favorite/add.json', param1, function(ajaxResult) {
				if (ajaxResult.status != "success") {
					alert(ajaxResult.data);
					return;
				}
			}, 'json'); 
			//즐겨찾기 삭제//
		  } else {
			  $(this).removeClass();
			  $(this).toggleClass('no');
			  var param2 = {
						customMemberNo: userNo,
						cafeMemberNo : cafeMembNo
					};
			  $.post(serverRoot + '/favorite/delete.json', param2, function(ajaxResult) {
					if (ajaxResult.status != "success") {
						alert(ajaxResult.data);
						return;
					}
				}, 'json'); 
		  }
		});
		
		// 카드 앞면 뒷면 가져오기//
		$.getJSON(serverRoot + '/customCard/customDetail.json', 
				{'customMemberNo': userNo,
			'cafeMemberNo': cafeMembNo},
			function(ajaxResult) {
				var stmpNo = ajaxResult.data.allStampCount;

				$.getJSON(serverRoot + '/cardadd/getCafeCardDetail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
					var cardInfo = ajaxResult.data;
					$.each(cardInfo, function(i) {
						$('.stmpcard').attr('src', '../'+cardInfo[i].backImgPath);
						$('.stmpcard2').attr('src', '../../upload/' +cardInfo[i].frontImgPath);
						var many = cardInfo[i].stampCount;
						if (many != 0) {
							$('.stmp-circle').css('display','block');
							$('.stmp-circle .many').text(many);
							$('.stmp-circle .stmpNo').text(stmpNo);
						}
					});
					$('.service').text(cardInfo[0].service);
				});
		});
	});
	// 1페이지 끝
	
	// 2페이지 시작
	$.getJSON(serverRoot + '/menu/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		
		var menuInfo = (ajaxResult.data);
			var menudiv = $('.menuList');
			var template = Handlebars.compile($('#menuTemplate').html());
			menudiv.append(template({"list":menuInfo}));
	});
	
	// 2페이지 끝
	
	// 3페이지 시작
	// 총 코멘트 수
	commemntNumber();
	// 코멘트 리스트 가져오기(핸들바스)
	commentList();
	
	$('.comment_form input').attr('placeholder',userName);
	
	// 별점매기기//
	$( ".star_rating a" ).click(function() {
	     $(this).parent().children("a").removeClass("on");
	     $(this).addClass("on").prevAll("a").addClass("on");
	     return false;
	});
	$('.submit').click(function(event) {
		var star = $('.star_rating > .on').length;
		event.preventDefault();
		var param = {
			customMemberNo: userNo,
			name: userName,
			contents: $('.commentText').val(),
			star: star,
			cafeMemberNo : cafeMembNo
		};
		console.log(param);
		$.post(serverRoot + '/comment/add.json', param, function(ajaxResult) {
			if (ajaxResult.status != "success") {
				alert(ajaxResult.data);
				return;
			}
			swal({title:'리뷰 등록이 완료되었습니다.',
				  type:"success"});
		}, 'json');
		commemntNumber();
		commentList();
	});
	
	
	
	clickLike();
	clickLike2();
	// 좋아요 클릭 이벤트//
    $('#like').click(function() {
    	if ($(this).hasClass('no')) {
    		$(this).removeClass();
			$(this).toggleClass('yes');
			$('#like').addClass('yes');
			$.post(serverRoot + '/likes/addLikes.json', 
					{'customMemberNo': userNo,
				'cafeMemberNo': cafeMembNo
					}, function(ajaxResult) {
						clickLike();
						clickLike2();
					});
			
			
    	} else {
    		$(this).removeClass();
		    $(this).toggleClass('no');
		    
		  $.post(serverRoot + '/likes/deleteLikes.json', 
                    {'customMemberNo': userNo,
                    'cafeMemberNo': cafeMembNo
                    }, function(ajaxResult) {
                    	clickLike();
              		  clickLike2();
                    });
		  
		  
		  
    	}
    });
});



function clickLike() {
	$.getJSON(serverRoot + '/likes/count.json', {'cafeMemberNo': cafeMembNo}, function(ajaxResult) {
		var likeCount = (ajaxResult.data);
		$('#like').text(likeCount);
	});
	
	// 좋아요 갯수 입력//
}


function clickLike2() {
	$.getJSON(serverRoot + '/likes/getLikesCount.json', {'customMemberNo': userNo,'cafeMemberNo': cafeMembNo}, function(ajaxResult) {
        if (ajaxResult.data > 0) {
        	$('#like').removeClass();
        	$('#like').toggleClass('yes');
        	$('#like').addClass('yes');
        }   else {
        	$('#like').removeClass();
        	$('#like').toggleClass('no');
        }
        
	});
}

function commemntNumber() {
$.getJSON(serverRoot + '/comment/count.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
	$('.total>span').text(ajaxResult.data + "건");
});
};

function commentList() {
	$.getJSON(serverRoot + '/comment/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var comments = (ajaxResult.data);
		var commentdiv = $('.comment_list ul');
		var commentTemplate = Handlebars.compile($('#commentTemplate').html());
		for (var i in comments) {
			if (comments[i].nick == null) {
				comments[i].nick = comments[i].name;
			}
		}
		commentdiv.append(commentTemplate({"commentList":comments}));
		$('.result').text("평점 (" + averStarScore() +"/5.0)");
		$('.star span').addClass(totalStarScoreCss());
		// 가져온 별점 갯수,평균 구하기
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
			
			return aver.toFixed(2);
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
		function totalStarScoreCss() {
			if (4.7 < averStarScore() && averStarScore() <= 5) {
				return "star5";
			} else if (4.2 < averStarScore() && averStarScore() <=4.7) {
				return "star4_5";
			} else if (3.7 < averStarScore() && averStarScore() <= 4.2) {
				return "star4";
			} else if (3.2 < averStarScore() && averStarScore() <= 3.7) {
				return "star3_5";
			} else if (2.7 < averStarScore() && averStarScore() <= 3.2) {
				return "star3";
			} else if (2.2 < averStarScore() && averStarScore() <= 2.7) {
				return "star2_5";
			} else if (1.7 < averStarScore() && averStarScore() <= 2.2) {
				return "star2";
			} else if (1.2 < averStarScore() && averStarScore() <= 1.7) {
				return "star1_5";
			} else if (0.7 < averStarScore() && averStarScore() <= 1.2) {
				return "star1";
			} else if (0.2 < averStarScore() && averStarScore() <= 0.7) {
				return "star0_5";
			}  else {
			     return "star0";
			}
		}
	});
	
}


