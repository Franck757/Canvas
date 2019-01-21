var Slate = function(pen)
{
  let dashboard = document.querySelector("#dashboard");
  this.canvas = document.createElement("canvas");

  this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
  this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
  this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));

  this.canvas.setAttribute("height", "500px");
  this.canvas.setAttribute("width","800px");
  // canvas.setAttribute("context", "2d");
  dashboard.appendChild(this.canvas);


  this.pen = pen;
  this.paint = false;


  var outils = document.querySelector(".tools");
  var display = document.createElement("button");
  var text = document.createTextNode("Effacer");
  outils.appendChild(display);
  display.appendChild(text);


  this.context = this.canvas.getContext('2d');
  this.offset = this.canvas.getBoundingClientRect();

  this.position = [null, null];

}


Slate.prototype.onMouseDown = function(e)
{

  var mouseX = e.pageX - this.offset.x;
  var mouseY = e.pageY - this.offset.y;
  this.paint = true;
  this.position = [mouseX, mouseY];
  console.log(e);
}


Slate.prototype.onMouseMove = function(e)
{
  var mouseX = e.pageX - this.offset.x;
  var mouseY = e.pageY - this.offset.y;


  if (this.paint == true) {
    this.context.strokeStyle = this.pen.color;
    this.context.lineWidth = this.pen.size;
    this.context.beginPath();
    this.context.moveTo(this.position[0], this.position[1]);
    this.context.lineTo(mouseX, mouseY);
    this.context.closePath();
    this.context.stroke();
    this.position = [mouseX, mouseY]
  }
}


Slate.prototype.onMouseUp = function(r)
{
  this.paint = false;
  console.log(r);
}

/*$(canvas).mousemove(function(e){
if(paint){
addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
}
});
$(canvas).mouseup(function(e){
paint = false;
});

$(canvas).mouseleave(function(e){
paint = false;
});

function redraw(){
context.clearRect(0, 0, context.canvas.width, context.canvas.height);

context.strokeStyle = "#df4b26";
context.lineJoin = "round";
context.lineWidth = 5;

for(var i=0; i < clickX.length; i++) {
context.beginPath();
if(clickDrag[i] && i){
context.moveTo(clickX[i-1], clickY[i-1]);
}else{
context.moveTo(clickX[i]-1, clickY[i]);
}
context.lineTo(clickX[i], clickY[i]);
context.closePath();
context.stroke();
}
}*/
