var map, pointarray, heatmap;

var taxiData = [];

function initialize() {
  var mapOptions = {
    zoom: 6,
    center: new google.maps.LatLng(39.8282, -98.5795),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var pointArray = new google.maps.MVCArray(taxiData);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray
  });

  heatmap.setMap(map);
}
function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

google.maps.event.addDomListener(window, 'load', initialize);