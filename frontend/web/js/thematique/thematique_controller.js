ulcodeIn24.controller('ThematiqueController', ['$scope', '$http', function($scope, $http) {

    //get sur les series pour initialiser les variables dans serie.js
    var GetCommerce = function () {
        $http.get('../api/commerces?ville=Nancy')
            .then(function (response) {
                    // console.log(response.data.villes[0].ville);
                    // $scope.commerces = [];
                    console.log(response);
                       response.data.commerces.forEach(function (data) {
                           console.log(data.commerce.LIBGEO);
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