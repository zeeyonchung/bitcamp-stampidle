try {
  var customMemberNo = location.href.split('?')[1].split('=')[1];
} catch (error) {
	var customMemberNo = -1;
}

/*
if (eventNo > 0) {
	prepareViewForm();
} else {
	prepareNewForm();
}
*/


$.getJSON(serverRoot + '/customCard/stampDetail.json?customMemberNo=' + customMemberNo, function(ajaxResult) {
  var status = ajaxResult.status;
  
  if (status != "success") {
	  alert(ajaxResult.data);
	  return;
  }
  
  var customCard = ajaxResult.data;
  
  $('#custom-photo').attr('src', '../../upload/' + customCard.customPhoto);
  $('#name').text(customCard.customName);
  $('#phone-number').text(customCard.customTel);
  $('.eventdetail #evnet-img').attr('src', '../../upload/' + customCard.eventPhotoPath);
  $('.eventdetail .table3 .tabletd4').text(customCard.eventView);
  $('.eventdetail .contents').text(customCard.eventContents);
});

