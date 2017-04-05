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
	getMyCafeList();
	
	// 1페이지 시작
	$.getJSON(serverRoot + '/cafe/detail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
		var cafe = ajaxResult.data;
		$('.cafeName').text(cafe.cafeName);
		$('.txt').text(cafe.intro);
		$('.addr').text(cafe.address);
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
		
		
		
		$.getJSON(serverRoot + '/customCard/getOneCafeStampNo.json', 
				{'customMemberNo': userNo,
				 'cafeMemberNo': cafeMembNo},
			function(ajaxResult) {
					 console.log(ajaxResult)
				if (ajaxResult.data) {
					$('.stmp-circle').css('display', 'block');
					$('.stmp-circle .stampCount').text(ajaxResult.data.stampCount);
					$('.stmp-circle .currentStampCount').text(ajaxResult.data.currentStampCount);
				} else {
					$('.stmp-circle').css('display', 'none');
				}
		});
	
	
		// 카드 앞면 뒷면 가져오기//
		$.getJSON(serverRoot + '/cardadd/getCafeCardDetail.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
			var cardInfo = ajaxResult.data;
			$.each(cardInfo, function(i) {
				$('.stmpcard').attr('src', '../'+cardInfo[i].backImgPath);
				$('.stmpcard2').attr('src', '../../upload/' +cardInfo[i].frontImgPath);
			});
			if (cardInfo[0].service != "") {
				$('.service').text(cardInfo[0].service);
			} else {
				$('.service').text("등록되지 않은 내용입니다.");
			}
		});
	});
	
	$('.btn-message').attr('data-no', cafeMembNo);
	console.log(cafeMembNo);
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
	commentNumber();
	// 코멘트 리스트 가져오기(핸들바스)
	commentList(cafeMembNo,userNo);
	
	$('.comment_form input').attr('placeholder',userName);
	
	// 별점매기기//
	$( ".star_rating a" ).click(function() {
	     $(this).parent().children("a").removeClass("on");
	     $(this).addClass("on").prevAll("a").addClass("on");
	     return false;
	});
	$('.submit').click(function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		var star = $('.star_rating > .on').length;
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
			swal({title:'리뷰 등록이 완료되었습니다.', type:"success"});
			commentList(cafeMembNo,userNo);
			commentNumber();
			swipeSection(2);
			$('#swipe .swWrap').css('height', $(".section[data-index='2']").outerHeight(true) + 120);
		}, 'json');
		
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
    
    $(document.body).on('click', '.delete-comments', function(event) {
    	var commentsWritter = $(this).attr("data-no");
    	var commentsNo2 = $(this).attr("commentNo");
    	if(userNo == commentsWritter) {
    		swal({
			  title: "삭제하시겠습니까?",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonColor: "#DD6B55",
			  confirmButtonText: "삭제",
			  cancelButtonText: "취소",
			  closeOnCancel: true,
			  closeOnConfirm: false
			}, function(isConfirm){
				if (isConfirm) {
					$.post(serverRoot + '/comment/delete.json', 
						{'commentsNo' : commentsNo2},
						function(ajaxResult) {
							swal({title: "삭제되었습니다.", type: "success"});
							commentList(cafeMembNo,userNo);
							commentNumber();
							swipeSection(2);
							$('#swipe .swWrap').css('height', $('#swipe .swWrap').outerHeight(true) - $('.commentArea .comment_list li').height() -20);
					});
				}
			});
    		
    		
    	} else {
    		alert('삭제할수 없습니다.');
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

function commentNumber() {
$.getJSON(serverRoot + '/comment/count.json?cafeMemberNo=' + cafeMembNo, function(ajaxResult) {
	$('.total>span').text(ajaxResult.data + "건");
});
};

var commentList = function(cafeMembNo,userNo) {
	$.getJSON(serverRoot + '/comment/detail.json',
		{
		'cafeMemberNo' : cafeMembNo,
		'customMeberNo' : userNo
	    }
	, function(ajaxResult) {
		var comments = (ajaxResult.data);
		var commentdiv = $('.comment_list ul');
		$('.commentText').val("");
		commentdiv.html("")
		var commentTemplate = Handlebars.compile($('#commentTemplate').html());
		for (var i in comments) {
			if (comments[i].nick == null) {
				comments[i].nick = comments[i].name;
			}
		}

		commentdiv.append(commentTemplate({"commentList":comments}));
		
		
		
		$(".delete-comments[data-no='"+ userNo +"']").addClass('active');
		
		$('.result').text("평점 (" + averStarScore() +"/5.0)");
		$('.starScore .star span').removeClass();
		$('.starScore .star span').addClass(totalStarScoreCss());
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
	$('.gift').click(function(event) {
		event.preventDefault();
		location.href = 'gift.html?cafeMemberNo=' + cafeMembNo;
	});
	
    
};
$('.btn-top').on('click',function(event) {
	$('html, body').animate({'scrollTop' : 0}, 200);
    return false;
});

<<<<<<< HEAD
=======



/* 내 카드로 담기 */
function addMyCard(cafeMemberNo) {
	$.post(serverRoot + '/customMember/addMyCard.json',
			{name: userName,
			tel: userTel,
			cafeMemberNo: cafeMemberNo},
		function(ajaxResult) {
			$('.myCard').addClass('select');
		}
	);
}






/*********************** 메시지 ***********************/
//나의 카페리스트 가져오기
function getMyCafeList() {
	$.getJSON(serverRoot + '/message/cafeNoNameList.json?customMemberNo=' + userNo, function(ajaxResult) {
		var cafeNoNameList = ajaxResult.data;
		$.each(cafeNoNameList, function(i){
			$("<option value='" + cafeNoNameList[i].cafeMemberNo
		    + "'>" + cafeNoNameList[i].cafeName
			+ "</option>").appendTo("#cafeNoNameList");
		});
	});
}


//메시지 입력 버튼
function msgPopOpen() {
	$('#cafeNoNameList').val(cafeMembNo);
	
	var popTop = $(window).height()/2 - $(".writeArea").outerHeight()/2;
	$('.writeWrap').fadeIn(300);
    $('.writeArea').fadeIn(500);
    $('.writeArea').css("margin-top",popTop);
}


$('.btn-message').click(function(event) {
	event.stopImmediatePropagation();
	msgPopOpen();
});


$('.btn-close').click(function(event) {
	event.stopImmediatePropagation();
    $('.writeWrap').fadeOut(300);
    $('body.message').css("overflow-y","scroll");
});



//보내기
$('.btn-send').click(function(event) {
	event.stopImmediatePropagation();
	if ($('.chat-input').val() == "") {
		swal({title:"메시지를 입력해주세요.",
			  type:"warning"});
		return $('.chat-input').focus();
	} else if ($('select[name=cafeNo]').val() == null){
		swal({title:"쪽지를 보내실 카페를<br>선택해주세요.",
			  type:"warning",
			  html: true})
		return $('select[name=cafeNo]').focus();
	}
	var param = {
		"sendMember": 'cstmr',// cstmr/cafe
		"cafeMemberNo": $('select[name=cafeNo]').val(),
		"customMemberNo": userNo,
		"contents": $('.chat-input').val()
    };
	
    $.post(serverRoot + '/../message/insertMsg.json', param, function(ajaxResult) {
        if (ajaxResult.status != "success") {
          alert(ajaxResult.data);
          return;
        }
        swal({title:"전송 완료!",
        	  type:"success"});
        
        $('.chat-input').val("");
        $('.writeWrap').fadeOut(200);
        getMsgSent();
    }, 'json');
});
>>>>>>> b3f3e5f2eec314423bdb228f01f69bbc7732d7ee
