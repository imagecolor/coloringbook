
var $ = require('jquery');
var jsfeat = require('./jsfeat');
$(function() {
  var canvas = document.getElementById('canvasimage');
  var ctx = canvas.getContext('2d');
  var cv = $('#canvasimage');
  var img = document.getElementById("catimage");
  var catimg = $('#catimage');


  ctx.drawImage(img, 0, 0);
  var imageData = CannyJS.canny(canvas);
  imageData.drawOn(canvas);  
});
