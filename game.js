// Arrays
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];



// trigger next sequence function
function nextSequence() {
  level++;
  userClickedPattern = [];
  $("h1").text("Level " + level);
  // random number and color
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  // random audio
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  gamePattern.push(randomChosenColor);
  // random animate
  $("#" + randomChosenColor).fadeOut(50).fadeIn(50);
  audio.play();
}



// button's click function
$(".btn").click(function () {
  var userChosenColor = this.id;
  animatePress(this);
  var buttonSound = new Audio("sounds/" + userChosenColor + ".mp3");
  buttonSound.play();
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
});



// button's animation function
function animatePress(currentColor) {
  $(currentColor).addClass("pressed");

  setTimeout(function () {
    $(currentColor).removeClass("pressed");
  }, 50);
}



// keydown function
var pressed = false;
var level = 0;

$(document).keydown(function () {
  if (!pressed) {
    nextSequence();
    pressed = true;
  }
  $("h2").text("");
});



//  Check Answer function
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    var count = 0;
    for (var i = 0; i < gamePattern.length; i++) {
      if (gamePattern[i] === userClickedPattern[i]) {
        count++;
      }
    }

     // if the answer is right 
    if (count === gamePattern.length) {
      console.log("success");
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

     // but if the answer is wrong
  } else {
    console.log("wrong");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("<strong>Game Over!</strong><br> <br>Press Any Key to Restart");
    startOver();
  }
}



// Reset variables function
function startOver() {
  level = 0;
  gamePattern = [];
  pressed = false;
}




