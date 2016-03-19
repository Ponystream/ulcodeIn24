ulcodeIn24.service('Enseignement', [function() {
    //initialisation des variables
    var Enseignement = function (data) {
        this.maternelle = data['NB_C101'];
        this.elementaire = data['NB_C104'];
    };
    return Enseignement;
}]);