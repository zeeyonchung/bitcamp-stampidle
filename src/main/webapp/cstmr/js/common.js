$( function() {
	// header.html을 가져와서 붙인다.
	$.get('../header.html', function(result) {
		$('#header_cstmr').html(result);
	});

	$.get('../footer.html', function(result) {
		$('#footer_cstmr').html(result);
	});
	
});





