ulcodeIn24.service('Entreprise', [function() {
    //initialisation des variables
    var Entreprise = function (data) {
        this.entrepriseActives = data['ETTOT13'];
    };
    return Entreprise;
}]);