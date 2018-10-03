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

// var quotesArray = [];




// Retrieve words/quotes from API and place into an array

$("#play").on("click", function() {


  // var typeVerb = "verbs"
  // var typeAdjective = "adjecs"
  // var typeNouns = "nouns"
  
  // var queryURL = "https://nlp.fi.muni.cz/projekty/random_word/run.cgi?language_selection=en&word_selection=" +
  // typeVerb + "&model_selection=norm&length_selection=&probability_selection=true";

  var queryURLwords = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=affix%2C%20suffix%2C%20preposition%2C%20definite-article%2C%20pronoun%2C%20interjection%2C%20abbreviation%2C%20article%2C%20conjunction%2C%20definite-article&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=YOURAPIKEY";

  var queryURLquotes = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=3"

  $.ajax({
    url: queryURLwords,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    for (let i = 0; i < response.length; i++) {
      selectionsArray.push(response[i].word)
    }
  });
  $.ajax({
    url: queryURLquotes,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    for (let i = 0; i < response.length; i++) {
      selectionsArray.push(response[i].quote)
    }
  });
  //Not sure if this will fire when the click event is fired or if it will get fired once everything inside the click even is done. 
}).then(randomizeSelectionArray());


// Take words from array and randomize.
function randomizeSelectionArray () {
for (let i = 0; i < selectionsArray.length; i++){
  console.log("randomize has fired")
  let j = Math.floor(Math.random()*(selectionsArray.length-1+1)+1);
  roundArray.push(selectionsArray[j]);
}
};

function randomizeUsedArray () {
  for (let i = 0; i < usedArray.length; i++){
    console.log("randomize has fired")
    let j = Math.floor(Math.random()*(usedArray.length-1+1)+1);
    roundArray.push(usedArray[j]);
  }
  };


// Retrieve teams from array



// Show words for 30 seconds while allowing them to click correct/incorrect. If correct move to new array and award a point, if incorrect skip but keep in array.

function roundRemainigTime () {
  time--
  $("#time").text(time);
  noTime();
}

function noTime () {
  if (time == 0) {
  rounds--
  playerResults();
  };
};

function nextWord () {
  currentWord++
  $("#word").text(roundArray[currentWord]);
}

function usedWords () {
usedWords.push(roundArray[currentWord]);
}

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
    correctT1++
    usedWords();
    nextWord();
  } if (currentTeam == 4) {
    correctT1++
    usedWords();
    nextWord();
  }  
});
$("#incorrect").on("click", function () {  
    nextWord();
  });



// At the end of 30 seconds show results from the player and wait for click to pass to next person. Make sure it randomizes at this stage.

//Still have to do all the show/hide stuff
function playerResults() {
$("#results").text("You got " + correctT + currentTeam + "points!")
currentTeam++
$("#pass-device").text("Please pass the phone to team " + currentTeam + " and click the button below to continue");
}

$("#next-team").on("click", function () {  
  nextWord();
});



// Repeat until all words are done, at that point show final round review and start a new round with all the words again

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

function nextRound () {
  round--
  randomizeUsedArray();
  nextWord();
} 

$("#next-round").on("click", function () {  
  nextRound();
});

function emptyArray () {
  if (roundArray.lenght == 0) {
    nextRound();
  }
}

// Do rounds until counter is 0 then move on to the final results page

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

// If the click on a button they can go to the setup page to restart the game. Maybe later make it so that they can just reset the game

function reset () {
  //Go back to set up page

};

$("#restart").on("click", function (){
  reset();
});














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