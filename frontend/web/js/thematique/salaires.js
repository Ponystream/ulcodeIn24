ulcodeIn24.service('Salaires', [function() {
    //initialisation des variables
    var Salaire = function (data) {
        this.salaireMoyen = data['SNHM12'];
    };
    return Salaire;
}]);