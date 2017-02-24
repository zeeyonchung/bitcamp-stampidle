$('.addcstmerPop .add-btn').click(function() {
    var param = {
		name: $('#custom-name').val(),
		tel: $('#custom-tel').val()
    };
    console.log(param);
    
    
    $.post(serverRoot + '/customMember/add.json', param, function(ajaxResult) {
    	if (ajaxResult.status != "success") {
    		alert(ajaxResult.data);
    		return;
    	}
    	location.href = 'main.html';
    	alert('등록이 완료되었습니다.');
    }, 'json');
    
}); // click()






