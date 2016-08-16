//---------- Flickr + Google Maps API ----------
var map;

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(31.4694142, 1.4826113),
        zoom: 3
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    setMarkers(map, markerArray);
    infowindow = new google.maps.InfoWindow({
        content: "loading..."
    });
}

var markerArray = [];
var dataObject;

var loadHandler = function() {
    console.log("Data Collected");
    var dataObject = JSON.parse(xhr.responseText);
    for (var h = 0; h < dataObject.photoset.photo.length; h++) {
        //if (dataObject.photoset.photo[h].latitude != 0) {
        markerArray[h] = new Array();
        markerArray[h][0] = dataObject.photoset.photo[h].title; //Set Title
        markerArray[h][1] = dataObject.photoset.photo[h].latitude; //Set Latitude
        markerArray[h][2] = dataObject.photoset.photo[h].longitude; //Set Longitude
        markerArray[h][3] = h; //Set Z-Index
        markerArray[h][4] = dataObject.photoset.photo[h].title + '<br /><img src="' + dataObject.photoset.photo[h].url_s + '" />'; //Set InfoWindow
        //}
    }
}

// ---- Flickr API ----
var xhr = new XMLHttpRequest();
xhr.addEventListener("load", loadHandler);
xhr.open('get', 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=API_KEY&photoset_id=72157618530173650&extras=url_s%2Cgeo&format=json&nojsoncallback=1', false);
xhr.send();

function setMarkers(map, markers) {
    console.log("Setting Markers");
    for (var i = 0; i < markers.length; i++) {
        var markerArray = markers[i];
        var markerlatLng = new google.maps.LatLng(markerArray[1], markerArray[2]);
        var marker = new google.maps.Marker({
            position: markerlatLng,
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            title: markerArray[0],
            zIndex: markerArray[3],
            html: markerArray[4]
        });
        var contentString = "Content";

        google.maps.event.addListener(marker, "click", function() {
            infowindow.setContent(this.html);
            infowindow.open(map, this);
        });
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
