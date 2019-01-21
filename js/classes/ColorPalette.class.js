var ColorPalette = function ()
{
/*
 * Liste des propriétés de l'objet ColorPalette
 */
this.canvaPalette = document.createElement("canvas");
this.buttonPalette = document.createElement("button");
this.canvaPalette.classList.add("fullColor");

/*
 * Déclarer les parties actives de l'objet
 */
this.buttonPalette.addEventListener("click", this.hideCanvas.bind(this));

/*
 * Configuration de l'objet
 */
var outils = document.querySelector(".tools");
var text = document.createTextNode("palette");
this.buttonPalette.appendChild(text);
outils.appendChild(this.buttonPalette);

this.context = this.canvaPalette.getContext('2d');


var dashboard = document.querySelector("#dashboard");
dashboard.appendChild(this.canvaPalette);



var app = {}
// Build Color palette

var app = {};
app.$colors  = $('context.fullColor');

app.buildColorPalette = function() {
  var gradient = app.colorctx.createLinearGradient(0, 0, app.$colors.width(), 0);
  // Create color gradient
  gradient.addColorStop(0,    "rgb(255,   0,   0)");
  gradient.addColorStop(0.15, "rgb(255,   0, 255)");
  gradient.addColorStop(0.33, "rgb(0,     0, 255)");
  gradient.addColorStop(0.49, "rgb(0,   255, 255)");
  gradient.addColorStop(0.67, "rgb(0,   255,   0)");
  gradient.addColorStop(0.84, "rgb(255, 255,   0)");
  gradient.addColorStop(1,    "rgb(255,   0,   0)");
  // Apply gradient to canvas
  app.colorctx.fillStyle = gradient;
  app.colorctx.fillRect(0, 0, app.colorctx.canvas.width, app.colorctx.canvas.height);

  // Create semi transparent gradient (white -> trans. -> black)
  gradient = app.colorctx.createLinearGradient(0, 0, 0, app.$colors.height());
  gradient.addColorStop(0,   "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
  gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
  gradient.addColorStop(1,   "rgba(0,     0,   0, 1)");
  // Apply gradient to canvas
  app.colorctx.fillStyle = gradient;
  app.colorctx.fillRect(0, 0, app.colorctx.canvas.width, app.colorctx.canvas.height);

}

}

ColorPalette.prototype.hideCanvas = function () {
  console.log(this);
  this.canvaPalette.classList.toggle("hide");


}
