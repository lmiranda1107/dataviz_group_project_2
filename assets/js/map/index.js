var API_KEY = "pk.eyJ1IjoiZ2lzc2VsNzE4MSIsImEiOiJjanZlY2J6NDgwMGU3NDRwOHJhdG12bmlkIn0.gThHTC2EDFyHv5pTAr2ewQ";

$().ready(function(){
	// Creating our initial map object
	// We set the longitude, latitude, and the starting zoom level
	// This gets inserted into the div with an id of 'map'
	var myMap = L.map("map", {
		center: [39.8283, -98.5795],
		zoom:5
	});

	// Adding a tile layer (the background map image) to our map
	// We use the addTo method to add objects to our map
	L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		maxZoom: 18,
		id: "mapbox.streets",
		accessToken: API_KEY
	}).addTo(myMap);

	// load json data
	$.get(ORGAN_DATA_FILE, function(records) {
		records.forEach(function(record) {
			L.marker([
				// LatLng
				record.geocoding_primary_y_coordinate,
				record.geocoding__primary_x_coordinate
			]).addTo(myMap);
		});
	});
});