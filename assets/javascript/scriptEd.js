// BEGINNING OF ED'S SCRIPT.JS

// TODO ********** JEFFREY **********
//Please give the following buttons the following IDs:
//WINDOW        BUTTON          ID
//------        ------          --
//HomePage      Start           "btnBegin"
//HomePage      How to Play     "btnInstructions"
//How to Play   Start           "btnBegin"
//How to Play   Home            "btnHome"
//Input Info    Home            "btnHome"
//Input Info    How to Play     "btnInstructions"

//Also, please give the Divs related to the window content in question the following IDs:
//WINDOW DIV    ID
//----------    --
//HomePage      "divHome"
//How to Play   "divInstructions"
//Input Info    "divInputInfo"
// TODO End of Jeffrey's Todo
//  
// ********** START OF FILE **********
// Wait for the entire file to load before execution
$(document).ready(function () {

  // ********** GLOBAL Objects, Arrays & Variables **********
  var currentWindow;
  var previousWindow; // ? Delete unless used later
  var initialClickEvent = true;
  var getHomeDiv = document.getElementById("divHome");
  var getInstructionsDiv = document.getElementById("divInstructions");
  var getInputInfoDiv = document.getElementById("divInputInfo");
  var getBtnHome = document.getElementById("btnHome");
  var getBtnInstructions = document.getElementById("btnInstructions");
  var getBtnBegin = document.getElementById("btnBegin");
  var currentWindow;
  var previousWindow;

  // ********** GLOBAL Functions **********
  // ? Delete unless used later
  // function divHideShow() {
  //   var x = document.getElementById("myDIV");
  //   if (x.style.display === "none") {
  //     x.style.display = "block";
  //   } else {
  //     x.style.display = "none";
  //   }
  // }

  // ********** BEGIN **********
  $(document).on('touchstart click', document, function () {

    // * <EVERYONE> The logic of initialClickEvent was originally used to assume a beginning splash page requiring a click or touch to proceed to the Home Page. I personally see a SPLASH PAGE as an add-on beyond the MVP. As it stands, the logic below therefore assumes the program will start in the Home Page at this point.
    // * <EVERYONE> The initialClickEvent may be RESET to TRUE after a game is completed and the results are displayed. That'll be an easy way to guarantee that the user goes back to the Home Page after the game. Jonatan can reset all of his variables within the IF STMT below, if he'd like.
    if (initialClickEvent == true) {
      // Start in Home Page unless there is a splash page
      getHomeDiv.style.display = "block";
      getInstructionsDiv.style.display = "none";
      getInputInfoDiv.style.display = "none";
      initialClickEvent = false; // Keeps from repeating the window until after the game is over
      currentWindow = "divHome";
    } // End of else (initialClickEvent == false)

  }; // End of $(document).on('touchstart click', document, function ()

  // btnHome
  $(document).on('touchstart click', '#btnHome', function () {
    currentWindow = "Home";
    getHomeDiv.style.display = "block";
    getInstructionsDiv.style.display = "none";
    getInputInfoDiv.style.display = "none";
    // TODO Ed needs to add additional windows that need to be closed based on what Jonatan produces.
    // TODO Jonatan inserts his logic for the home page here, if needed (doubtful).
  });

  // btnInstructions
  $(document).on('touchstart click', '#btnInstructions', function () {
    currentWindow = "Instructions";
    getHomeDiv.style.display = "none";
    getInstructionsDiv.style.display = "block";
    getInputInfoDiv.style.display = "none";
    // TODO Ed needs to add additional windows that need to be closed based on what Jonatan produces.
    // TODO Jonatan inserts his logic for the instructions page here, if needed (doubtful).
  });

  // btnBegin
  $(document).on('touchstart click', '#btnBegin', function () {
    currentWindow = "InputInfo";
    getHomeDiv.style.display = "none";
    getInstructionsDiv.style.display = "none";
    getInputInfoDiv.style.display = "block";
    // TODO Ed needs to add additional windows that need to be closed based on what Jonatan produces.
    // TODO Jonatan inserts his game logic beginning here. Specifically as it relates to inputted info.
  });

  // TODO We can use the commented-out section below as a template for additional buttons that Jonatan's logic requires. I'm thinking of his need to get beyond the InputInfo page and when using the additional gameplay pages.
  // btn_
  // $(document).on('touchstart click', '#btn_', function () {
  //   currentWindow = get_Div;
  //   getHomeDiv.style.display = "";
  //   getInstructionsDiv.style.display = "";
  //   getInputInfoDiv.style.display = "";
  //   // TODO Ed needs to add additional windows that need to be closed based on what Jonatan produces.
  // });

}); // end of $(document).ready(function()
// END OF FILE