ulcodeIn24.controller('ThematiqueController', ['$scope', '$http', 'Commerce', 'Service_Public', 'Restaurant', 'villeCurrent', function ($scope, $http, Commerce, Service_Public, Restaurant, villeCurrent) {
    $scope.theme = "";
    //get sur les series pour initialiser les variables dans serie.js
    var GetCommerce = function (ville) {
        $scope.commerces = 0;
        $scope.services = 0;
        $scope.restaurants = 0;

        $http.get('../api/commerces?ville=' + ville)
            .then(function (response) {
                    response.data.commerces.forEach(function (data) {
                        var newThematique = new Commerce(data.commerce);

                        $.each(newThematique, function (key, value) {
                            $scope.commerces += parseInt(value);
                        });
                    });
                },
                function (error) {
                    console.log(error);
                });
    };

    $scope.villeCurrent = villeCurrent;
    //$scope.$watch('theme', function (newValue) {
    //    if (newValue != 0 && newValue != undefined) {
    //        console.log(newValue);
    //    }
    //});

    var GetService = function (ville) {
        $http.get('../api/equipements?ville=' + ville)
            .then(function (response) {
                console.log(response);
                    response.data.equipements.forEach(function (data) {
                        var newService = new Service_Public(data.equipement);

                        $.each(newService, function (key, value) {
                            $scope.services += parseInt(value);
                        });
                    });
                },
                function (error) {

                });

    };
    var GetRestaurant = function (ville) {
        $http.get('../api/equipements?ville=' + ville)
            .then(function (response) {
                console.log(response);
                    response.data.equipements.forEach(function (data) {
                        var newRestaurant = new Restaurant(data.equipement);

                        $.each(newRestaurant, function (key, value) {
                            $scope.restaurants += parseInt(value);
                        });
                    });
                },
                function (error) {

                });

    };

    $scope.localiser = function (ville) {
        GetCommerce(ville);
        GetService(ville);
        GetRestaurant(ville);
    };

}]);