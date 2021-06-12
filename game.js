//Count down clock
//Shop [Pop up to add life] when count down hit zero

//introduction page [3 button]
//Difficulty level - "speed & random bombs"
//Use jquery to set box - on click, set up game board


//multiply by number of boxes       Difficulty Level
// fixed box, random mix


//Game board layout using Jquery
//create timer so that while loop is over within 15 second

//Initialiser
let points = ["5 points", "10 points", "20 points", "bomb"] //for random selector
let speed = [160, 120, 80]
let x = 0           //for while loop
let life = 3        //life decrease with "bomb"
let attempt = 3     //attempt increased with attemptTrigger()
let score = 0

//wave speed                        Stages
let base = speed[2]
let replay = speed[2] * 16

//number of wave.
let wave = 3 // 3 wave only

//Main game play
$(".btn_header").on("click", () => {
    gamePlay = () => {
        while (x < wave) {
            setTimeout(() => {
                for (let i = 1; i < 18; i++) {
                    setTimeout(() => {
                        $attemptTrigger //stop +1 causing color to stop running
                        $(".scorePoints").text(score)
                        attempt === 0 ? [x, i] = [100, 20] :
                            $(".box" + i).addClass("itBox")
                        attempt === 0 ? [x, i] = [100, 20] :
                            $(".box" + (i - 1)).removeClass("itBox")
                    }, i * base) //for loop timer
                }
            }, x * replay) //while loop timer
            x++
        }
        $("body").on("keydown", $result())
        console.log("$result")
        //If live === 0, pop up, else continue game. 
        //trigger $result = result popup & replay button
    }
    gamePlay()
})

//Trigger Pop Up after 3 attempt
$result = () => {
    if (attempt === 0) {
        console.log("popup")
        for (let y = 1; y < 18; y++) {
            if ($(".box" + y).attr("class").includes("itBox")) {
                $resultBox = $("<div>").addClass("resultBox")
                $resultValue = $("<p>").addClass("resultValue").text(score)
                $playAgainBtn = $("<button>").addClass("playAgainButton")
                $(".container").append($resultBox.append($resultValue))
                $(".box" + y).removeClass("itBox")
                if (life > 0) {
                    $buyALife = $("<p>").addClass("buyALife").text("Need a boost? Get one life for only 10 points!")
                    $buyButton = $("<button>").addClass("buyButton").text("Buy Now!")
                    $resultBox.append($buyALife).append($buyButton).append($playAgainBtn.text("Next Level"))
                    //change playAgainBtn
                }
                else $(".playAgainButton").text("Game Over :(")

            }
            $playAgain = $(".playAgainButton").on("click", () => { //Play Again Button
                attempt = 3;
                x = 0
                score = 0
                console.log("remove")
                $resultBox.remove()
                // gamePlay() // can't trigger game. click start game to restart game.

            })
            $playAgain
        }
    }
}

//Stop Light Runner On Keydown
$attemptTrigger = $("body").on("keydown", () => {
    attempt--
    for (let y = 1; y < 18; y++) {
        if ($(".box" + y).css("background") === "rgb(255, 215, 0) none repeat scroll 0% 0% / auto padding-box border-box") {
            if ($(".box" + y).text() === "Bomb") {
                score -= 20
            }
            else score += parseInt($(".box" + y).children().attr("value"))
        }
    }
})

// Footer Section
$footer = $("<div>").addClass("footer")

//Level indicator
$level = $("<div>").addClass("level").text("level indicator")
$footer.append($level)

//Life board
$lifeContainer = $("<div>").addClass("life").text("life test")
$footer.append($lifeContainer)

//Score board
$scoreContainer = $("<div>").addClass("scoreContainer")
$scoreTitle = $("<h3>").addClass("scoreTitle").text("Score")
$scorePoints = $("<p>").addClass("scorePoints").text(score)
$("body").append($footer.append($scoreContainer.append($scoreTitle).append($scorePoints)))
