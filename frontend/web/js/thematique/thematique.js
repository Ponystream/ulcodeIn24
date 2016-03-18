photolocate.service('Thematique', [function() {

    //initialisation des variables
    var Thematique = function (data) {
        //var name = [];
        this.Hypermarche = data.ville.NB_B101;
        this.Supermarche = data.ville.NB_B102;
        this.Bricolage = data.ville.NB_B103;
        this.Superette = data.ville.NB_B201;
        this.Epicerie = data.ville.NB_B202;
        this.Boulangerie = data.ville.NB_B203;
        this.boucherie = data.ville.NB_B204;
        this.Surgele = data.ville.NB_B205;
        this.Poisonnerie = data.ville.NB_B206;
        this.Librairie = data.ville.NB_B301;
        this.Vetement = data.ville.NB_B302;
        this.Foyer = data.ville.NB_B303;
        this.Chaussures = data.ville.NB_B304;
        this.Electromenager = data.ville.NB_B305;
        this.Meuble = data.ville.NB_B306;
        this.Sport = data.ville.NB_B307;
        this.Maconerie = data.ville.NB_B308;
        this.Droguerie = data.ville.NB_B309;
        this.Parfumerie = data.ville.NB_B310;
        this.Bijouterie = data.ville.NB_B311;
        this.Fleuriste = data.ville.NB_B312;
        this.Optique = data.ville.NB_B313;
        this.Station_Service = data.ville.NB_B314;
    };
    return Serie;
}]);