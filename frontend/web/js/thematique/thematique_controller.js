ulcodeIn24.controller('ThematiqueController', ['$scope', '$http', 'Commerce', 'Service_Public', 'Restaurant', 'villeCurrent', 'Sante', 'Loisir', 'Enseignement', 'Entreprise', 'Salaires', function ($scope, $http, Commerce, Service_Public, Restaurant, villeCurrent, Sante, Loisir, Enseignement, Entreprise, Salaires) {
    $scope.theme = "";


    //get sur les series pour initialiser les variables dans serie.js
    $scope.range = 50;
    var GetCommerce = function (ville) {
        $scope.commerces = 0;
        $scope.services = 0;
        $scope.loisirs = 0;
        $scope.santes = 0;
        $scope.restaurants = 0;
        $scope.enseignements = 0;
        $scope.salaires = 0;
        $scope.entreprises = 0;
        $scope.cleCommerce = [];
        $scope.cleLoisir = [];
        $scope.cleSante = [];
        $scope.cleRestaurant = [];
        $scope.cleEnseignement = [];
        $scope.cleEntreprise = [];
        $scope.cleSalaire = [];
        $scope.cleServicePublic = [];


        $http.get('../api/commerces?ville=' + ville)
            .then(function (response) {
                    response.data.commerces.forEach(function (data) {
                        var newThematique = new Commerce(data.commerce);
                        $.each(newThematique, function (key, value) {
                            $scope.commerces += parseInt(value);
                            $scope.cleCommerce.push({'nom' : key, 'valeur' : value});
                        });
                    });
                },
                function (error) {
                    console.log(error);
                });
    };

    $scope.villeCurrent = villeCurrent;


    var GetService = function (ville) {
        $http.get('../api/equipements?ville=' + ville)
            .then(function (response) {
                    response.data.equipements.forEach(function (data) {
                        var newService = new Service_Public(data.equipement);

                        $.each(newService, function (key, value) {
                            $scope.services += parseInt(value);
                            $scope.cleServicePublic.push({'nom' : key, 'valeur' : value});

                        });
                    });
                },
                function (error) {

                });

    };
    var GetRestaurant = function (ville) {
        $http.get('../api/equipements?ville=' + ville)
            .then(function (response) {
                    response.data.equipements.forEach(function (data) {
                        var newRestaurant = new Restaurant(data.equipement);

                        $.each(newRestaurant, function (key, value) {
                            $scope.restaurants += parseInt(value);
                            $scope.cleRestaurant.push({'nom' : key, 'valeur' : value});

                        });
                    });
                },
                function (error) {

                });

    };
    var GetSante = function (ville) {
        $http.get('../api/sante?ville=' + ville)
            .then(function (response) {
                    response.data.santes.forEach(function (data) {
                        var newSante = new Sante(data.sante);
                        $.each(newSante, function (key, value) {
                            $scope.santes += parseInt(value);
                            $scope.cleSante.push({'nom' : key, 'valeur' : value});

                        });
                    });
                },
                function (error) {

                });

    };
    var GetLoisir = function (ville) {
        $http.get('../api/loisirs?ville=' + ville)
            .then(function (response) {
                    response.data.loisirs.forEach(function (data) {
                        var newLoisir = new Loisir(data.loisir);

                        $.each(newLoisir, function (key, value) {
                            $scope.loisirs += parseInt(value);
                            $scope.cleLoisir.push({'nom' : key, 'valeur' : value});

                        });
                    });
                },
                function (error) {

                });

    };
    var GetEnseignement = function (ville) {
        $http.get('../api/enseignement?ville=' + ville)
            .then(function (response) {
                    response.data.enseignements.forEach(function (data) {
                        var newEnseignement = new Enseignement(data.enseignement);

                        $.each(newEnseignement, function (key, value) {
                            $scope.enseignements += parseInt(value);
                            $scope.cleEnseignement.push({'nom' : key, 'valeur' : value});

                        });
                    });
                },
                function (error) {

                });

    };
    var GetEntreprise= function (ville) {
        $http.get('../api/entreprises?ville=' + ville)
            .then(function (response) {
                    response.data.entreprises.forEach(function (data) {
                        var newEntreprise = new Entreprise(data.entreprise);

                        $.each(newEntreprise, function (key, value) {
                            $scope.entreprises += parseInt(value);
                            $scope.cleEntreprise.push({'nom' : key, 'valeur' : value});

                        });
                    });
                },
                function (error) {

                });

    };
    var GetSalaire= function (ville){
        $http.get('../api/salaires?ville=' + ville)
            .then(function (response) {
                    response.data.salaires.forEach(function (data) {
                        var newSalaire = new Salaires(data.salaire);

                        $.each(newSalaire, function (key, value) {
                            $scope.salaires += parseFloat(value);
                            $scope.cleSalaire.push({'nom' : key, 'valeur' : value});
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
        GetLoisir(ville);
        GetSante(ville);
        GetEnseignement(ville);
        GetEntreprise(ville);
        GetSalaire(ville);
    };

}]);