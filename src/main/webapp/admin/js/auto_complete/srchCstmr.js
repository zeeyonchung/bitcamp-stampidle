$.getJSON(serverRoot + '/customMember/srchList.json', function(ajaxResult) {
  var status = ajaxResult.status;
  
  if (status != "success")
	  return;
  
  var srchList = ajaxResult.data;

var availableTags = [
                        '가나',
                        '가나쵸콜렛',
                        '가오리',
                        '가상현실',
                        '북마크',
                        '북까페',
                        '북촌한옥마을',
                        '010-3238-0101',
                        '010-3338-0222'
                    ];

	$(document).ready(function() {
	    $("#searchbox").autocomplete(availableTags,{ 
	        matchContains: true,
	        selectFirst: false
	    });
	});
});



