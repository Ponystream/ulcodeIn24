ulcodeIn24.controller('MapController', ['$scope', '$http', 'villeCurrent', function($scope, $http, villeCurrent){

    villeCurrent.ville = "";
    $scope.theme = "";
    $scope.radius=500;
    $scope.markers = [];
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

    photos.push({
        lat: 48.692514,
        lng: 6.183341,
        url: "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=48.692514,6.183341&heading=-13&fov=90&pitch=1&sensor=false",
        caption: "légende test",
        thumbnail: "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=48.692514,6.183341&heading=-13&fov=90&pitch=1&sensor=false"

    });

    var getCoord = function(){
        // on récupère la position de la ville souhaitée
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address="+villeCurrent.ville, false);
        xhr.send();
        var response = JSON.parse(xhr.response);
        if(response.status == "OK"){
            console.log(response);
            villeCurrent.ville = response.results[0].address_components[2].short_name;
            villeCurrent.lat = response.results[0].geometry.location.lat;
            villeCurrent.lon = response.results[0].geometry.location.lng;
            return true;
        }else{
            return false;
        }
    };

    var init = function(){
        // on affiche la carte
        map = L.map('map').setView([villeCurrent.lat, villeCurrent.lon], 12);
        marker = L.marker([villeCurrent.lat, villeCurrent.lon]).addTo(map);
        marker.bindPopup(villeCurrent.ville).openPopup();

        //Ajout d'un layer de carte
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    };

    // on click on submit Place search button
    var submit = document.getElementById("submitPlace");
    submit.onclick = function(){
        villeCurrent.ville = document.getElementById("inputPlace").value;
        if(villeCurrent.ville == ""){
            alert("Veuillez saisir un nom de ville");
        }else{
            if(getCoord()){
                map.remove();
                init();
            }else{
                alert("ville inconnue");
            }
        }
    };

    var addMarkers = function(){
        if($scope.markers != []){
            $scope.markers.forEach(function(mark){
                marker = L.marker([mark.geometry.location.lat, mark.geometry.location.lng]).addTo(map);
                marker.bindPopup(mark.name).openPopup();
            })
        }
    };

    // on click on submit Place search button
    var submitTheme = document.getElementById("submitTheme");
    submitTheme.onclick = function(){
        $scope.theme = document.getElementById("inputTheme").value;
        if($scope.theme == ""){
            alert("Veuillez saisir un theme");
        }else{
            if(villeCurrent.ville != []){
                console.log(villeCurrent.ville);
                $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+villeCurrent.lat+"%2C"+villeCurrent.lon+"&radius="+$scope.radius+"&name="+$scope.theme+"&key=AIzaSyD1Lsn0Qz9Tmaij6ET1yukF5vhEXC5FQVM").
                success(function(data, status, headers, config) {
                    data.results.forEach(function(value) {
                        $scope.markers.push(value);
                    });
                    console.log($scope.markers);
                    addMarkers();
                }).
                error(function(data, status, headers, config) {
                    $scope.error = true;
                });
            }else{
                alert("Veuillez renseigner une ville");
            }
        }
    };

    photoLayer.add(photos).addTo(map);
    map.fitBounds(photoLayer.getBounds());

}]);