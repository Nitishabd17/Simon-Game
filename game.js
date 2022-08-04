var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];  //3

var level=0;
var started = false ;

// document.querySelectorAll("button").addEventListner("click",newSequence())
//$("button").on("click",newSequence());

$(".btnnn").click(function(){
  if(!started){
    $(".btnnn").text("Started");
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
});


function nextSequence()
{
  userClickedPattern = [];
  level = level + 1;
  $("h1").text("Level "+level);

  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour); //33
}

$(".btnn").click(function(){

  var userChosenColour = $(this).attr("id");  //2

  userClickedPattern.push(userChosenColour);  //4

  playSound(userChosenColour); //44

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else
  {
    var music = new Audio("sounds/wrong.mp3");
                music.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
      },200);

    startOver();
    console.log("wrong pattern");
  }
}

function startOver()
{
  $("h1").text("Game Over, Press Any Key to Restart");
  $(".btnnn").text("Click to Restart");
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name)  // 22
{
  var music = new Audio("sounds/"+name+".mp3");
              music.play();
  // (new Audio("sounds/"+name+".mp3")).play();
}

function animatePress(currentColour)  //111
{
    // $("#"+currentColour).addClass("pressed").delay(100).removeClass("pressed");  //222
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
      $("#"+currentColour).removeClass("pressed");
    },100);
}
