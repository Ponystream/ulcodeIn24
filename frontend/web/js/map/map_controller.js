ulcodeIn24.controller('MapController', ['$scope', '$http', function($scope, $http){

    var map = L.map('map', {
        maxZoom: 17
    });

    L.tileLayer('http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart&zoom={z}&x={x}&y={y}', {
        attribution: '&copy; <a href="http://kartverket.no/">Kartverket</a>'
    }).addTo(map);

    var photoLayer = L.photo.cluster({ spiderfyDistanceMultiplier: 1.2 }).on('click', function (evt) {
        evt.layer.bindPopup(L.Util.template('<img src="{url}"/></a><p>{caption}</p>', evt.layer.photo), {
            className: 'leaflet-popup-photo',
            minWidth: 400
        }).openPopup();
    });

    reqwest({
        url: 'http://kulturnett2.delving.org/api/search?query=*%3A*&format=jsonp&rows=100&pt=59.936%2C10.76&d=1&qf=abm_contentProvider_text%3ADigitaltMuseum',
        type: 'jsonp',
        success: function (data) {
            var photos = [];
            data = data.result.items;

            for (var i = 0; i < data.length; i++) {
                var photo = data[i].item.fields;
                if (photo.abm_latLong) {
                    var pos = photo.abm_latLong[0].split(',');
                    photos.push({
                        lat: pos[0],
                        lng: pos[1],
                        url: photo.delving_thumbnail[0],
                        caption: (photo.delving_description ? photo.delving_description[0] : '') + ' - Kilde: <a href="' + photo.delving_landingPage + '">' + photo.delving_collection + '</a>',
                        thumbnail: photo.delving_thumbnail[0]
                    });
                }
            }

            photoLayer.add(photos).addTo(map);
            map.fitBounds(photoLayer.getBounds());
        }
    });

}]);