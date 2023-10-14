let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let start = false;
let level = 0;

function playSound(name) {
	let audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}
function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}
function nextSequence() {
	level++;
	$("#level-title").text("Level " + level);
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	$("#" + randomChosenColour)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomChosenColour);
}
function startOver() {
	level = 0;
	gamePattern = [];
	userClickedPattern = [];
	start = false;
}
function checkAnswer(currentLevel) {
	// console.log(gamePattern);
	// console.log(userClickedPattern);
	// console.log(currentLevel);
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("success");
		if (gamePattern.length === userClickedPattern.length) {
			setTimeout(function () {
				nextSequence();
				userClickedPattern = [];
			}, 1000);
		}
	} else {
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 250);
		$("#level-title").text("Game Over. Press any key to restart.");
		startOver();
	}
}

$(document).keydown(function (event) {
	if (!start) {
		console.log(event.key)
		$("#level-title").text("Level " + level);
		nextSequence();
		start = true;
	}
});

$(".btn").click(function () {
	if (start) {
		let userChosenColour = $(this).attr("id");
		userClickedPattern.push(userChosenColour);
		// console.log(userClickedPattern);
		playSound(userChosenColour);
		animatePress(userChosenColour);
		checkAnswer(userClickedPattern.length - 1);
	}
});
