ulcodeIn24.controller('ThematiqueController', ['$scope', '$http', 'Thematique', function($scope, $http, Thematique) {

    //get sur les series pour initialiser les variables dans serie.js
    var GetCommerce = function (ville) {
        $scope.commerces = 0;

        $http.get('../api/commerces?ville=' + ville)
            .then(function (response) {
                       response.data.commerces.forEach(function (data) {
                           var newThematique = new Thematique(data.commerce);

                           $.each(newThematique, function (key, value) {
                               $scope.commerces += parseInt(value);
                           });
                    });
                             },
                function (error) {
                    console.log(error);
                });
    };

    $scope.localiser = function (ville){
        GetCommerce(ville);
    };

}]);