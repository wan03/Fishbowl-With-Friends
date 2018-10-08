// BEGINNING OF SCRIPT.JS
// * VERSIONS:
// * 00 Initial script.js combined (unformatted)
// * 01 Rearranging content into a top-down organizational hierarchy
// * 02 Adding console.log validation and fixing minor errors with commenting to explain

$(document).ready(function () {
  $('.modal').modal();
  // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyAWN9UIOd5JAV1x4r8cPgBYsYQcL4sXEXA",
  //   authDomain: "project-1-445e8.firebaseapp.com",
  //   databaseURL: "https://project-1-445e8.firebaseio.com",
  //   projectId: "project-1-445e8",
  //   storageBucket: "",
  //   messagingSenderId: "1029201455873"
  // };
  // firebase.initializeApp(config);

  // ********** GLOBAL DECLARATIONS **********

  // Variables related to the scripting logic

  // ! Jonatan: Ed corrected the formatting on this array
  var teamsArray = 
    ["team1", "team2", "team3", "team4"],
    currentTeam = 1,
    correctT1 = 0,
    correctT2 = 0,
    correctT3 = 0,
    correctT4 = 0,
    correctAnswers = [correctT1 + correctT2 + correctT3 + correctT4],
    rounds = 3,
    time = 30,
    playerInterval,
    selectionsArray = [],
    roundArray = [],
    usedArray = [],
    currentWord = -1; // ! Teams and Rounds are hardcoded for now
  // var quotesArray = []; // TODO To be used once the second API is functional

  // Navigational variables 
  var currentWindow;
  var previousWindow; // TODO Delete unless used later
  var initialClickEvent = true;
  var getHomeDiv = document.getElementById("divHome");
  var getInstructionsDiv = document.getElementById("divInstructions");
  var getInputInfoDiv = document.getElementById("divInputInfo");
  var getBtnHome = document.getElementById("btnHome");
  var getBtnInstructions = document.getElementById("btnInstructions");
  var getBtnBegin = document.getElementById("btnBegin");
  var currentWindow;
  var previousWindow;

  // ******** GLOBAL FUNCTIONS ********
  // Take words from array and randomize.
  function randomizeSelectionArray() {
    for (let i = 0; i < selectionsArray.length; i++) {
      console.log("randomizeSelectionArray has fired");
      // ! Ed is not sure about the following...
      let j = Math.floor(Math.random() * (selectionsArray.length - 1 + 1) + 1);
      roundArray.push(selectionsArray[j]);
      console.log(roundArray)
    }
  };

  // Don't need the randomizeUsedArray function for now.

  // function randomizeUsedArray() {
  //   console.log("randomizeUsedArray has fired");
  //   for (let i = 0; i < usedArray.length; i++) {
  //     let j = Math.floor(Math.random() * (usedArray.length - 1 + 1) + 1); // ! Ed: Not sure about this
  //     roundArray.push(usedArray[j]);
  //   }
  // };

  // Retrieve teams from array
  // ! Ed: Believe that this is an add-on when we later allow for inputting the # of teams

  // Show words for 30 seconds while allowing them to click correct/incorrect. 
  // If correct move to new array and award a point.
  // If incorrect skip but keep in array.

  function playerRun () {
    clearInterval(playerInterval);
    playerInterval = setInterval(playerRemainingTime, 1000);
    
  };

  function playerRemainingTime() {
    // ! Ed: Currently this function is not being referenced in the code
    console.log("roundRemainingTime has fired");
    console.log("time--");
    time--;
    $("#time").text(time);
    console.log("Call noTime from roundRemainingTime");
    noTime();
  }

  function noTime() {
    console.log("noTime has fired");
    if (time == 0) {
      console.log("time == 0");
      console.log("rounds--");
      clearInterval(playerInterval);
      rounds--;
      console.log("Call playerResults from noTime");
      playerResults();
    };
  };

  function nextWord() {
    console.log("nextWord has fired");
    console.log(currentWord);
    console.log(roundArray[currentWord]);
    currentWord++;
    console.log(currentWord);
    console.log(roundArray[currentWord]);
    $("#word-phrase-box").text(roundArray[currentWord]);
    if (currentWord > roundArray.lenght - 1)
    currentWord = 0;
  }

  function usedWords() {
    console.log("usedWords has fired");
    selectionsArray.push(roundArray[currentWord]);
  }

  // At the end of 30 seconds show results from the player and wait for click to pass to next person. Make sure it randomizes at this stage.

  // Still have to do all the show/hide stuff
  function playerResults() {
    console.log("playerResults has fired");

    // ! This still needs some work as it is showing undefined. How do we dinamically show the team points? 
    $("#divResults").text("You got " + correctAnswers[currentTeam]  + " points!");
    currentTeam++;
    time = 30;
    $("#pass-device").text("Please pass the phone to  the next team and click the button below to continue");
  }

  $("#next-team").on("click", function () {
    nextWord();
    playerRun();
  })

  // Repeat until all words are done, at that point show final round review and start a new round with all the words again
  function roundResults() {
    // TODO Should redo this a for loop based on the length of the teams array
    console.log("nextRound has fired");
    $("#results").text(
      "The results are: " +
      "Team 1: " +
      correctT1 +
      " | Team 2: " +
      correctT2 +
      " | Team 3: " +
      correctT3 +
      " | Team 4: " +
      correctT4
    );
    console.log("currentTeam++");
    currentTeam++;
    $("#pass-device").text("Please pass the phone to team " + currentTeam + " and click the button below to continue");
  }

  function nextRound() {
    console.log("nextRound has fired");
    console.log("round--");
    rounds--;
    currentWord = 0;
    console.log("Call randomizeUsedArray from nextRound");
    randomizeSelectionArray();
    console.log("Call nextWord from nextRound");
    nextWord();
  }

  function emptyArray() {
    console.log("emptyArray has fired");
    if (roundArray.lenght == 0) {
      console.log("Call nextRound from emptyArray");
      roundResults();
      nextRound(); // ! This should happen on click after the results have been shown.
    }
  }

  // Do rounds until counter is 0 then move on to the final results page
  function gameEnd() {
    if (rounds == 0) {
      console.log("round==0");
      $("#results").text(
        "The results are: " +
        " Team 1: " +
        correctT1 +
        " | Team 2: " +
        correctT2 +
        " | Team 3: " +
        correctT3 +
        " | Team 4: " +
        correctT4
      )
    }
  }

  // If the click on a button they can go to the setup page to restart the game. Maybe later make it so that they can just reset the game
  function reset() {
    //Go back to set up page
    // TODO TO BE COMPLETED
  }

  // ******** GLOBAL CLICK EVENTS ********
  // Retrieve words/quotes from API and place into an array
  $.when($("#btnBegin").on("touchstart click", function () {
    // ! need to change ID to better one.
    // var typeVerb = "verbs";
    // var typeAdjective = "adjecs";
    // var typeNouns = "nouns";

    // var queryURL = "https://nlp.fi.muni.cz/projekty/random_word/run.cgi?language_selection=en&word_selection=" +
    // typeVerb + "&model_selection=norm&length_selection=&probability_selection=true";

    // var queryURLwords = "https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=affix%2C%20suffix%2C%20preposition%2C%20definite-article%2C%20pronoun%2C%20interjection%2C%20abbreviation%2C%20article%2C%20conjunction%2C%20definite-article&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=YOURAPIKEY";

    var queryURLquotes = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=10";

    // $.ajax({
    //   url: queryURLwords,
    //   method: "GET"
    // }).then(function (response) {
    //   console.log(response)
    //   for (let i = 0; i < response.length; i++) {
    //     selectionsArray.push(response[i].word)
    //   }
    // });
    $.ajax({
      url: queryURLquotes,
      method: "GET",
      headers: {
        "X-Mashape-Key": "FBgZNEfDDwmshlJZlW1jnhav9Mjmp1lh6Xhjsn23J0Jct49goC",
        "Accept": "application/json",
      }
    }).then(function (response) {
      console.log(response)
      for (let i = 0; i < response.length; i++) {
        selectionsArray.push(response[i].quote)
        
      }
    })
    //Not sure if this will fire when the click event is fired or if it will get fired once everything inside the click even is done. 
  })).then(randomizeSelectionArray()); // ! This does not work. A way around this might be to create an additional button to start the game. I was thinking that we could show a page that instructs to give it to the first person and then to click here once they are ready. 

  $("#correct").on("touchstart click", function () {
    // TODO Add hide/show
    //Here would love to figure out how to dinamically create a variable using currentteam instead of this nested if statements.
    if (currentTeam == 1) {
      console.log("correctT1++");
      correctT1++
      console.log(correctT1);
      console.log("Call usedWords");
      usedWords();
      console.log("Call nextWord");
      nextWord();
    } if (currentTeam == 2) {
      console.log("correctT2++");
      correctT2++
      console.log("Call usedWords");
      usedWords();
      console.log("Call nextWord");
      nextWord();
    } if (currentTeam == 3) {
      console.log("correctT3++");
      correctT3++
      console.log("Call usedWords");
      usedWords();
      console.log("Call nextWord");
      nextWord();
    } if (currentTeam == 4) {
      console.log("correctT4++");
      correctT4++
      console.log("Call usedWords");
      usedWords();
      console.log("Call nextWord");
      nextWord();
    }
  });

  $("#incorrect").on("touchstart click", function () {
    // TODO Add hide/show
    console.log("#incorrect calls nextWord");
    nextWord();
  });

  $("#next-team").on("touchstart click", function () {
    console.log("#next-team calls nextWord");
    nextWord();
  });

  // ! Ed commented this out as a duplicate
  // $("#next-team").on("click", function () {
  // TODO Add hide/show
  //   console.log("#next-team calls nextWord");
  //   nextWord();
  // });

  $("#next-round").on("touchstart click", function () {
    // TODO Add hide/show
    console.log("#next-round calls nextRound");
    nextRound();
  });

  $("#restart").on("touchstart click", function () {
    // TODO Add hide/show
    console.log("#restart calls reset");
    reset();
  });

  // ********** BEGIN **********
  // $(document).on('touchstart click', document, function () {

  //   // * <EVERYONE> The logic of initialClickEvent was originally used to assume a beginning splash page requiring a click or touch to proceed to the Home Page. I personally see a SPLASH PAGE as an add-on beyond the MVP. As it stands, the logic below therefore assumes the program will start in the Home Page at this point.
  //   // * <EVERYONE> The initialClickEvent may be RESET to TRUE after a game is completed and the results are displayed. That'll be an easy way to guarantee that the user goes back to the Home Page after the game. Jonatan can reset all of his variables within the IF STMT below, if he'd like.

  //   if (initialClickEvent == true) {
  //     // Start in Home Page unless there is a splash page
  //     getHomeDiv.style.display = "block";
  //     getInstructionsDiv.style.display = "none";
  //     getInputInfoDiv.style.display = "none";
  //     initialClickEvent = false; // Keeps from repeating the window until after the game is over
  //     currentWindow = "divHome";
  //   } // End of else (initialClickEvent == false)

  // }); // End of $(document).on('touchstart click', document, function ()

  // btnHome
  // $(document).on('touchstart click', '#btnHome', function () {
  //   currentWindow = "Home";
  //   getHomeDiv.style.display = "block";
  //   getInstructionsDiv.style.display = "none";
  //   getInputInfoDiv.style.display = "none";
  //   // TODO Ed needs to add additional windows that need to be closed based on what Jonatan produces.
  // });

  // // btnInstructions
  // // TODO THIS WILL BE REPLACED WITH A MODAL THAT JEFFREY IS CODING
  // $(document).on('touchstart click', '#btnInstructions', function () {
  //   currentWindow = "Instructions";
  //   getHomeDiv.style.display = "none";
  //   getInstructionsDiv.style.display = "block";
  //   getInputInfoDiv.style.display = "none";
  //   // TODO Ed needs to add additional windows that need to be closed based on what Jonatan & Jeffrey produce.
  // });

  // btnBegin
  // $(document).on('touchstart click', '#btnBegin', function () {
  //   currentWindow = "InputInfo";
  //   getHomeDiv.style.display = "none";
  //   getInstructionsDiv.style.display = "none";
  //   getInputInfoDiv.style.display = "block";
  //   // TODO Ed needs to add additional windows that need to be closed based on what Jonatan & Jeffrey produce.
  //   // TODO Jonatan inserts his game logic beginning here. Specifically as it relates to inputted info.
  // });

  // TODO We can use the commented-out section below as a template for additional buttons that Jonatan's logic requires. I'm thinking of his need to get beyond the InputInfo page and when using the additional gameplay pages.
  // btn_
  // $(document).on('touchstart click', '#btn_', function () {
  //   currentWindow = get_Div;
  //   getHomeDiv.style.display = "";
  //   getInstructionsDiv.style.display = "";
  //   getInputInfoDiv.style.display = "";
  //   // TODO Ed needs to add additional windows that need to be closed based on what Jonatan produces.
  // });

  function game () {
    randomizeSelectionArray();
    nextWord();
    playerRun();
    // emptyArray();
    gameEnd();
  }

  $("#play-game-btn").on("click", game);

}); // end of $(document).ready(function()
// END OF FILE