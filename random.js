/* Takes the selectors as arguments for the parent container object and the children of that parent to be randomized */
function ranomizeDomOrder(domParentSelector, domChildrenSelector) {
  /* try and throw errors for empty aruments or arguments that aren't strings */
  try {
    if(domParentSelector == "") throw "ERROR: domParentSelector must not be empty";
    if(domChildrenSelector == "") throw "ERROR: domChildrenSelector must not be empty";
    if(typeof domParentSelector != "string") throw typeof domParentSelector + " must be string for parent selector";
    if(typeof domChildrenSelector != "string") throw typeof domChildrenSelector + " must be a string for children selector";
  }
  catch(err) {
    console.log(err);
  }
  let domList = document.querySelectorAll(domChildrenSelector); //the items to be randomized
  let parentYo = document.querySelector(domParentSelector); //direct parent of items to be randomized
  /* test to make sure selectors point to an existing node and nodelist in the DOM */
  try {
    if(!Object.prototype.isPrototypeOf.call(Node.prototype, parentYo)) throw "ERROR: parent selector must be pointing to a DOM object. You put: " + domParentSelector;
    if(!Object.prototype.isPrototypeOf.call(NodeList.prototype, domList)) throw "ERROR: Children selector must be pointing to a NodeList object. You put: " + domChildrenSelector;
  }
  catch(err) {
    console.log(err);
  }
  /* iterates through each item in nodelist to select and random node in the list to (re)append to the parent at the bottom, randomizing the order */
  domList.forEach((item, i) => {
      parentYo.appendChild(domList[random(domList.length)]);
  });

/* returns random number between 0 - input (in this case the length of the nodelist) */
  function random(length) {
    return Math.floor(Math.random() * length);
  }

}

function reset(container, items) {
  let itemsArr = document.querySelectorAll(items);
  let newArr = new Array(items.length);
  [...itemsArr].forEach((item, i) => {
    newArr[parseInt(item.id.substring(6, 8)) - 1] = item;
  });
  newArr.forEach((item, i) => {
    document.querySelector('#puzzle-container').appendChild(item);
  });
}
ranomizeDomOrder('#puzzle-container', '.puzzle-piece');
