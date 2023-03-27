var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var first = false;
var level = 0;
$(document).keypress(function (event) {
    if (first == false) {
        first = true;
        nextSequence();
    }

});


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var colourButton = "button." + randomChosenColour;
    $(colourButton).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

var userChosenColour;

for (let i = 0; i < $("button").length; i++) {
    $("button").eq(i).click(function () {
        userChosenColour = $("button").eq(i).attr("class");
        playSound(userChosenColour);
        animatePress(userChosenColour);
        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    });
}

function playSound(name) {
    switch (name) {
        case 'blue':
            var audio = new Audio("sounds/blue.mp3");
            audio.play();
            break;
        case 'green':
            var audio = new Audio("sounds/green.mp3");
            audio.play();
            break;
        case 'red':
            var audio = new Audio("sounds/red.mp3");
            audio.play();
            break;
        case 'yellow':
            var audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break;
        default:
            console.log("Wrong Choice !");
            break;
    }
}

function animatePress(currentColour) {
    $("button." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("button." + currentColour).removeClass("pressed");
    }, 100);
}



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    first = false;
}