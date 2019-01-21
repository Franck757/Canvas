  var Pen = function(palette)
  {
      /*
       * 'sizes' permet de configurer “déclarativement” un ensemble d'épaisseurs de trait
       * pour le pinceau
       */
      this.sizes = {
          Fin: 1,
          Normal: 2,
          Epais: 80,
      };
      /*
       * 'colors' permet de configurer “déclarativement” un ensemble un ensemble de couleurs
       * pour le pinceau, qui seront affichées sous forme de pastilles à l'écran
       */
      this.colors= {
          black: "black",
          maroon: "#5C2121",
          red: "#B9121B",
          yellow: "#FFBD07",
          green: "#13B813",
          seagreen: "#029E9A",
          blue: "#0378A6"
      };
      this.color = 'black';
      this.size  = 1;
      this.colorPalette = palette;

      /*
       * Installation des gestionnaires d'évènements de configuration du crayon.
       * On utilise la délégation d'événement de manière à pouvoir gérer les écouteurs
       * de manière dynamique.
       */
      $('.toolbar .colors').on('click', '.pen-color', this.onClickPenColor.bind(this));
      $('.toolbar .thickness').on('click', '.pen-size', this.onClickPenSize.bind(this));
      /*
       * En dehors des événements standard de JavaScript, onpeut créer ses propres événements
       * Le nom 'magical-slate:pick-color' est purement arbitraire
       * La méthode .on() de jQuery permet de définir le nouvel événement peronnamisé.
       * Celui-ci ne peut être déclenché que “manuellement”, par programmation
       * On utilise pour cela la méthode '.trigger()' (cf. ColorPalette.class.js ligne 95)
       *
       * En Javascript natif, il faudrait :
       * 1) Créer un événement avec : var event = new Event('magical-slate:pick-color');
       * 2) Créer l'écouteur d'événement : elem.addEventListener('magical-slate:pick-color', function (e) { ... }, false);
       * 3) Déclencher l'événement : elem.dispatchEvent(event);
       * N.B. > Cela nécessite que la variable 'event' soit globale.
       */
      $(document).on('magical-slate:pick-color', this.onPickColor.bind(this));

      this.makeColorWidgets();
      this.makeThicknessWidgets();
  };

  /**
   * makeThicknessWidgets
   * Affiche les boutons de choix des épaisseurs de pinceau dans la page HTML
   * en se fondant sur la propriété 'sizes' de l'objet Pen
   * @type {[type]}
   */
  Pen.prototype.makeThicknessWidgets = function ()
  {
      for (let thickness in this.sizes) {
          let widget = $('<button>').addClass('pen-size').data('size', this.sizes[thickness]).html(thickness);
          $('.toolbar .thickness').append(widget);
      }
  }

  /**
   * makeColorWidgets
   * Affiche les pastilles de couleur qui correspondent à des choix prédéfinis pour l'application
   * en se fondant sur la propriété 'colors' de l'objet Pen
   *
   * @type {[type]}
   */
  Pen.prototype.makeColorWidgets = function ()
  {
      for (let color in this.colors) {
          let widget = $('<div>').addClass('pen-color').addClass(color).data('color', this.colors[color]);
          $('.toolbar .colors').append(widget);
      }
  }

  /**
   * configure
   * Méthode qui permet à un élément <canvas> (la feuille à dessin) d'interroger le pinceau pour savoir
   * avec quelle couleur (strokeStyle) et quelle épaisseur (lineWidth) il doit dessiner un tracé.
   *
   * @param  {context2D} slateCanvasContext Le contexte du canvas auquel on veut transmettre des données
   */
  Pen.prototype.configure = function(slateCanvasContext)
  {
      // Mise à jour des propriétés de dessin de l'ardoise.
      slateCanvasContext.strokeStyle = this.color;
      slateCanvasContext.lineWidth   = this.size;
  };

  /**
   * setColor
   * Méthode qui permet d'affecter à la propriété 'color' de l'objet Pen une couleur arbitraire,
   * donnée sous forme de chaîne de caractères au format CSS.
   * Exemples :
   * pen.setColor('red')
   * pen.setColor('#FA25D9')
   *
   * @param  {string} color une couleur
   */
  Pen.prototype.setColor = function(color)
  {
      this.color = color;
  };

  /**
   * setColorAsRgb
   * Méthode qui permet d'affecter à la propriété 'color' de l'objet Pen une couleur arbitraire,
   * donnée sous forme de trois valeurs Rouge, Vert, Bleu.
   * Exemple :
   * pen.setColorAsRgb(223, 56, 154)
   *
   * @param  {int} red   Valeur de rouge
   * @param  {int} green Valeur de vert
   * @param  {int} blue  Valeur de bleu
   */
  Pen.prototype.setColorAsRgb = function(red, green, blue)
  {
      // Stockage de la couleur au format RGB (comme la fonction CSS)
      this.color = 'rgb(' + red + ',' + green + ',' + blue + ')';
  };

  /**
   * setColor
   * Méthode qui permet d'affecter à la propriété 'size' de l'objet Pen une épaisseur de trait arbitraire,
   * donnée sous forme d'un nombre entier.
   * Exemple :
   * pen.setSize(3)
   *
   * @param  {int} size Une épaisseur de trait
   */
  Pen.prototype.setSize = function(size)
  {
      this.size = size;
  };

  /**
   * onClickPenColor
   * Fonction de rappel qui s'exécute lorsque l'on clique sur l'une des pastilles qui permettent
   * de choisir la couleur du trait.
   *
   * @param  {Event} event L'événement souris
   */
  Pen.prototype.onClickPenColor = function(event)
  {
      var div;
      var penColor;

      // Repérage de la <div> qui a déclenché l'évènement.
      div = event.target;

      /*
       * Récupération de l'attribut HTML5 data-color.
       * En Javascript natif : penColor = div.dataset.color;
       * /!\ Comme on a utilisé jQuery pour définir l'attribut 'data-color', on doit
       * continuer à utiliser jQuery, sinon on a une erreur
       */
      penColor = $(div).data('color');
      // penColor = div.dataset.color;

      // Modification de la couleur du crayon.
      this.setColor(penColor);
      console.log(this);

  };

  /**
   * onClickPenSize
   * Fonction de rappel qui s'exécute lorsque l'on clique sur l'un des boutons qui permettent
   * de choisir l'épaisseur du trait.
   *
   * @param  {Event} event L'événement souris
   */
  Pen.prototype.onClickPenSize = function(event)
  {
      var button;
      var penSize;

      // Repérage du <button> qui a déclenché l'évènement.
      button = event.currentTarget;

      /*
       * Récupération de l'attribut HTML5 data-size.
       * cf. commentaire lignes 171 seq.
       */
      penSize = $(button).data('size');

      // Modification de l'épaisseur du crayon.
      this.setSize(penSize);
      console.log(this);
  };

  /**
   * onPickColor
   * Fonction de rappel qui s'exécute lors de l'événement personnalisé 'magical-slate:pick-color'
   * Transmet au pinceau la valeur de la couleur qui a été sélectionnée dans la palette
   *
   */
  Pen.prototype.onPickColor = function()
  {
      var color;

      // Récupération de la couleur sur laquelle l'utilisateur a cliqué.
      color = this.colorPalette.getPickedColor();

      // Changement de la couleur du crayon.
      this.setColorAsRgb(color.red, color.green, color.blue);

      $(this.colorPalette.canvas).fadeOut('slow');
  };

/*this.color = '#000';
this.pins = [
  {classe: 'black', color : '#000'},
  {classe: 'maroon', color : '#5C2121'},
  {classe: 'red', color : '#B9121B'},
  {classe: 'yellow', color : '#FFBD07'},
  {classe: 'green', color : '#13B813'},
  {classe: 'seagreen', color : '#029E9A'},
  {classe: 'blue', color : '#0378A6'},

];
this.icons = [];

var pastille = document.querySelector(".colors");

for (p of this.pins) {
  let element = document.createElement("div");
  element.addEventListener("click", this.takeColor.bind(this));
  pastille.appendChild(element);
  this.icons.push(element);
  element.classList.add("pen-color", p.classe);
  element.dataset.color = p.color;
}

this.size = 1;
this.arraySize = [
  {classe : 'pen-size', size : 1 },
  {classe : "pen-size", size : 2 },
  {classe : "pen-size", size : 5 },

];
this.choice = [];

var epaisseur = document.querySelector(".thickness");

  for(s of this.arraySize) {
    let arrayButton = document.createElement("button");
    arrayButton.addEventListener("click", this.takeSize.bind(this));
    epaisseur.appendChild(arrayButton);
    this.choice.push(arrayButton);
    arrayButton.classList.add("pen-size", s.classe);
    array.dataset.size = s.classe;
  }

  var fin = document.createElement("button");
  var moyen = document.createElement("button");
  var epais = document.createElement('button');

  var text1 = document.createTextNode("fin");
  var text2 = document.createTextNode("moyen");
  var text3 = document.createTextNode("epais");

  epaisseur.appendChild(fin);
  epaisseur.appendChild(moyen);
  epaisseur.appendChild(epais);

  fin.appendChild(text1);
  moyen.appendChild(text2);
  epais.appendChild(text3);






  this.marron = document.createElement("div")
  this.marron.addEventListener("click", this.takeColor.bind(this));
  pastille.appendChild(this.marron);
  this.marron.classList.add("pen-color", "maroon");

  this.rouge = document.createElement("div");
  this.rouge.dataset.color = '#00ffff';
  this.rouge.addEventListener("click", this.takeColor.bind(this));
  pastille.appendChild(this.rouge);
  this.rouge.classList.add("pen-color", "red");

  this.jaune = document.createElement("div");
  this.jaune.addEventListener("click", this.takeColor.bind(this));
  pastille.appendChild(this.jaune);
  this.jaune.classList.add("pen-color", "yellow");

  this.vert = document.createElement("div");
  this.vert.addEventListener("click", this.takeColor.bind(this));
  pastille.appendChild(this.vert);
  this.vert.classList.add("pen-color", "green");

  this.vertClair = document.createElement("div");
  this.vertClair.addEventListener("click", this.takeColor.bind(this));
  pastille.appendChild(this.vertClair);
  this.vertClair.classList.add("pen-color", "seagreen");

  this.bleu = document.createElement("div");
  this.bleu.addEventListener("click", this.takeColor.bind(this));
  pastille.appendChild(this.bleu);
  this.bleu.classList.add("pen-color", "blue");

}

Pen.prototype.takeColor = function(event) {
  console.log(event.target.dataset.color);
  this.color = event.target.dataset.color;
}
Pen.prototype.takeSize = function(event) {
  console.log(event.target.dataset.size);
  this.size = event.target.dataset.size;
}
*/
