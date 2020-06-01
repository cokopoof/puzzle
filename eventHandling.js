/*
 * Puzzle Logic
 */

 //Global vars
 let cards = document.querySelectorAll('.puzzle-piece'),      // ^^^^^^^^^^^^^
     container = document.querySelector('#puzzle-container'), //
     currentDiv,                                              //  control vars
     newDiv,                                                  //
     shiftedSet,                                              // ^^^^^^^^^^^^^
     puzzleMenu = document.getElementById('puzzle-menu'),
     puzzles = [
       'new.jpg',
       'jojoyuckyuck.jpg',
       'ice-ruins.jpg',
       'cat-butterfly.png',
       'moon-cat.jpg',
       'fantasy_woods.jpg'
     ],
     imageNodes = new Array(puzzles.length),
     sfxPlace = new Audio('clap.mp3'),
     sfxVictory = new Audio('victory.mp3'),
     moveCount = 0;

randomPuzzle(puzzles);


//load puzzle options into sidebar

puzzles.forEach((puzzleSrc, i) => {
  imageNodes[i] = document.createElement("IMG");
  imageNodes[i].src = puzzleSrc;
  imageNodes[i].title = puzzleSrc;
  imageNodes[i].classList.add("puzzle-thumbnail");
  puzzleMenu.appendChild(imageNodes[i]);
});




//Eventlistners
container.addEventListener('mousedown', down);
container.addEventListener('mouseup', andUp);

let thumbnails = document.querySelectorAll('.puzzle-thumbnail');

thumbnails.forEach((item, i) => {
  item.addEventListener('click', changePuzzle);
});

//thumbnail clicked
function changePuzzle(event) {
  let newPuzzle = event.target;

  cards.forEach((tile, i) => {
    tile.style.backgroundImage = "url(" + newPuzzle.title + ")";
  });
}

//mousedownevent
function down(event) {
  shiftedSet = new Array(cards.length);
  currentDiv = event.target;
}
//mouseup event
function andUp() {
  sfxPlace.play();
  newDiv = event.target;

  document.querySelectorAll('.puzzle-piece').forEach((item, i) => {
    if (item === newDiv) {

      shiftedSet[i] = currentDiv;
    }
    else if (item === currentDiv) {

      shiftedSet[i] = newDiv;
    }
    else {
      shiftedSet[i] = item;
    }
  });
  shiftedSet.forEach((item, i) => {
    document.querySelector('#puzzle-container').appendChild(item);
  });
  document.getElementById('move-count').textContent = "" + (++moveCount) + "";
  checkOrder(document.querySelectorAll('.puzzle-piece'));
  if(checkOrder(document.querySelectorAll('.puzzle-piece'))) {
    sfxVictory.play();
    alert("Victory!");
  }
}

function checkOrder(pieces) {
  let val = true;
  let test = [...pieces].map((item, i, arr) => {
    return parseInt(item.id.substring(6, 8));
  });
  for (let i = 0; i < test.length - 1; i++) {
    if(test[i] > test[i+1]) {
      val = false;
      break;
    }
  }
  return val;
}
// random puzzle
function randomPuzzle(puzzleList) {
  let randomPuzzle = puzzleList[random(puzzleList.length)];
  cards.forEach((tile, i) => {
    tile.style.backgroundImage = "url(" + randomPuzzle + ")";
  });
}

function random(length) {
  return Math.floor(Math.random() * length);
}

function reset(container, items) {
  let itemsArr = document.querySelectorAll(items);
  let newArr = new Array(items.length);
  [...itemsArr].forEach((item, i) => {
    newArr[parseInt(item.id.substring(6, 8)) - 1] = item;
  });
  return newArr;
}
