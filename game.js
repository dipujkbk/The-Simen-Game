var gamePattern = [];
var buttonColours = ["red", "blue", "green","yellow"];
var userClickedPattern = [];



var started = false;
var level =0;

$(document).keydown(function(){
   if(!started){

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
   }
})


$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        // If the user got the most current index right in step 3, then check that is it the last index of their sequence,if its is call next wequence
        if(userClickedPattern.length === gamePattern.length) {
            
            // Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        //Call startOver() if the user gets the sequence wrong.
        startOver();
    }

}

function nextSequence(){

    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}





function playSound(colourName){
    var audio = new Audio("sounds/" + colourName + ".mp3");
    audio.play();
}


function animateColour(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}