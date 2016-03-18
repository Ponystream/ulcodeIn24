ulcodeIn24.controller('ThematiqueController', ['$scope', '$http', function($scope, $http) {

    //get sur les series pour initialiser les variables dans serie.js
    var GetCommerce = function () {
        $http.get('../../api/commerce?ville=Nancy')
            .then(function (response) {
                    console.log(response);
                    // $scope.commerces = [];
                    // response.data.ville.forEach(function (data) {
                    //     var newSerie = new Serie(data);
                    //     $scope.series.push(newSerie);
                    // });
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