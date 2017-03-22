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

var address = "서울특별시+서초구+강남대로53길+8";

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