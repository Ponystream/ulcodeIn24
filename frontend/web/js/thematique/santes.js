ulcodeIn24.service('Sante', [function() {
    //initialisation des variables
    var Sante = function (data) {
        this.Urgences = data['NB_D106'];
        this.Maternite = data['NB_D107'];
        this.Pharmacie = data['NB_D301'];
        this.Ambulance = data['NB_D303'];
    };
    return Sante;
}]);