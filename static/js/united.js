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
    center: mapCenter,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#181818"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2c2c2c"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#373737"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#4e4e4e"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
    ]
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
