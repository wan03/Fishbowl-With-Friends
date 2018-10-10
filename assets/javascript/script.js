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
    while (0 !== currentIndex) {      
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
    time--;
    $("#time").text(time);    
    noTime();
    emptyArray();
  }

  function noTime() {    
    if (time == 0) {
      console.log("time == 0");      
      clearInterval(playerInterval);
      playerResults();
      currentTeam++
    };
  };

  function nextWord() {
    getHomeDiv.style.display = "none";
    getGamePageDiv.style.display = "block";
    getResultsDiv.style.display = "none";
    getInputInfoDiv.style.display = "none";
    currentWord++;
    $("#word-phrase-box").text(roundArray[currentWord]);
    if (currentWord > roundArray.length) {
      currentWord = 0;
    }
  }

  function usedWords() {
    console.log(">>> usedWords() has fired");
    console.log(roundArray[currentWord]);
    selectionsArray.push(roundArray[currentWord]);
  }

  function playerResults() {
    // This fires when countdown == 0
    var winningTeam;
    getHomeDiv.style.display = "none";
    getGamePageDiv.style.display = "none";
    getResultsDiv.style.display = "block";
    getInputInfoDiv.style.display = "none";
    console.log(">>> playerResults has fired. Therefore countdown==0.");
    // TODO Tweak the visuals on the results below
    winningTeam = "Team 1"; // default
    if (correctT2 > correctT1) {
      winningTeam = "Team 2";
    }
    if (correctT3 > correctT2) {
      winningTeam = "Team 3";
    }
    if (correctT4 > correctT3) {
      winningTeam = "Team 4";
    }
    $("#divResultsSoFar").html("The results are: " +
      "<ul><li>Team 1: " +
      correctT1 + "</li>" +
      "<li>Team 2: " +
      correctT2 + "</li>" +
      "<li>Team 3: " +
      correctT3 + "</li>" +
      "<li>Team 4: " +
      correctT4 + "</li></ul>");
    $("#teamCurrentlyWinning").html("<br><p>" + winningTeam + " is the leader</p><p></p>")
    time = 30;    
}

  function nextRound() {
    console.log(">>> nextRound has fired");
    console.log("round--, therefore Press 'Next Round' Button");
    rounds--;
    currentWord = 0;
    currentTeam++    
    console.log("Call randomizeUsedArray from nextRound()");
    roundArray = randomizeSelectionArray(selectionsArray);
    time = 30;
    console.log("Call nextWord from nextRound()");
    nextWord();
    playerRun();
  }

  function emptyArray() {
    console.log(">>> emptyArray has fired");
    if (roundArray.length == 0) {
      console.log("Call nextRound from emptyArray");
      playerResults();
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
    rounds = $("#inputRounds").val(); //Not working, not sure why
    console.log(rounds);
    nextWord();
    playerRun();
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
    var queryURLquotes = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=2";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var quotes = response.quotes[0].quote
      var splitQuote = quotes.replace(/(\b(\w{1,3})\b(\W|$))[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, '').split(/\s+/);
      for (let i = 0; i < 30; i++) {
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
        for (let i = 0; i < response.length; i++) {
          selectionsArray.push(response[i].quote)
        }
        roundArray = randomizeSelectionArray(selectionsArray);
      });
    });
  });

  // ! next-team
  $("#next-team").on("touchstart click", function () {    
    console.log("#next-team calls nextWord");
    nextWord();
    console.log("#next-team calls playerRun");
    playerRun();
    if (currentTeam == 5){
      currentTeam = 1;
    }
  })

  // ! correct
  $("#correct").on("touchstart click", function () {
    // TODO Add hide/show
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

  // ! incorrect
  $("#incorrect").on("touchstart click", function () {
    // TODO Add hide/show
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