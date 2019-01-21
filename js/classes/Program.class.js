// **********************************************************************************
// ********************************* Objet Program *********************************
// **********************************************************************************

/**
 * Constructeur de l'objet Program
 *
 * @return {self}
 */
var Program = function()
{
    // Création d'une nouvelle palette de couleurs
    // On donne à la palette un id CSS particulier
    this.colorPalette =  new ColorPalette('color-palette');

    // Création d'un nouveau pinceau, qui est lié à la palette.
    // Ils peuvent directement échanger des messages (“converser”, métaphoriquement)
    // On appelle ce macanisme “injection de dépendance”
    this.pen          = new Pen(this.colorPalette);

    // Création d'une nouvelle feuille à dessin, qui est liée au pinceau
    // On donne à cette feuille un id CSS particulier
    this.canvas       = new Slate(this.pen);

};


// Méthode devenue inutile après ma refonte de code =:o)
Program.prototype.start = function()
{};
