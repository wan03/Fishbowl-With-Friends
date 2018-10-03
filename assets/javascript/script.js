// BEGINNING OF SCRIPT.JS

// ********** GLOBAL DECLARATIONS **********
// Variables related to the scripting logic



// Declare Variables that refer to the HTML
var _Text = document.getElementById("html_");




// Global function to test for an alpha event.key
function isAlpha(str) {
  for (i = 0; i < computerChoices.length; i++) {
    if (str === computerChoices[i]) {
      return true;
    } else { }
  }
  return false;
}


// Global function to test for a duplicate event.key
function isDuplicate(str) {
  for (i = 0; i < guessesSoFarArray.length; i++) {
    if (str === guessesSoFarArray[i]) {
      return true;
    } else { }
  } // end of for loop
  return false;
} // end of isDuplicate()


console.log(winsText); // ******* TESTING ********


// KICK OFF THE SCRIPT WITH A KEYSTROKE
document.onkeyup = function (event) {





  // Port the results back to the DOM
  _Text.textContent = _;

}; // End of document.onkeyup

// END OF FILE