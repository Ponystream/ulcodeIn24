ulcodeIn24.controller('MapController', ['$scope', '$http', 'villeCurrent', function($scope, $http, villeCurrent){

    villeCurrent.ville = "Nancy";
    $scope.theme = "";
    var markers = [];
    var map = L.map('map');
    var circle = L.circle();
    var marker = L.marker();

    var getCoord = function(){
        // on récupère la position de la ville souhaitée
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?address="+villeCurrent.ville, false);
        xhr.send();
        var response = JSON.parse(xhr.response);
        if(response.status == "OK"){
            //villeCurrent.ville = response.results[0].address_components[2].short_name;
            villeCurrent.lat = response.results[0].geometry.location.lat;
            villeCurrent.lon = response.results[0].geometry.location.lng;
            return true;
        }else{
            return false;
        }
    };

    var init = function(){
        // on affiche la carte
        map.remove();
        map = L.map('map').setView([villeCurrent.lat, villeCurrent.lon], 13);
        marker = L.marker([villeCurrent.lat, villeCurrent.lon]).addTo(map);
        marker.bindPopup(villeCurrent.ville).openPopup();
        //Ajout d'un layer de carte
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        circle = L.circle([villeCurrent.lat, villeCurrent.lon], $scope.range*100, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(map);

        L.control.locate().addTo(map);
        //omnivore.kml('web/kml/Arrets.kml').addTo(map);
    };

    $scope.afficheTransport = function (){
        omnivore.kml('web/kml/Arrets.kml').addTo(map);
    };

    $scope.$watch('range', function(newvalue){

        map.removeLayer(circle);
        circle = L.circle([villeCurrent.lat, villeCurrent.lon], $scope.range*100, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(map);


    });

    // on click on submit Place search button
    var submit = document.getElementById("submitPlace");
    submit.onclick = function(){
        villeCurrent.ville = document.getElementById("inputPlace").value;
        if(villeCurrent.ville == ""){
            alert("Veuillez saisir un nom de ville");
        }else{
            if(getCoord()){
                init();
            }else{
                alert("ville inconnue");
            }
        }
    };

    var addMarkers = function(){
        if($scope.markers != []){
            for(i=0;i<markers.length;i++) {
                map.removeLayer(markers[i]);
            }
            $scope.markers.forEach(function(mark){
                marker = L.marker([mark.geometry.location.lat, mark.geometry.location.lng]);
                markers.push(marker);
                marker.addTo(map);
                marker.bindPopup(mark.name).openPopup();
            })
        }
    };

    var getMarkers = function(){
        $scope.markers = [];
        $scope.theme = document.getElementById("inputTheme").value;
        if($scope.theme == ""){
            alert("Veuillez saisir un theme");
        }else{
            if(villeCurrent.ville != []){
                $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+villeCurrent.lat+"%2C"+villeCurrent.lon+"&radius="+$scope.range*100+"&name="+$scope.theme+"&key=AIzaSyD1Lsn0Qz9Tmaij6ET1yukF5vhEXC5FQVM").
                success(function(data, status, headers, config) {
                    data.results.forEach(function(value) {
                        $scope.markers.push(value);
                    });
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

    // on click on submit Place search button
    $('#submitTheme').click(getMarkers);

    getCoord();
    init();
    //photoLayer.add(photos).addTo(map);
    //map.fitBounds(photoLayer.getBounds());

}]);