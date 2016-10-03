var map;
var mapInfoWindows = [];

function isMobile() {
  'use strict';
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    return true;
  }
  return false;
}

function navigate(id) {
  'use strict';
  $('html, body').animate({
    scrollTop: $("#" + id).offset().top
  }, 300);
}

function closeAll(){
  'use strict';
  $.each(mapInfoWindows, function(key, val) {
    (mapInfoWindows[key]).close();
  });
}

function getRandom(min, max) {
  'use strict';
  return Math.random() * (max - min) + min;
}

function randomLocation() {
  'use strict';
  var x = 37.784085;
  var y = -122.5072251;

  var a = 37.7380389;
  var b = -122.3960015;
  return new google.maps.LatLng(getRandom(a, x), getRandom(y, b));
}

function populateMap(vehicles) {
  'use strict';

  $.each(vehicles, function(key, val) {
    var captionText = val.caption;
    var photoURL = val.url;
    var location = val.location ? new google.maps.LatLng(val.location.latitude, val.location.longitude) : randomLocation();
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
      content: '<div><img class="map-item-image" src="' + photoURL + '"><div class="map-item-caption">' + captionText + '</div></div>'
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
    zoom: 10,
    scrollwheel: false,
    zoomControl: false,
    streetViewControl: false,
    scaleControl: false,
    rotateControl: false,
    panControl: false,
    overviewMapControl: false,
    mapTypeControl: false,
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
