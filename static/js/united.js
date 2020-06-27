var map;
var mapInfoWindows = [];

function isMobile() {
  'use strict';
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    return true;
  }
  return false;
}

function closeAll(){
  'use strict';
  $.each(mapInfoWindows, function(key, val) {
    (mapInfoWindows[key]).close();
  });
}

function populateMap(vehicles) {
  'use strict';

  $.each(vehicles, function(key, val) {
    var captionText = val.caption;
    var photoURL = val.url;
    var location = new google.maps.LatLng(val.location.latitude, val.location.longitude);
    var marker;

    marker = new google.maps.Marker({
      position: location,
      icon: {
        url: '/assets/marker.svg',
        scaledSize: new google.maps.Size(24, 36),

      },
      map: map,
      animation: google.maps.Animation.DROP,
      title: captionText
    });


    var infoWindow = new google.maps.InfoWindow({
      content: '<img onclick=closeAll() class="map-item-image" src="' + photoURL + '">'
    });

    google.maps.event.addListener(marker, 'click', function() {
      closeAll();
      infoWindow.open(map, marker);
    });
    mapInfoWindows.push(infoWindow);
  });
}

function initialize() {
  'use strict';
  var mapCenter = new google.maps.LatLng(37.526319, -122.303085);

  var mapOptions = {
    zoom: 9,
    scrollwheel: false,
    zoomControl: true,
    streetViewControl: false,
    scaleControl: true,
    rotateControl: false,
    panControl: true,
    overviewMapControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: mapCenter
  };

  if (isMobile()) {
    $("#map").css('pointer-events', 'none');
  }

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(mapCenter);
  });

  $.getJSON('./assets/cars.json', function(data) {
    populateMap(data);
  });
}
