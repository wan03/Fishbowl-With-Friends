// BEGINNING OF SCRIPT.JS

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAWN9UIOd5JAV1x4r8cPgBYsYQcL4sXEXA",
  authDomain: "project-1-445e8.firebaseapp.com",
  databaseURL: "https://project-1-445e8.firebaseio.com",
  projectId: "project-1-445e8",
  storageBucket: "",
  messagingSenderId: "1029201455873"
};
firebase.initializeApp(config);
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




// KICK OFF THE SCRIPT WITH A KEYSTROKE
document.onkeyup = function (event) {





  // Port the results back to the DOM
  _Text.textContent = _;

}; // End of document.onkeyup

// END OF FILE