ulcodeIn24.service('Service_Public', [function() {
    //initialisation des variables
    var Service_Public = function (data) {
        this.Police = data['NB_A101'];
        this.Gendarmerie = data['NB_A101'];
        this.Banque = data['NB_A203'];
        this.Poste = data['NB_A206'];
        this.Plombier = data['NB_A404'];
        this.Electricien = data['NB_A405'];
        this.Coiffure = data['NB_A501'];
        this.Veterinaire = data['NB_A502'];
        this.Agence_Immobiliere = data['NB_A505'];
        this.Beaute = data['NB_A507'];
    };
    return Service_Public;
}]);