// BEGINNING OF SCRIPT.JS

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
  var initialClickEvent = true;
  var getHomeDiv = document.getElementById("divHome");
  var getInputInfoDiv = document.getElementById("divInputInfo");
  var getGamePageDiv = document.getElementById("divGamePage");
  var getResultsDiv = document.getElementById("divResults");


  // ******** GLOBAL FUNCTIONS ********
  // Take words from array and randomize.

  function randomizeSelectionArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    console.log(">>> randomizeSelectionArray(array) has fired");
    while (0 !== currentIndex) {
      console.log("currentIndex = " + currentIndex);
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function playerRun() {
    console.log(">>> playerRun() has fired");
    clearInterval(playerInterval);
    playerInterval = setInterval(playerRemainingTime, 1000);
  };

  function playerRemainingTime() {
    console.log(">>> roundRemainingTime has fired");
    console.log("time--");
    time--;
    $("#time").text(time);
    console.log("Call noTime from roundRemainingTime next");
    noTime();
  }

  function noTime() {
    console.log(">>> noTime has fired");
    if (time == 0) {
      console.log("time == 0");
      console.log("Call clearInterval(playerInterval) from noTime()");
      clearInterval(playerInterval);
      // console.log("rounds--");
      // rounds--;
      console.log("Call playerResults from noTime()");
      playerResults();
      currentTeam++
    };
  };

  function nextWord() {
    getHomeDiv.style.display = "none";
    getGamePageDiv.style.display = "block";
    getResultsDiv.style.display = "none";
    getInputInfoDiv.style.display = "none";
    console.log(">>> nextWord() has fired");
    console.log(currentWord);
    console.log(roundArray[currentWord]);
    currentWord++;
    console.log("currentWord++ results in currentWord=" + currentWord);
    console.log(roundArray[currentWord]);
    $("#word-phrase-box").text(roundArray[currentWord]);
    if (currentWord > roundArray.length - 1) {
      currentWord = 0;
    }
  }

  function usedWords() {
    console.log(">>> usedWords() has fired");
    selectionsArray.push(roundArray[currentWord]);
  }

  function playerResults() {
    // This fires when countdown == 0
    getHomeDiv.style.display = "none";
    getGamePageDiv.style.display = "none";
    getResultsDiv.style.display = "block";
    getInputInfoDiv.style.display = "none";
    console.log(">>> playerResults has fired. Therefore countdown==0.");
    // TODO Tweak the visuals on the results below
    $("#divResultsSoFar").text("The results are: " +
      "Team 1: " +
      correctT1 +
      " | Team 2: " +
      correctT2 +
      " | Team 3: " +
      correctT3 +
      " | Team 4: " +
      correctT4);
    currentTeam++;
    time = 30;
    $("#pass-device").text("Please pass the phone to the next team and click the button below to continue");
  }

  function roundResults() {
    // fires when roundArray is empty
    // TODO Should redo this a for loop based on the length of the teams array
    console.log(">>> nextRound has fired. Therefore roundArray is empty");
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
    console.log(">>> nextRound has fired");
    console.log("round--, therefore Press 'Next Round' Button");
    rounds--;
    currentWord = 0;
    console.log("Call randomizeUsedArray from nextRound()");
    roundArray = randomizeSelectionArray(selectionsArray);
    console.log("Call nextWord from nextRound()");
    nextWord();
  }

  function emptyArray() {
    console.log(">>> emptyArray has fired");
    if (roundArray.length == 0) {
      console.log("Call nextRound from emptyArray");
      roundResults();
      nextRound(); // ! This should happen on click after the results have been shown.
    }
  }

  function gameEnd() {
    // Do rounds until counter is 0 then move on to the final results page
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

  function game(event) {
    event.preventDefault();
    nextWord();
    playerRun();
    emptyArray();
    gameEnd();
  }

  // If the click on a button they can go to the setup page to restart the game. Maybe later make it so that they can just reset the game
  function reset() {
    //Go back to set up page
    // TODO TO BE COMPLETED BY ED
  }

  // ******** GLOBAL CLICK EVENTS ********

  // * <EVERYONE> The logic of initialClickEvent was originally used to assume a beginning splash page requiring a click or touch to proceed to the Home Page. I personally see a SPLASH PAGE as an add-on beyond the MVP. As it stands, the logic below therefore assumes the program will start in the Home Page at this point.
  // * <EVERYONE> The initialClickEvent may be RESET to TRUE after a game is completed and the results are displayed. That'll be an easy way to guarantee that the user goes back to the Home Page after the game. Jonatan can reset all of his variables within the IF STMT below, if he'd like.
  // Start in Home Page with everything else hidden unless there is a splash page
  if (initialClickEvent == true) {
    getHomeDiv.style.display = "block";
    getGamePageDiv.style.display = "none";
    getResultsDiv.style.display = "none";
    getInputInfoDiv.style.display = "none";
  }

  // ! btnHome
  $(document).on('touchstart click', '#btnHome', function () {
    initialClickEvent = true;
    getHomeDiv.style.display = "block";
    getGamePageDiv.style.display = "none";
    getResultsDiv.style.display = "none";
    getInputInfoDiv.style.display = "none";
  });

  // ! btnQuit
  $(document).on('touchstart click', '#btnQuit', function () {
    initialClickEvent = true;
    getHomeDiv.style.display = "block";
    getGamePageDiv.style.display = "none";
    getResultsDiv.style.display = "none";
    getInputInfoDiv.style.display = "none";
  });

  // ! btnBegin
  $(document).on('touchstart click', '#btnBegin', function () {
    // Retrieve words/quotes from API and place into an array
    initialClickEvent = false;
    getHomeDiv.style.display = "none";
    getGamePageDiv.style.display = "none";
    getResultsDiv.style.display = "none";
    getInputInfoDiv.style.display = "block";
    // ! need to change this ID to a better one.
    var queryURL =
      "https://cors-anywhere.herokuapp.com/" + "https://opinionated-quotes-api.gigalixirapp.com//v1/quotes?rand=t&n=1&author=pearce&tags=future,transhumanism"
    var queryURLquotes = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response.quotes[0].quote)
      var quotes = response.quotes[0].quote
      var splitQuote = quotes.replace(/(\b(\w{1,3})\b(\W|$))/g, '').split(/\s+/);
      console.log(splitQuote)
      for (let i = 0; i < splitQuote.length; i++) {
        selectionsArray.push(splitQuote[i])
      }
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
        roundArray = randomizeSelectionArray(selectionsArray);
        console.log("it works" + roundArray)
      });
    });
  });

  // ! next-team
  $("#next-team").on("touchstart click", function () {
    console.log("#next-team calls nextWord");
    nextWord();
    console.log("#next-team calls playerRun");
    playerRun();
  })

  // ! correct
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

  // ! incorrect
  $("#incorrect").on("touchstart click", function () {
    // TODO Add hide/show
    console.log("#incorrect calls nextWord");
    nextWord();
  });

  // ! next-round
  $("#next-round").on("touchstart click", function () {
    // TODO Add hide/show
    console.log("#next-round calls nextRound");
    nextRound();
  });

  // ! restart
  $("#restart").on("touchstart click", function () {
    // TODO Add hide/show
    console.log("#restart calls reset");
    reset();
  });

  // ! THIS KICKS OFF after pressing Play
  $("#play-game-btn").on("touchstart click", game);

}); // end of $(document).ready(function()
// END OF FILE