ulcodeIn24.controller('MapController', ['$scope', '$http', function($scope, $http){

    $scope.ville = "";
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
        xhr.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address="+$scope.ville, false);
        xhr.send();
        var response = JSON.parse(xhr.response);
        console.log(response);
        if(response.status == "OK"){
            lat_nantes = response.results[0].geometry.location.lat;
            lon_nantes = response.results[0].geometry.location.lng;
            console.log(lat_nantes);
            console.log(lon_nantes);
            return true;
        }else{
            return false;
        }
    };

    var init = function(){
        // on affiche la carte
        map = L.map('map').setView([lat_nantes, lon_nantes], 12);
        marker = L.marker([lat_nantes, lon_nantes]).addTo(map);
        marker.bindPopup($scope.ville).openPopup();

        //Ajout d'un layer de carte
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    };

    // on click on submit Place search button
    var submit = document.getElementById("submitPlace");
    submit.onclick = function(){
        $scope.ville = document.getElementById("inputPlace").value;
        if($scope.ville == ""){
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

    photoLayer.add(photos).addTo(map);
    map.fitBounds(photoLayer.getBounds());

}]);