// Global Variables
var validateTeamInput = document.getElementById("inputTeams");
var validateRoundsInput = document.getElementById("inputRounds");

//Validate that BOTH fields are FILLED and NUMERIC
if (($.isNumeric("#inputTeams") == true) && ($.isNumeric("#inputRounds") == true)) {
  // Then Check for not null
  if ((validateTeamInput != null) || (validateRounds != null)) {
    // Then check for teams and rounds 5 or less
    if ((validateTeamInput.parseInt.trim <= 5) && (validateRounds.parseInt.trim <= 5)) {
      // Then the rounds and teams are correctly less than 5
    }
    else {
      $("#messageBox").text("No more than 5 teams and 5 rounds allowed");
    }
  }
  else {
    $("#messageBox").text("Please enter both # of Teams and # of Rounds");
  }
}
else {
  $("#messageBox").text("Please enter integer numbers only");
}