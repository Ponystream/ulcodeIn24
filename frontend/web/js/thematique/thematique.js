ulcodeIn24.service('Thematique', [function() {
    //initialisation des variables
    var Thematique = function (data) {
        this.Hypermarche = data['NB_B101'];
        this.Supermarche = data['NB_B102'];
        this.Bricolage = data['NB_B103'];
        this.Superette = data['NB_B201'];
        this.Epicerie = data['NB_B202'];
        this.Boulangerie = data['NB_B203'];
        this.boucherie = data['NB_B204'];
        this.Surgele = data['NB_B205'];
        this.Poisonnerie = data['NB_B206'];
        this.Librairie = data['NB_B301'];
        this.Vetement = data['NB_B302'];
        this.Foyer = data['NB_B303'];
        this.Chaussures = data['NB_B304'];
        this.Electromenager = data['NB_B305'];
        this.Meuble = data['NB_B306'];
        this.Sport = data['NB_B307'];
        this.Maconerie = data['NB_B308'];
        this.Droguerie = data['NB_B309'];
        this.Parfumerie = data['NB_B310'];
        this.Bijouterie = data['NB_B311'];
        this.Fleuriste = data['NB_B312'];
        this.Optique = data['NB_B313'];
        this.Station_Service = data['NB_B314'];
    };
    return Thematique;
}]);