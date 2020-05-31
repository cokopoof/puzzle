/** Set Up Puzzle **/

let rows = 3,
    cols = 5,
    containerIdSelector = '#puzzle-container',
    piecesSelector = '.puzzle-piece';

window.onload = function() {
   //setPieces(containerIdSelector, rows, cols);
   puzzleStart();

   thumbnails.forEach((item, i) => {
     item.addEventListener('click', puzzleStart);
   });
}

function puzzleStart() {

  let image = getImage('piece-1'),
      imageDimensions = getImageDimensions(image, containerIdSelector);

  setPuzzle(containerIdSelector, rows, imageDimensions, cols);
  setImagePositions(piecesSelector, imageDimensions, cols, rows);
}
/*
function setPieces(id, rows, cols) {
  let newPiece;
  for (let i = 0; rows * cols > i; i++) {
    newPiece = document.createElement("div");
    newPiece.classList.add("puzzle-piece");
    newPiece.id = "piece-" + (i+1);
    document.querySelector(id).appendChild(newPiece);
  }
}*/

function setPuzzle(id, rows, dimensions, cols) {
  document.querySelector(id).style.gridTemplateRows = "repeat(" + rows + ", " + dimensions.height/rows + "px)";
  document.querySelector(id).style.gridTemplateColumns = "repeat(" + cols + ", " + dimensions.width/cols + "px)";
}

function setImagePositions(piecesSelector, image, cols, rows) {
  let itemsArr = document.querySelectorAll(piecesSelector);
  let newArr = new Array(itemsArr.length);
  [...itemsArr].forEach((item, i) => {
    newArr[parseInt(item.id.substring(6, 8)) - 1] = item;
  });
  newArr.forEach((item, i) => {
    item.style.backgroundPosition = "" + -1 * image.width/cols * (i%cols) +"px " + -1 * (Math.floor(i/cols)) * (image.height/rows) + "px";
    item.style.width = image.width / cols + "px";
    console.log(item);
  });
}

function getImage(id) {
  let imageSrc = document.getElementById(id).style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
  console.log(imageSrc);
  let image = new Image();
  image.src = imageSrc;
  return image;
}

function getImageDimensions(img, containerId) {
  console.log(img);
  let container = document.querySelector(containerId),
      ratio = container.clientWidth/img.width,
      imgWidth = container.clientWidth,
      imgHeight = ratio * img.height;
  return {width : imgWidth, height : imgHeight};
}
