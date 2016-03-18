ulcodeIn24.controller('MapController', ['$scope', '$http', function($scope, $http){


    var map = L.map('map').setView([48.6880756,6.1384176], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var photoLayer = L.photo.cluster({ spiderfyDistanceMultiplier: 1.2 }).on('click', function (evt) {
        evt.layer.bindPopup(L.Util.template('<img src="{url}"/></a><p>{caption}</p>', evt.layer.photo), {
            className: 'leaflet-popup-photo',
            minWidth: 400
        }).openPopup();
    });
    var photos = [];

    // <img src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location=48.692514,6.183341&heading=-13&fov=90&pitch=1&sensor=false" width="600" height="300" alt="Image Street View" />

    photos.push({
        lat: 48.692514,
        lng: 6.183341,
        url: "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=48.692514,6.183341&heading=-13&fov=90&pitch=1&sensor=false",
        caption: "légende test",
        thumbnail: "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=48.692514,6.183341&heading=-13&fov=90&pitch=1&sensor=false"

    });

    photoLayer.add(photos).addTo(map);
    map.fitBounds(photoLayer.getBounds());

}]);