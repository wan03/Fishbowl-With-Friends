 3





 
Message List
Loading history...

Jonatan Martinez [14:30]
I have most of the logic done but I haven't been able to do testing because I still haven't received the key to the API. I was going to work tonight on the show/hide portion of it but since Ed already did we can just reuse what he has already done.
We can combine the files today and see where we stand. We might have a working product by tonight or tomorrow and then we can work on adding some of those additional features we were talking about.

Ed Bock [14:32]
I'm finishing the navigation logic, but it'll definitely be ready for tonight.

Ed Bock [14:55]
I'm going to come back to this after it's stewed in my mind a bit, but I think that this is the final of the navigation logic.
ScriptEd.js 
// BEGINNING OF ED'S SCRIPT.JS
​
// MY PSEUDOCODE:
// THREE WINDOWS
//  NEED TO HIDE AND SHOW EACH
I posted this file in part in case something goes wrong with my branch.

Jonatan Martinez [16:12]
Ok, I've gone through a few git conflicts and I'm looking forward to figuring it out. It's going to be great training for later on.

Jeffrey McIntosh [16:18]
Sounds good.  I plan to be early today to class, to continue working on the various things.  But, definitely think trying to combine everything will be good so we can see what works and what doesn’t work.

Ed Bock [16:20]
Sounds great. I’ll be early as well.

Jonatan Martinez [16:24]
I guess I should leave now if want to get there early. Let me finish a couple of things and I'll be on my way.

Ed Bock [16:26]
You don’t have to. We have 3.5 hours. If you have more to do, then I’d say to stay.

Ed Bock [18:24]
scriptEd.js 
// BEGINNING OF ED'S SCRIPT.JS
​
// TODO ********** JEFFREY **********
//Please give the following buttons the following IDs:
//WINDOW    BUTTON     ID

Jonatan Martinez [20:13]
script.js 
// BEGINNING OF SCRIPT.JS
$(document).ready(function () {
​
// TODO ********** JEFFREY **********
//Please give the following buttons the following IDs:
//WINDOW    BUTTON     ID
//------    ------     --
//HomePage   Start      "btnBegin"
//HomePage   How to Play   "btnInstructions"
//How to Play  Start      "btnBegin"
//How to Play  Home      "btnHome"
//Input Info  Home      "btnHome"
//Input Info  How to Play   "btnInstructions"
​
//Also, please give the Divs related to the window content in question the following IDs:
//WINDOW DIV  ID
//----------  --
//HomePage   "divHome"
//How to Play  "divInstructions"
//Input Info  "divInputInfo"
// TODO End of Jeffrey's Todo
​
​
// Initialize Firebase
​
// var config = {
//  apiKey: "AIzaSyAWN9UIOd5JAV1x4r8cPgBYsYQcL4sXEXA",
//  authDomain: "project-1-445e8.firebaseapp.com",
//  databaseURL: "https://project-1-445e8.firebaseio.com",
//  projectId: "project-1-445e8",
//  storageBucket: "",
//  messagingSenderId: "1029201455873"
// };
// firebase.initializeApp(config);
​
// ********** GLOBAL DECLARATIONS **********
// Variables related to the scripting logic
var teamsArray = ["team1", "team2", "team3", "team4"],
  currentTeam = 1,
  correctT1 = 0,
  correctT2 = 0,
  correctT3 = 0,
  correctT4 = 0,
  rounds = 3,
  time = 30,
  selectionsArray = [],
  roundArray =[],
  usedArray = [],
  currentWord = 0,
  playerInterval
  // var quotesArray = [];
​
//Ed's variables 
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
​
// ********** BEGIN **********
$(document).on('touchstart click', document, function () {
​
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
​
}); // End of $(document).on('touchstart click', document, function ()
​
// btnHome
$(document).on('touchstart click', '#btnHome', function () {
 currentWindow = "Home";
 getHomeDiv.style.display = "block";
 getInstructionsDiv.style.display = "none";
 getInputInfoDiv.style.display = "none";
 // TODO Ed needs to add additional windows that need to be closed based on what Jonatan produces.
 // TODO Jonatan inserts his logic for the home page here, if needed (doubtful).
});
​
// btnInstructions
$(document).on('touchstart click', '#btnInstructions', function () {
 currentWindow = "Instructions";
 getHomeDiv.style.display = "none";
 getInstructionsDiv.style.display = "block";
 getInputInfoDiv.style.display = "none";
 // TODO Ed needs to add additional windows that need to be closed based on what Jonatan produces.
 // TODO Jonatan inserts his logic for the instructions page here, if needed (doubtful).
});
​
// btnBegin
// $(document).on('touchstart click', '#btnBegin', function () {
//  currentWindow = "InputInfo";
//  getHomeDiv.style.display = "none";
//  getInstructionsDiv.style.display = "none";
//  getInputInfoDiv.style.display = "block";
 // TODO Ed needs to add additional windows that need to be closed based on what Jonatan produces.
 // TODO Jonatan inserts his game logic beginning here. Specifically as it relates to inputted info.
// });
​
// TODO We can use the commented-out section below as a template for additional buttons that Jonatan's logic requires. I'm thinking of his need to get beyond the InputInfo page and when using the additional gameplay pages.
// btn_
// $(document).on('touchstart click', '#btn_', function () {
//  currentWindow = get_Div;
//  getHomeDiv.style.display = "";
//  getInstructionsDiv.style.display = "";
//  getInputInfoDiv.style.display = "";
//  // TODO Ed needs to add additional windows that need to be closed based on what Jonatan produces.
// });
​
​
// END OF FILE
​
​
// Retrieve words/quotes from API and place into an array
​
$.when($("#btnBegin").on("click", function() {
 // var typeVerb = "verbs"
 // var typeAdjective = "adjecs"
 // var typeNouns = "nouns"
 
 // var queryURL = "https://nlp.fi.muni.cz/projekty/random_word/run.cgi?language_selection=en&word_selection=" +
 // typeVerb + "&model_selection=norm&length_selection=&probability_selection=true";
​
 // var queryURLwords = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=affix%2C%20suffix%2C%20preposition%2C%20definite-article%2C%20pronoun%2C%20interjection%2C%20abbreviation%2C%20article%2C%20conjunction%2C%20definite-article&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=YOURAPIKEY";
​
 var queryURLquotes = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=3?X-Mashape-Key=FBgZNEfDDwmshlJZlW1jnhav9Mjmp1lh6Xhjsn23J0Jct49goC"
​
 // $.ajax({
 //  url: queryURLwords,
 //  method: "GET"
 // }).then(function(response) {
 //  console.log(response)
 //  for (let i = 0; i < response.length; i++) {
 //   selectionsArray.push(response[i].word)
 //  }
 // });
​
 $.ajax({
  url: queryURLquotes,
  method: "GET"
 }).then(function(response) {
  console.log(response)
  for (let i = 0; i < response.length; i++) {
   selectionsArray.push(response[i].quote)
   console.log(response[i].quote)
  }
 });
 //Not sure if this will fire when the click event is fired or if it will get fired once everything inside the click even is done. 
})).then(randomizeSelectionArray());
​
​
// Take words from array and randomize.
function randomizeSelectionArray () {
for (let i = 0; i < selectionsArray.length; i++){
 console.log("randomize has fired")
 let j = Math.floor(Math.random()*(selectionsArray.length-1+1)+1);
 roundArray.push(selectionsArray[j]);
 console.log(roundArray)
}
};
​
// function randomizeUsedArray () {
//  for (let i = 0; i < usedArray.length; i++){
//   console.log("randomize has fired")
//   let j = Math.floor(Math.random()*(usedArray.length-1+1)+1);
//   roundArray.push(usedArray[j]);
//  }
//  };
​
​
// Retrieve teams from array
​
​
​
// Show words for 30 seconds while allowing them to click correct/incorrect. If correct move to new array and award a point, if incorrect skip but keep in array.
function playerRun () {
 clearInterval(playerInterval);
 playerInterval = setInterval(playerRemainingTime, 1000);
 
};
​
function playerRemainingTime () {
 time--
 $("#time").text(time);
 noTime();
}
​
function noTime () {
 if (time == 0) {
 rounds--
 playerResults();
 };
};
​
function nextWord () {
 currentWord++
 $("#word").text(roundArray[currentWord]);
}
​
function usedWords () {
selectionsArray.push(roundArray[currentWord]);
}
​
$("#correct").on("click", function () {
 //Here would love to figure out how to dinamically create a variable using currentteam instead of this nested if statements.
 if (currentTeam == 1) {
  correctT1++
  usedWords();
  nextWord();
 } if (currentTeam == 2) {
  correctT2++
  usedWords();
  nextWord();
 } if (currentTeam == 3) {
  correctT3++
  usedWords();
  nextWord();
 } if (currentTeam == 4) {
  correctT4++
  usedWords();
  nextWord();
 } 
});
$("#incorrect").on("click", function () { 
  nextWord();
 });
​
​
​
// At the end of 30 seconds show results from the player and wait for click to pass to next person. Make sure it randomizes at this stage.
​
//Still have to do all the show/hide stuff
function playerResults() {
$("#results").text("You got " + correctT + currentTeam + "points!")
currentTeam++
$("#pass-device").text("Please pass the phone to team " + currentTeam + " and click the button below to continue");
}
​
$("#next-team").on("click", function () { 
 nextWord();
});
​
​
​
// Repeat until all words are done, at that point show final round review and start a new round with all the words again
​
function roundResults() {
 $("#results").text(
  "The results are: " +
  "Team 1: " +
  correctT1 +
  "Team 2: " +
  correctT2 +
  "Team 3: " +
  correctT3 +
  "Team 4: " +
  correctT4
 );
 currentTeam++
 $("#pass-device").text("Please pass the phone to team " + currentTeam + " and click the button below to continue");
 }
 
 $("#next-team").on("click", function () { 
  nextWord();
 });
​
function nextRound () {
 round--
 randomizeSelectionArray();
 nextWord();
} 
​
$("#next-round").on("click", function () { 
 nextRound();
});
​
function emptyArray () {
 if (roundArray.lenght == 0) {
  nextRound();
 }
}
​
// Do rounds until counter is 0 then move on to the final results page
​
function gameEnd () {
 if (round == 0) {
  $("#results").text(
   "The results are: " +
   "Team 1: " +
   correctT1 +
   "Team 2: " +
   correctT2 +
   "Team 3: " +
   correctT3 +
   "Team 4: " +
   correctT4
  )
 }
};
​
// If the click on a button they can go to the setup page to restart the game. Maybe later make it so that they can just reset the game
​
function reset () {
 //Go back to set up page
​
};
​
$("#restart").on("click", function (){
 reset();
});
​
}); // end of $(document).ready(function()
Collapse 

Message Input

Message Jeffrey McIntosh, Jonatan Martinez