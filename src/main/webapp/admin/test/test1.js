var map;
var marker;
var infowindow;
var loginMember;
var filename;


function initMap() {
  var currentLatLng;
  map = new google.maps.Map(document.getElementById('CorporaterMap'), {
    center: {lat: 37.5666805, lng: 126.9784147},
    zoom: 17
  });
  marker = new google.maps.Marker({
    //position: {lat: 37.5666805, lng: 126.9784147},
    map: map,
    draggable:true,
    title:"업체의 위치로 드래그 해 주세요"
  });
  infowindow = new google.maps.InfoWindow({
    content: ''
  });
  google.maps.event.addListener(map, 'click', function(mouseEvent) {
	  moveMarker(mouseEvent.latLng);
  });
  
  marker.addListener('mouseup', function(mouseEvent) {
	  moveMarker(mouseEvent.latLng);
  });
}

var moveMarker = function(latlng) {

	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		latLng: latlng
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0].geometry) {
				var address = results[0].formatted_address;
				window.marker.setPosition(latlng)
				infowindow.setContent(address)
				infowindow.open(map, marker);

				var opt = $("<option value='" + latlng.toString() + "'>" + address + "</option>");
				$("#markerList").append(opt);
			}
		} else if (status == google.maps.GeocoderStatus.ERROR) {
			alert("통신중 에러발생！");
		} else if (status == google.maps.GeocoderStatus.INVALID_REQUEST) {
			alert("요청에 문제발생！geocode()에 전달하는GeocoderRequest확인요！");
		} else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
			alert("단시간에 쿼리 과다송신！");
		} else if (status == google.maps.GeocoderStatus.REQUEST_DENIED) {
			alert("이 페이지에는 지오코더 이용 불가! 왜??");
		} else if (status == google.maps.GeocoderStatus.UNKNOWN_ERROR) {
			alert("서버에 문제가 발생한거 같아요. 다시 한번 해보세요.");
		} else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
			alert("존재하지 않습니다.");
		} else {
			alert("??");
		}
	});
}

var initMarker = function(latlngStr) {
	var point = latlngStr.substring(1,latlngStr.length-1).split(',');
	moveMarker(new google.maps.LatLng({lat:Number(point[0]), lng:Number(point[1])}));
}


$('#address-search-btn').click(function() { 
  new daum.Postcode({
    oncomplete: function(data) {
      var fullAddr = ''; // 최종 주소 변수
      var extraAddr = ''; // 조합형 주소 변수
      
      // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
        fullAddr = data.roadAddress;

      } else { // 사용자가 지번 주소를 선택했을 경우(J)
        fullAddr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
      if(data.userSelectedType === 'R'){
        //법정동명이 있을 경우 추가한다.
        if(data.bname !== ''){
          extraAddr += data.bname;
        }
        // 건물명이 있을 경우 추가한다.
        if(data.buildingName !== ''){
          extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }
        // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
        fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
      }
      
      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('corporate-postcode').value = data.zonecode; //5자리 새우편번호 사용
      document.getElementById('corporate-address-base').value = fullAddr;

      // 커서를 상세주소 필드로 이동한다.
      //document.getElementById('corporate-address2').focus();
      
      // 검색 결과 나온 주소값으로 지도 포커스 변경
      $.get('https://maps.googleapis.com/maps/api/geocode/json?address='+fullAddr+'&key=AIzaSyDKE_snzHBVyEaw45535A_u58SEV1iKQBA', function(result){
        map.panTo(result.results['0'].geometry.location);
        marker.setPosition(result.results['0'].geometry.location);
        
        if(data.buildingName !== ''){
          infowindow.setContent(data.buildingName);
        } else {
          infowindow.setContent(data.address);
        }
        infowindow.open(map, marker);
      });
      
      
    }
  }).open();
});

$("#infoform-folder").click(function(){
	if($('#infoform-btn').attr('aria-expanded') == 'true') {
		/*console.log('열렸음');
		console.log($('#infoform-btn').attr('aria-expanded'));*/
		//열린 상태 -> 닫힌 상태이면
		//화살표 아이콘을 아래로 변경
		$('#infoform-icon').attr('class','glyphicon glyphicon-chevron-down');
	} else {
		/*console.log('접혔음');
		console.log($('#infoform-btn').attr('aria-expanded'));*/
		//닫힌 상태 -> 열린 상태이면
		//화살표 아이콘을 위로 변경
		$('#infoform-icon').attr('class','glyphicon glyphicon-chevron-up');
	}
	/*$('#infoform-icon')*/
});

$("#add-telform").click(function() {
	
	if($("#tel-group").children().length > 4) {
		swal('주의','전화번호는 5개까지만 추가 가능합니다.','warning');
		return;
	}
	$("<div>")
		.html("<input class='form-control short' name='corporateTel' placeholder='업체 전화번호를 입력해 주세요' style='margin-left:123px;'>")
		.appendTo("#tel-group");
});

$("#remove-telform").click(function() {
	if($("#tel-group").children().length <= 1) {
		//$().alert('close');
		swal('주의','최소 한개의 업체 전화번호는 입력해야 합니다.','warning');
		return;
	}
	$("#tel-group").children().last().remove();
});

$("#submit-btn").click(function() {
	//console.log(CKEDITOR.instances.infoEditor.getData());
	/*console.log($("input[name=corporateTel]").map(function() {
		   return this.value;
	}).get());*/
	/*console.log(JSON.stringify($("input[name=corporateTel]").map(function() {
	   return this.value;
	}).get()));*/
	/*console.log($("input[name=corporateTel]").val());*/
	var param = {
			memberNo        : loginMember.memberNo,
			corporateName   : $("#corporate-name").val(),
			postNumber      : $("#corporate-postcode").val(),
			baseAddress     : $("#corporate-address-base").val(),
			detailAddress   : $("#corporate-address-detail").val(),
			telList         : jqueryArrayToJson($("input[name=corporateTel]")),
			additionalInfo  : separateImg($('#infoEditor').summernote('code')),
			mapLocation     : marker.getPosition().toString(),
			
			corporateRegistrationNumber : $('#corporateRegistrationNumber').val(),
			corporateConfirm            : $('#corporateConfirm').val(),
			corporateType               : $('#corporateType').val(),
			detail                      : $('#detail').val(),
			notice                      : $('#notice').val()
	}
	$.post('update.json', param, function(ajaxResult) {
		if (ajaxResult.status != "success") {
			alert(ajaxResult.data);
			return;
		}
		swal('등록 성공',ajaxResult.data,'success');
	}, 'json');
});

$('#header_sub_a_home').click(function(event) {
	event.preventDefault()
	//location.href='.html';
});

$('#header_sub_a_mgrpage').click(function(event) {
	event.preventDefault()
	location.href='basicinfo.html';
});

$('#header_sub_a_mgrbaseinfo').click(function(event) {
	event.preventDefault()
	location.href='basicinfo.html';
});

/*CKEDITOR.replace( 'infoEditor', {
	width: "600px",
	height: "350px",
	resize_enabled: false,
	filebrowserUploadUrl: '../ckeditor/upload.php',
	
	toolbar : [
			[ 'Source', '-' ],
			[ 'Cut', 'Copy', 'Paste', 'PasteText', '-', 'Undo', 'Redo' ],
			[ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'],
			[ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ],
			'/',
			[ 'Styles', 'Format', 'Font', 'FontSize' ],
			[ 'TextColor', 'BGColor' ],
			[ 'Image', 'Table' , 'SpecialChar' , 'Link']
			//, 'Unlink'
		]
});*/

$('#infoEditor').summernote({
	height: 450,                 // set editor height
	minHeight: null,             // set minimum height of editor
	maxHeight: null,             // set maximum height of editor
	focus: true,                  // set focus to editable area after initializing summernote
	lang: 'ko-KR',
	maximumImageFileSize: 2097152, //2MB
	disableDragAndDrop: true,
	toolbar: [
		// [groupName, [list of button]]
		['style', ['bold', 'italic', 'underline', 'clear']],
		['fontsize', ['fontname', 'fontsize']],
		['color', ['color']],
		['insert', ['picture', 'link', 'video']],
		['font', ['strikethrough', 'superscript', 'subscript']],
		['misc', ['undo', 'redo']],
		['table', ['table']],
		['para', ['ul', 'ol', 'paragraph']],
		['height', ['height']],
		['detail', ['codeview']]
		]
	/*callbacks : {
      onImageUpload: function(image) {
        uploadImage(image[0]);
      }
    }*/
});

$(function() {
	$.getJSON('../auth/loginUser.json', function(ajaxResult) {
		if (ajaxResult.status != 'success') {
			alert('로그인 하세요! 다음에 인터셉트로 걸러내게끔 변경\n임시로 로그인페이지로 이동');
			location.href=clientRoot+'/auth/testlogin.html';
			return;
		}
		loginMember = ajaxResult.data;
		
		initInfo();
	});
});

var initInfo = function() {
	$.getJSON('../corporate/detail.json?memberNo='+loginMember.memberNo, function(ajaxResult) {
		if (ajaxResult.status != 'success') {
			alert('업체가 아닙니다.');
			return;
		}
		
		var corporate = ajaxResult.data;
		//console.log(corporate);
		
		$('#corporate-name').val(corporate.corporateName);
		$('#corporate-postcode').val(corporate.postNumber);
		$('#corporate-address-base').val(corporate.baseAddress);
		$('#corporate-address-detail').val(corporate.detailAddress);
		
		$('#infoEditor').summernote('code', corporate.additionalInfo)
		if (corporate.mapLocation != null) {
			if (corporate.mapLocation.length != 0) {
				initMarker(corporate.mapLocation);
			}
		}
		//수정 불가능한 정보들(숨겨진 정보)
		$('#corporateRegistrationNumber').val(corporate.corporateRegistrationNumber);
		$('#corporateConfirm').val(corporate.corporateConfirm);
		$('#corporateType').val(corporate.corporateType);
		$('#detail').val(corporate.detail);
		$('#notice').val(corporate.notice);
		
		var list = corporate.telList
		/*console.log(list);*/
		
		for (var i = 0; i < list.length; i++) {
			if (i == 0) {
				$('input[name=corporateTel]').val(list[i].corporateTel)
			} else {
				$("<div>")
				.html("<input class='form-control short' name='corporateTel' placeholder='업체 전화번호를 입력해 주세요'" +
						"value='"+list[i].corporateTel+"' style='margin-left:123px;'>")
				.appendTo("#tel-group")
			}
		}
	});
}


/*사이드바 링크*/
$('#sb-basicinfo').click(function(){
	location.href='basicinfo.html';
})
$('#sb-itemManage').click(function(){
	location.href='itemManage.html';
})
$('#sb-bookingManage').click(function(){
	location.href='bookingManage.html';
})
$('#sb-infopicture').click(function(){
	location.href='infopicture.html';
})
$('#sb-notice').click(function(){
	location.href='notice.html';
})
$('#sb-pricetime').click(function(){
	location.href='pricetime.html';
})