ulcodeIn24.service('Loisir', [function() {
    //initialisation des variables
    var Loisir = function (data) {
        this.natation = data['NB_F101_NB_AIREJEU'];
        this.tennis = data['NB_F103_NB_AIREJEU'];
        this.cyclisme = data['NB_F104_NB_AIREJEU'];
        this.ski = data['NB_F105_NB_AIREJEU'];
        this.equestre = data['NB_F106_NB_AIREJEU'];
        this.athletisme = data['NB_F107_NB_AIREJEU'];
        this.air_De_Jeu = data['NB_F111_NB_AIREJEU'];
        this.cinema = data['NB_F301'];
        this.theatre = data['NB_F302'];

    };
    return Loisir;
}]);