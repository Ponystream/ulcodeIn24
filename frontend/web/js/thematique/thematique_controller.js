ulcodeIn24.controller('ThematiqueController', ['$scope', '$http', 'Thematique', function($scope, $http, Thematique) {
$scope.commerces = 0;

    //get sur les series pour initialiser les variables dans serie.js
    var GetCommerce = function () {
        $http.get('http://localhost/ulcodeIn24/api/commerces?ville=Nancy')
            .then(function (response) {
                       response.data.villes.forEach(function (data) {
                           var newThematique = new Thematique(data.ville);

                           $.each(newThematique, function (key, value) {
                               $scope.commerces += parseInt(value);
                           });
                    });
                             },
                function (error) {
                    console.log(error);
                });
    };
    GetCommerce();

    var nbCommerce = function(){
        console.log('test');
      GetCommerce();
    };
}]);