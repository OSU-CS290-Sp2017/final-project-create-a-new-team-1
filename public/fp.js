var allEntryElems = [];

//calculate total amount
var entryAmounts = document.getElementsByClassName('entry-amount');
var total = 0;
for(var i = 0; i < entryAmounts.length; i++){
      var text = entryAmounts[i].textContent;
      var number = Number(text);
      total += number;
}

x=document.getElementsByClassName("total-amount");  // Find the elements
total=parseFloat(Math.round(total * 100) / 100).toFixed(2);
x[0].innerText=total;    // Change the content

/*
 * This function shows the modal to create a entry when the "create entry"
 * button is clicked.
 */
function showcreateEntryModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createEntryModal = document.getElementById('create-entry-modal');

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove('hidden');
  createEntryModal.classList.remove('hidden');

}

function showcreateEntryModal2() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createEntryModal2 = document.getElementById('create-entry-modal2');

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove('hidden');
  createEntryModal2.classList.remove('hidden');

}
  // Function will hide the modal and clears values inside the input fields when closed

function showcreateEntryModal3() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createEntryModal3 = document.getElementById('create-entry-modal3');

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove('hidden');
  createEntryModal3.classList.remove('hidden');

}

/*
 * This function hides the modal to create a entry and clears any existing
 * values from the input fields whenever any of the modal close actions are
 * taken.
 */
function closecreateEntryModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createEntryModal = document.getElementById('create-entry-modal');

  // Hide the modal and its backdrop
  modalBackdrop.classList.add('hidden');
  createEntryModal.classList.add('hidden');

  clearEntryInputValues();

}

function closecreateEntryModal2() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createEntryModal2 = document.getElementById('create-entry-modal2');

  // Hide the modal and its backdrop
  modalBackdrop.classList.add('hidden');
  createEntryModal2.classList.add('hidden');

  clearEntryInputValues();

}

  // This function clears any value present in any of the entry input elements
function closecreateEntryModal3() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createEntryModal3 = document.getElementById('create-entry-modal3');

  // Hide the modal and its backdrop.
  modalBackdrop.classList.add('hidden');
  createEntryModal3.classList.add('hidden');

  clearEntryInputValues();

}

/*
 * This function clears any value present in any of the entry input elements.
 */
function clearEntryInputValues() {

  var entryInputElems = document.getElementsByClassName('entry-input-element');
  for (var i = 0; i < entryInputElems.length; i++) {
    var input = entryInputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}

/*
 * Creates and returns a new HTML element representing a single entry when given
 * the two or three necessary arguments
 */

function generateNewEntryElem(entryAmount, entryName, entryDesc) {

  var entryTemplate = Handlebars.templates.entry;
  var entryData = {
    amount: entryAmount,
    name: entryName,
    desc: entryDesc
  };

  return entryTemplate(entryData);

}

function generateNewEntryElem2(entryAmount, entryDesc) {

  var entryTemplate = Handlebars.templates.entry;
  var entryData = {
    amount: entryAmount,
    desc: entryDesc
  };

  return entryTemplate(entryData);

}
/*
 * This function takes user input values from the "create entry" modal,
 * generates a new entry using them, and inserts that entry into the document.
 */
function insertNewEntry() {

  var entryAmount = document.getElementById('entry-amount-input').value;
  var entryName = document.getElementById('entry-name-input').value;
  var entryDesc = document.getElementById('entry-description-input').value;
  /*
   * Only generate the new entry if the user supplied values for the entry
   * amount, entry name and entry description.
   */
   if(total - entryAmount < 0) {
         var stringWarning = "You can only transfer at most $" + total + "!";
         window.alert(stringWarning);
  }else if(isNaN(entryAmount)){
        window.alert("The entry amount should be a number!");
  }else if(entryAmount && entryName && entryDesc) {

      var newEntryElem = generateNewEntryElem(entryAmount, entryName, entryDesc);
      var entryContainer = document.querySelector('.entry-container');
      entryContainer.insertAdjacentHTML('afterbegin', newEntryElem);
      allEntryElems.push(newEntryElem);

      total -= entryAmount;
      total=parseFloat(Math.round(total * 100) / 100).toFixed(2);
      x[0].innerText=total;
      closecreateEntryModal();

  }

  else {

    alert('Make sure all boxes are filled out!');

  }
}
function insertNewEntry2() {

console.log("inside second new entry");
  var entryAmount = document.getElementById('entry-amount-input2').value;
  var entryDesc = document.getElementById('entry-description-input2').value;
  /*
   * Only generate the new entry if the user supplied values for both the entry
   * amount and the entry description. Give an alert if they aren't filled out.
   */
  if(entryAmount && entryDesc) {

    var newEntryElem = generateNewEntryElem2(entryAmount, entryDesc);
      var entryContainer = document.querySelector('.entry-container');
      entryContainer.insertAdjacentHTML('afterbegin', newEntryElem);
      allEntryElems.push(newEntryElem);

      closecreateEntryModal();
  }

  else {

    alert('Make sure all boxes are filled out!');

  }
}
function insertNewEntry3() {

  var entryAmount = document.getElementById('entry-amount-input3').value;
  var entryDesc = document.getElementById('entry-description-input3').value;
  /*
   * Only generate the new entry if the user supplied values for both the entry
   * amount and the entry description. Give an alert if they aren't filled out.
   */
  if(entryAmount && entryDesc) {

    var newEntryElem = generateNewEntryElem2(entryAmount, entryDesc);
      var entryContainer = document.querySelector('.entry-container');
      entryContainer.insertAdjacentHTML('afterbegin', newEntryElem);
      allEntryElems.push(newEntryElem);

      closecreateEntryModal2();
  }

  else {

    alert('Make sure all boxes are filled out!');

  }
}

/*
 * Perform a search over over all the entries based on the search query the user
 * entered in the navbar.  Only display entries that match the search query.
 * Display all entries if the search query is empty.
 */
function doEntrySearch() {
      console.log("In do entry search");
  // Grab the search query, make sure it's not null, and do some preprocessing.
  var searchQuery = document.getElementById('navbar-search-input').value;
  searchQuery = searchQuery ? searchQuery.trim().toLowerCase() : '';

  // Remove all entries from the entry container temporarily.
  var entryContainer = document.querySelector('.entry-container');
  while (entryContainer.lastChild) {
    entryContainer.removeChild(entryContainer.lastChild);
  }

  /*
   * Loop through the collection of all entries and add entries back into the DOM
   * if they contain the search term or if the search term is empty.
   */
  allEntryElems.forEach(function (entryElem) {
    if (!searchQuery || entryElem.textContent.toLowerCase().indexOf(searchQuery) !== -1) {
      entryContainer.appendChild(entryElem);
    }
  });

}


/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

  // Remember all of the existing entries in an array that we can use for search.
  var entryElemsCollection = document.getElementsByClassName('entry');
  for (var i = 0; i <entryElemsCollection.length; i++) {
    allEntryElems.push(entryElemsCollection[i]);
  }

  var createEntryButton1 = document.getElementById('create-entry-button1');
  createEntryButton1.addEventListener('click', showcreateEntryModal);

  var createEntryButton2 = document.getElementById('create-entry-button2');
  createEntryButton2.addEventListener('click', showcreateEntryModal2);

  var createEntryButton3 = document.getElementById('create-entry-button3');
  createEntryButton3.addEventListener('click', showcreateEntryModal3);

  var modalCloseButton = document.querySelector('#create-entry-modal .modal-close-button');
  modalCloseButton.addEventListener('click', closecreateEntryModal);

  var modalCancalButton = document.querySelector('#create-entry-modal .modal-cancel-button');
  modalCancalButton.addEventListener('click', closecreateEntryModal);

  var modalCloseButton2 = document.querySelector('#create-entry-modal2 .modal-close-button');
  modalCloseButton2.addEventListener('click', closecreateEntryModal2);

  var modalCancalButton2 = document.querySelector('#create-entry-modal2 .modal-cancel-button');
  modalCancalButton2.addEventListener('click', closecreateEntryModal2);

  var modalCloseButton3 = document.querySelector('#create-entry-modal3 .modal-close-button');
  modalCloseButton3.addEventListener('click', closecreateEntryModal3);

  var modalCancalButton3 = document.querySelector('#create-entry-modal3 .modal-cancel-button');
  modalCancalButton3.addEventListener('click', closecreateEntryModal3);

  var modalAcceptButton2 = document.querySelector('#create-entry-modal .modal-accept-button2');
  modalAcceptButton2.addEventListener('click', insertNewEntry);

  var modalAcceptButton = document.querySelector('#create-entry-modal2 .modal-accept-button');
  modalAcceptButton.addEventListener('click', insertNewEntry2);

  var modalAcceptButton3 = document.querySelector('#create-entry-modal3 .modal-accept-button');
  modalAcceptButton3.addEventListener('click', insertNewEntry2);

  var searchButton = document.getElementById('navbar-search-button');
  searchButton.addEventListener('click', doEntrySearch);

  var searchInput = document.getElementById('navbar-search-input');
  searchInput.addEventListener('input', doEntrySearch);

});
var searchButton = document.getElementById('navbar-search-button');
searchButton.addEventListener('click', doEntrySearch);

var searchInput = document.getElementById('navbar-search-input');
searchInput.addEventListener('input', doEntrySearch);
