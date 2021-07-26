var level = 0;

var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started= false;


        // STARTING THE GAME//(doubt)
$(document).on("keydown", function ()  
{  
   if(!started)
   {
    $("h1").text("Level " + level);
    started=true;
    
    nextSequence();
   }
});
  

          // CLICKING BLOCKS//
 
$(".btn").on("click", function () {
  // stores the chosen color//
  var userChoseColor = $(this).attr("id");
  // pushes chosen color to UserClickedPattern array//
  userClickedPattern.push(userChoseColor);
  playSound(userChoseColor);
  animatePress(userChoseColor);
  // checks answer//
  checkAnswer(userClickedPattern.length-1);
  
});












        //  functions   //

         

function nextSequence() {
    $("h1").text("Level "+level); 
    level++;
    
    // RESETTING THE USER CLICKED SEQUENCE//
    userClickedPattern=[];

    // GENERATING RANDOM COLOR AND PUSHING INTO GAMEPATTERN ARRAY//
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    // RANDOM COLOR ANIMATION//
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  
}

// CHECKING ANSWER//
function checkAnswer(currentLevel)
{   

  // CHECKING IF THE SELECTED COLOR IS SAME AS THE COMPUTER GEN COLOR OF SAME INDEX
     if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
     {
       console.log("Success!")
     
          // IF YES, THEN CHECKING IF THE NUMBER OF ELEMENTS IN BOTH ARRAYS ARE SAME OR NOT//
          if(gamePattern.length===userClickedPattern.length)
          {
            setTimeout(function()
            {
              nextSequence();
            }, 1500);
          }
        }
      
      
        // IF NO IN EITHER CASES, THEN CALLING THE WRONG FUNCTION WHICH WOULD CALL THE RESET FUNCTION 
      else
      {
        console.log("wrong");
        wrong();
      }    
    
   
}


// WHAT TO DO WHEN WRONG//
function wrong()
{
   
   $("h1").html("Game Over, Press any key to restart");

  $("body").addClass("game-over");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  setTimeout(function()
  {
    $("body").removeClass("game-over");
  },1000);

// CALLING RESTART FUNCTION//
startOver();

}


// RESETTING GAMEPATTERN ARRAY, LEVEL AND STARTED FOR THE GAME TO RESTART//
function startOver()
{
  level=0;
  started=false;
  gamePattern=[];

}




// PLAYING SOUND//
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// ANIMATION//
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
  //    why not passing currentColour as a parameter in setTimeout ?//
}
