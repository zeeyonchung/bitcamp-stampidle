var cafeMemberNo = 0;

try {
	cafeMemberNo = location.href.split('?')[1].split('=')[1];
} catch (error) {
	cafeMemberNo = -1;
}

if (cafeMemberNo > 0) {
	prepareViewForm();
} else {
	prepareNewForm();
}







/******************  Add page setting :prepareNewForm *****************/
function prepareNewForm() {
	$('#btn-next').addClass('btn-add');
	$('.add').show();
	$('.edit').hide();

		
	$('.btn-add').click(function(event) {
		
		/* 카페정보 정보 */
		var cafeinfo = {
				cafeMemberNo: cafeMemberNo,
				cafeName: $('#cafeName').val(),
				intro: $('#introcafe').val(),
				cafeTel: $('#cafeTel1').val() + "-" + $('.cafeTel2').val() + "-" + $('.cafeTel3').val(),
				postCode: $('.postNo').val(),
				address: $('.addr').val(),
				detailAddress: $('.daddr').val(),
				chairNo: parseInt($('#chairNo').val()),
				logPath: $('#photo-path').val()
		};
		
		
		/* 영업시간 */
		var workTimeList = [];
		var days = $('select[id=day]')
		var start1 = $('select[id=startTime1]');
		var start2 = $('select[id=startTime2]');
		var end1 = $('select[id=endTime1]');
		var end2 = $('select[id=endTime2]');
		for (var i=0; i < days.length; i++) {
			var workTime = {
					cafeMemberNo: cafeMemberNo,
					day: days.eq(i).val(),
					startTime: start1.eq(i).val() + ":" + start2.eq(i).val(),
					endTime: end1.eq(i).val() + ":" + end2.eq(i).val()
			}
			workTimeList.push(workTime);
		};
		
		
		/* 카페종류 태그 */
		var tags = [];
		var checked = $(".tag input[type='checkbox']:checked");
		for(var i=0; i<checked.length; i++){
			if (checked.eq(i).attr('id') != 'self')
				tags += checked.eq(i).val() + " ";
		};
		if($('.inperson').val() != null) {
			tags += $('.inperson').val()
		};
		var cafeTag = {
				cafeMemberNo: cafeMemberNo,
				tagName: tags
		}
		
		
		/* 매장사진 */
		var cafePhotoList = [];
		var cafefilepath = $('.cafephotoPath')
		for (var i=0; i < cafefilepath.length; i++) {
			var cafe_photo = {
					cafeMemberNo: cafeMemberNo,
					path: cafefilepath.eq(i).val()
			}
			cafePhotoList.push(cafe_photo);
		} 
		
		
		/*  대표메뉴 */
		var cafeMenuList = [];
		var menufilepath = $('.menuphotoPath')
		var menuNm = $('.mnNm')
		var menuPrice = $('.mnPrice')
		console.log($('.menuphotoPath').length);
		for (var i=0; i < menufilepath.length; i++) {
			var cafe_menu = {
					cafeMemberNo: cafeMemberNo,
					menuName: menuNm.eq(i).val(),
					price: menuPrice.eq(i).val(),
					menuPath: menufilepath.eq(i).val()
			}
			cafeMenuList.push(cafe_menu);
		}
		
		
		var param = {cafe: cafeinfo,
					cafeTimeList: workTimeList,
					tag: cafeTag,
					cafePhotoList: cafePhotoList,
					menuList: cafeMenuList}
		
		
		console.log(param);
		$.ajaxSettings.traditional = true;
		
		$.ajax({
			  type: 'POST',
			  url: serverRoot + '/cafe/add.json',
			  data: JSON.stringify(param),
			  dataType: "json",
			  accepts: 'application/json',
			  contentType: "application/json; charset=UTF-8",
			  error: function(e) {
				  console.log(e);
			  },
			  success: function(msg) {
				  swal({
						title:"카페정보 등록이 완료되었습니다.",
						closeOnConfirm: true,
						type: "success"},
						function(isConfirm) {
							location.href = clientRoot + "/cardadd/cardadd.html";
					});
			  }
			});
		
		
		
		
		
	}); // click()
}

/******************  //Add page setting :prepareNewForm *****************/








/******************  Edit page setting :prepareViewForm *****************/
function prepareViewForm() {
	$('#btn-next').addClass('btn-update');
	$('.edit').show();
	$('.add').hide();
	
	
		$.getJSON(serverRoot + '/cafe/detail.json?cafeMemberNo=' + cafeMemberNo, function(ajaxResult) {
			var cafe = ajaxResult.data;
			
		$.getJSON(serverRoot + '/cafeTime/detail.json?cafeMemberNo=' + cafeMemberNo, function(ajaxResult) {
			var cafeTime = ajaxResult.data;
		
		$.getJSON(serverRoot + '/tag/detail.json?cafeMemberNo=' + cafeMemberNo, function(ajaxResult) {
			var tag = ajaxResult.data;
			
		$.getJSON(serverRoot + '/cafePhoto/detail.json?cafeMemberNo=' + cafeMemberNo, function(ajaxResult) {
			var cafePhoto = ajaxResult.data;
			
		$.getJSON(serverRoot + '/menu/detail.json?cafeMemberNo=' + cafeMemberNo, function(ajaxResult) {
				$('#cafeName').val(cafe.cafeName);
				var tag_arr = tag.tagName.split(" ");
				var tags = $('.tag .checkbox label input[type=checkbox]');
				for (var i in tag_arr) {
					for (var j in tags) {
						if (tag_arr[i] == tags.eq(j).val()) {
							tags.eq(j).attr('checked','checked');
						} else {
							$('#self').attr('checked','checked');
							$('.tag .inperson').attr('value', tag_arr[i]);
							if (tag_arr[i] == "")
								$('#self').removeAttr('checked');
						}
					}
				}
				
				$('#introcafe').text(cafe.intro);
				var cafeTel_arr = cafe.cafeTel.split("-");
				var tel1 = $('#cafeTel1 option');
				for (var i in tel1) {
					if (cafeTel_arr[0] == tel1.eq(i).text()) {
						tel1.eq(i).attr('selected','selected');
					}
				}
				$('.cafeTel2').val(cafeTel_arr[1]);
				$('.cafeTel3').val(cafeTel_arr[2]);
				$('.postNo').val(cafe.postCode);
				$('.addr').val(cafe.address);
				$('.daddr').val(cafe.detailAddress);
				$('#chairNo').val(cafe.chairNo);
				$('#photo-img').attr('src', '../../upload/' + cafe.logPath);
			
		});
		});
		});
		});
		});
	

	$('.btn-update').click(function() {
		var cafeMemberNo = $('.cafeNm').attr("data-no");
		
		/* 카페정보 정보*/
		var cafeinfo = {
				cafeMemberNo: cafeMemberNo,
				cafeName: $('#cafeName').val(),
				intro: $('#introcafe').val(),
				cafeTel: $('#cafeTel1').val() + "-" + $('.cafeTel2').val() + "-" + $('.cafeTel3').val(),
				postCode: $('.postNo').val(),
				address: $('.addr').val(),
				detailAddress: $('.daddr').val(),
				chairNo: parseInt($('#chairNo').val()),
				logPath: $('#photo-path').val()
		};
		console.log(cafeinfo);
		$.post(serverRoot + '/cafe/update.json', cafeinfo, function(ajaxResult) {
			if (ajaxResult.status != "success") {
				alert(ajaxResult.data);
				return;
			}
			alert('cafe업데이트등록 완료되었습니다.');
		}, 'json'); 

		/* 영업시간 */
		var days = $('select[id=day]')
		var start1 = $('select[id=startTime1]');
		var start2 = $('select[id=startTime2]');
		var end1 = $('select[id=endTime1]');
		var end2 = $('select[id=endTime2]');
		for (var i=0; i < days.length; i++) {
			var workTime = {
					cafeMemberNo: cafeMemberNo,
					day: days.eq(i).val(),
					startTime: start1.eq(i).val() + ":" + start2.eq(i).val(),
					endTime: end1.eq(i).val() + ":" + end2.eq(i).val()
			}
			console.log(workTime);
			$.post(serverRoot + '/cafeTime/update.json', workTime, function(ajaxResult) {
				if (ajaxResult.status != "success") {
					alert(ajaxResult.data);
					return;
				}
				alert('시간업데이트 완료되었습니다.');
			}, 'json');
		}; 
		
		
		/* 카페종류 태그 */
		var tags = [];
		var checked = $(".tag input[type='checkbox']:checked");
		for(var i=0; i<checked.length; i++){
			if (checked.eq(i).attr('id') != 'self')
				tags += checked.eq(i).val() + " ";
		};
		if($('.inperson').val() != null) {
			tags += $('.inperson').val()
		};
		var cafeTag = {
				cafeMemberNo: cafeMemberNo,
				tagName: tags
		}
		console.log(cafeTag);
		$.post(serverRoot + '/tag/update.json', cafeTag, function(ajaxResult) {
			if (ajaxResult.status != "success") {
				alert(ajaxResult.data);
				return;
			}
			alert('태그업데이트 완료되었습니다.');
		}, 'json');

		
		/* 매장사진 */
		var cafefilepath = $('.cafephotoPath')
		console.log($('.cafephotoPath').length);
		for (var i=0; i < cafefilepath.length; i++) {
			var cafe_photo = {
					cafeMemberNo: cafeMemberNo,
					path: cafefilepath.eq(i).val()
			}
			console.log(cafe_photo);
			$.post(serverRoot + '/cafePhoto/update.json', cafe_photo, function(ajaxResult) {
				if (ajaxResult.status != "success") {
					alert(ajaxResult.data);
					return;
				}
				alert('매장사진업데이트 완료되었습니다.');
			}, 'json');
		}  
		
		
		/*  대표메뉴 */
		var menufilepath = $('.menuphotoPath')
		var menuNm = $('.mnNm')
		var menuPrice = $('.mnPrice')
		console.log($('.menuphotoPath').length);
		for (var i=0; i < menufilepath.length; i++) {
			var cafe_menu = {
					cafeMemberNo: cafeMemberNo,
					menuName: menuNm.eq(i).val(),
					price: menuPrice.eq(i).val(),
					menuPath: menufilepath.eq(i).val()
			}
			$.post(serverRoot + '/menu/update.json', cafe_menu, function(ajaxResult) {
				if (ajaxResult.status != "success") {
					alert(ajaxResult.data);
					return;
				}
				alert('메뉴업데이트 완료되었습니다.');
			}, 'json');
		}
		
	}); // click()

}
/******************  //Edit page setting :prepareViewForm *****************/










/* 영업시간 추가기능 */
function add_item(){
     // pre_set 에 있는 내용을 읽어와서 처리..
     var div = document.createElement('div');
     div.innerHTML = document.getElementById('pre_set').innerHTML;
     document.getElementById('field').appendChild(div);
}
function remove_item(obj){
     // obj.parentNode 를 이용하여 삭제
     document.getElementById('field').removeChild(obj.parentNode);
}
/* //영업시간 추가기능 */



/* 로고 업로드 */
$('#photo').fileupload({
    url: serverRoot + '/../common/fileupload.json', // 서버에 요청할 URL
    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
    disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
    previewMaxWidth: 800,   // 미리보기 이미지 너비
    previewMaxHeight: 800,  // 미리보기 이미지 높이 
    previewCrop: false,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
    done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    	console.log('done()...');
    	console.log(data.result);
        $('#photo-path').val(data.result.data[0]);
    }, 
    processalways: function(e, data) {
        console.log('fileuploadprocessalways()...', data.files.length, data.index);
        var img = $('#photo-img');
        if (data.index == 0) {
        	console.log('미리보기 처리...');
	        var canvas = data.files[0].preview;
	        var dataURL = canvas.toDataURL();
	        img.attr('src', dataURL).css('width', '100%');
	        img.attr('src', dataURL).css('height', '100%');
        }
    } 
});



/* 매장사진 업로드 + 추가기능 */
$('#cafe-photo').fileupload({
    url: serverRoot + '/../common/fileupload.json', // 서버에 요청할 URL
    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
    disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
    previewMaxWidth: 800,   // 미리보기 이미지 너비
    previewMaxHeight: 800,  // 미리보기 이미지 높이 
    previewCrop: false,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
    done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    	console.log('done()...');
    	console.log(data.result);
        $('#cafe-photo-path').val(data.result.data[0]);
    }, 
    processalways: function(e, data) {
        console.log('fileuploadprocessalways()...', data.files.length, data.index);
        var img = $('#cafe-photo-img');
        if (data.index == 0) {
        	console.log('미리보기 처리...');
	        var canvas = data.files[0].preview;
	        var dataURL = canvas.toDataURL();
	        img.attr('src', dataURL).css('width', '100%');
	        img.attr('src', dataURL).css('height', '100%');
        }
    } 
});

 function add_cafeImg(){
     var div = $('<div>');
     var setHtml = $('#cafeImg_set').html();
     div.html(setHtml);
     $('#field-cafeimg').append(div);
     $( "#field-cafeimg > div:last-child .imgbox img" ).attr("src", " ");
     $( "#field-cafeimg > div:last-child .imgbox img" ).attr("id", "cafe-photo-img" + $( "#field-cafeimg > div").length);
     $( "#field-cafeimg > div:last-child .imgbox input" ).attr("id", "cf-file" + $( "#field-cafeimg > div").length);
     $( "#field-cafeimg > div:last-child .imgbox input" ).attr("name", "cf-file" + $( "#field-cafeimg > div").length);
     $( "#field-cafeimg > div:last-child .fileinput-button input" ).attr("id", "cafe-photo" + $( "#field-cafeimg > div").length);
     $( "#field-cafeimg > div:last-child .cafephotoPath" ).attr("id", "cafe-photo-path" + $( "#field-cafeimg > div").length);
     
     $('#cafe-photo' + $( "#field-cafeimg > div").length).fileupload({
    	    url: serverRoot + '/../common/fileupload.json', // 서버에 요청할 URL
    	    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
    	    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
    	    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
    	    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
    	    disableImageResize: /Android(?!.*Chrome)|Opera/
    	        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
    	    previewMaxWidth: 800,   // 미리보기 이미지 너비
    	    previewMaxHeight: 800,  // 미리보기 이미지 높이 
    	    previewCrop: false,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
    	    done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    	        console.log('done()...');
    	        console.log(data.result);
    	        $('#cafe-photo-path' + $( "#field-cafeimg > div").length).val(data.result.data[0]);
    	    }, 
    	    processalways: function(e, data) {
    	        console.log('fileuploadprocessalways()...', data.files.length, data.index);
    	        var img = $('#cafe-photo-img' + $( "#field-cafeimg > div").length);
    	        if (data.index == 0) {
    	            console.log('미리보기 처리...');
    	            var canvas = data.files[0].preview;
    	            var dataURL = canvas.toDataURL();
    	            img.attr('src', dataURL).css('width', '100%');
    	            img.attr('src', dataURL).css('height', '100%');
    	        }
    	    } 
    	});
}
function remove_cafeimg(obj){
	document.getElementById('field-cafeimg').removeChild(obj.parentNode);
}
/*//매장사진 업로드 + 추가기능 */



/* 메뉴 업로드 + 추가기능 */
$('#menu-photo').fileupload({
    url: serverRoot + '/../common/fileupload.json', // 서버에 요청할 URL
    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
    disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
    previewMaxWidth: 800,   // 미리보기 이미지 너비
    previewMaxHeight: 800,  // 미리보기 이미지 높이 
    previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
    done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    	console.log('done()...');
    	console.log(data.result);
        $('#menu-photo-path').val(data.result.data[0]);
    }, 
    processalways: function(e, data) {
        console.log('fileuploadprocessalways()...', data.files.length, data.index);
        var img = $('#menu-photo-img');
        if (data.index == 0) {
        	console.log('미리보기 처리...');
	        var canvas = data.files[0].preview;
	        var dataURL = canvas.toDataURL();
	        img.attr('src', dataURL).css('width', '100%');
	        img.attr('src', dataURL).css('height', '100%');
        }
    } 
});

function add_menu(){
    var div = $('<div>');
    var setHtml = $('#menu_set').html();
    div.html(setHtml);
    $('#field-menu').append(div);
    $( "#field-menu > div:last-child .imgbox img" ).attr("src", " ");
    $( "#field-menu > div:last-child .imgbox img" ).attr("id", "menu-photo-img" + $( "#field-menu > div").length);
    $( "#field-menu > div:last-child .imgbox input" ).attr("id", "mn-file" + $( "#field-menu > div").length);
    $( "#field-menu > div:last-child .imgbox input" ).attr("name", "mn-file" + $( "#field-menu > div").length);
    $( "#field-menu > div:last-child .fileinput-button input" ).attr("id", "menu-photo" + $( "#field-menu > div").length);
    $( "#field-menu > div:last-child .menuphotoPath" ).attr("id", "menu-photo-path" + $( "#field-menu > div").length);
    
    $('#menu-photo' + $( "#field-menu > div").length).fileupload({
   	    url: serverRoot + '/../common/fileupload.json', // 서버에 요청할 URL
   	    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
   	    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
   	    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
   	    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
   	    disableImageResize: /Android(?!.*Chrome)|Opera/
   	        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
   	    previewMaxWidth: 800,   // 미리보기 이미지 너비
   	    previewMaxHeight: 800,  // 미리보기 이미지 높이 
   	    previewCrop: true,      // 미리보기  nv    이미지를 출력할 때 원본에서 지정된 크기로 자르기
   	    done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
   	        console.log('done()...');
   	        console.log(data.result);
   	        $('#menu-photo-path' + $( "#field-menu > div").length).val(data.result.data[0]);
   	    }, 
   	    processalways: function(e, data) {
   	        console.log('fileuploadprocessalways()...', data.files.length, data.index);
   	        var img = $('#menu-photo-img' + $( "#field-menu > div").length);
   	        if (data.index == 0) {
   	            console.log('미리보기 처리...');
   	            var canvas = data.files[0].preview;
   	            var dataURL = canvas.toDataURL();
   	            img.attr('src', dataURL).css('width', '100%');
   	            img.attr('src', dataURL).css('height', '100%');
   	        }
   	    } 
   	});
}
function remove_menu(obj){
	document.getElementById('field-menu').removeChild(obj.parentNode);
}
/*//메뉴 업로드 + 추가기능 */




$('.mn-info.card').click(function(e) {
	e.preventDefault();
	location.href = "/admin/cardadd/cardadd.html";
})
