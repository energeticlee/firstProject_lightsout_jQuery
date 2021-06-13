// BUG //
// stage 2 when life = 0 trigger both continue and tryagain button

// to do //
// Radio button to select difficulty Stage
// Buy button to decrease point and increase life
// hide jquery for animation
// fixed negative points

/////////////////////////////////////////////////////////
// Code Map
/////////////////////////////////////////////////////////

//  Base Value

//  Layout | Jquery
//      Buttons
//      Select Difficulty Stage
//      Footer Container
//      Score Board
//      Result Box

//  Function
//      Build Board         | 3x3, 4x4, 5x5
//      Difficulty Stage    | Determine number of bomb
//      Mixed array         | Randomizer
//      Speed Control       | Stage
//      Start Game          | Main game function
//      Sleep               | Await function
//      Trigger Attempt     | Decrease Attempt
//      Result Trigger      | Display Result

/////////////////////////////////////////////////////////
// Base Value
/////////////////////////////////////////////////////////


let stage = 1
let gameSize = 9
let attempt = 3
let life = 3
let score = 0
let $gridValue = 0

/////////////////////////////////////////////////////////
// Buttons (3 Selection [3x3, 4x4, 5x5])
/////////////////////////////////////////////////////////

const gridBtnContainer = $("<div>").addClass("gridBtnContainer")
const $3x3 = $("<button>").addClass("gridBtn 3x3Btn").text("3x3").attr("value", 9)
const $4x4 = $("<button>").addClass("gridBtn 4x4Btn").text("4x4").attr("value", 16)
const $5x5 = $("<button>").addClass("gridBtn 4x4Btn").text("5x5").attr("value", 25)

$("body").append(gridBtnContainer.append($3x3).append($4x4).append($5x5))


/////////////////////////////////////////////////////////
// Select Difficulty Stage
/////////////////////////////////////////////////////////

const $gameDifficulty = $("<div>").addClass("gameDifficulty")
const $easy = $("<input>").addClass("easy").attr("type", "radio")
const $normal = $("<input>").addClass("normal").attr("type", "radio")
const $hard = $("<input>").addClass("hard").attr("type", "radio")
$("body").append($gameDifficulty.append($easy).append($normal).append($hard))

/////////////////////////////////////////////////////////
// Footer Container
/////////////////////////////////////////////////////////

const $footerContainer = $("<div>").addClass("footer hide")

/////////////////////////////////////////////////////////
// Life
/////////////////////////////////////////////////////////

const $lifeContainer = $("<div>").addClass("lifeContainer")
const $lifeTitle = $("<h3>").addClass("lifeTitle").text("Life")
const $lifePoints = $("<p>").addClass("lifePoints")

/////////////////////////////////////////////////////////
// Stage Board
/////////////////////////////////////////////////////////

const $stageContainer = $("<div>").addClass("stageContainer")
const $stageTitle = $("<h3>").addClass("stageTitle").text("Stage")
const $stagePoints = $("<p>").addClass("stagePoints")

/////////////////////////////////////////////////////////
// Score Board
/////////////////////////////////////////////////////////

const $scoreContainer = $("<div>").addClass("scoreContainer")
const $scoreTitle = $("<h3>").addClass("scoreTitle").text("Score")
const $scorePoints = $("<p>").addClass("scorePoints")

/////////////////////////////////////////////////////////
// Result Box
/////////////////////////////////////////////////////////

const $resultBox = $("<div>").addClass("resultBox")
const $resultValue = $("<p>").addClass("resultValue")

const $buyALife = $("<p>").addClass("buyALife").text("Need a boost? Get one life for only 10 points!")
const $buyButton = $("<button>").addClass("buyButton").text("Buy Now!")
const $continue = $("<button>").addClass("continue").text("Continue")

const $restart = $("<p>").addClass("restart").text("Game over loser!")
const $playAgainBtn = $("<button>").addClass("playAgainButton").text("Try again!")

/////////////////////////////////////////////////////////
// Function
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
// Build Board (3 Selectin [3x3, 4x4, 5x5])
/////////////////////////////////////////////////////////

const buildBoard = (e) => {
    $(".gridBtnContainer").toggle(".hide")
    $(".footerContainer").toggle(".hide")
    $(".playBtn").toggle(".hide")
    $(".grid").remove()
    $gridValue = $(e.target).attr("value")
    gameSize = $gridValue      //assign button with value
    const gridContainer = $("<div>").addClass("gridContainer")
    const $grid = $("<div>").addClass("grid grid" + $gridValue)

    for (let i = 0; i < $gridValue; i++) {
        const $boxP = $("<p>").addClass("boxText" + i).text("?")
        $grid.append($("<div>").addClass("box box" + i).append($boxP))
    }

    $("body").append(gridContainer.append($grid)).append($footerContainer.append($("<button>").addClass("playBtn").text("Start Game!")).append($lifeContainer).append($scoreContainer).append($stageContainer))
    $lifeContainer.append($lifeTitle).append($lifePoints.text(life))
    $scoreContainer.append($scoreTitle).append($scorePoints.text(score))
    $stageContainer.append($stageTitle).append($stagePoints.text(stage))

    $(".playBtn").on("click", () => {
        startGame();
        $(".playBtn").toggle(".hide")
    })
}

$(".gridBtn").on("click", buildBoard)


/////////////////////////////////////////////////////////
// Difficulty Stage         //      Return number of bomb
/////////////////////////////////////////////////////////

boardDifficulty = (difficulty = "Easy") => {
    if (difficulty === "Easy") {
        return numBomb = Math.ceil(0.2 * gameSize)
    }

    if (difficulty === "Normal") {
        return numBomb = Math.ceil(0.4 * gameSize)
    }
    if (difficulty === "Hard") {
        return numBomb = Math.ceil(0.6 * gameSize)
    }
}

/////////////////////////////////////////////////////////
// Return mixed array filled with outcome
/////////////////////////////////////////////////////////

boardMixer = (numBomb) => {
    const arr = Array(parseInt(gameSize)).fill("?")

    const remainder = arr.length - parseInt(numBomb)
    const split = Math.floor(remainder / 6)
    const arrayBomb = Array(numBomb).fill("BOMB")
    const fivePoints = Array(split * 3).fill("5 Points")
    const tenPoints = Array(split * 2).fill("10 Points")
    const twentyPoints = Array(split).fill("20 Points")

    let selection = arrayBomb.concat(fivePoints).concat(tenPoints).concat(twentyPoints)
    while (selection.length < gameSize) {
        selection.push("5 Points")
    }
    for (let i = selection.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = selection[i];
        selection[i] = selection[j];
        selection[j] = temp;
    }
    return selection
}

/////////////////////////////////////////////////////////
// Speed Control // Stage 1, 2, 3
/////////////////////////////////////////////////////////

const speed = () => {
    if (stage === 1) {
        moveSpeed = 160
    }
    else moveSpeed = stage === 2 ? 120 : 80
    return moveSpeed
}

/////////////////////////////////////////////////////////
// Main Game Function
/////////////////////////////////////////////////////////

startGame = async () => {
    $lifePoints.text(life)
    $stagePoints.text(stage)
    $scorePoints.text(score)

    let numBomb = boardDifficulty()
    let mixedArray = boardMixer(numBomb)

    for (let a = 0; a < $gridValue; a++) {
        $(".boxText" + a).text(mixedArray[a])
    }

    while (attempt > 0 && life > 0) {
        let i = 0
        while (i < parseInt(gameSize) + 1) {
            await sleep(speed())
            $attemptTrigger //stop +1 causing color to stop running
            attempt === 0 || life === 0 ? i = 20 :
                $(".box" + i).addClass("itBox")
            attempt === 0 || life === 0 ? i = 20 :
                $(".box" + (i - 1)).removeClass("itBox")
            i++
        }
    }
}

/////////////////////////////////////////////////////////
// Sleep
/////////////////////////////////////////////////////////

sleep = (duration) => {
    return new Promise((accept) => {
        setTimeout(() => {
            accept()
        }, duration)
    }
    )
}

/////////////////////////////////////////////////////////
// Attempt Trigger
/////////////////////////////////////////////////////////

$attemptTrigger = $("body").on("keydown", () => {
    attempt--
    for (let y = 0; y < gameSize; y++) {
        if ($(".box" + y).attr("class").includes("itBox")) {
            if ($(".box" + y).text() === "BOMB") {
                score -= 20
                life--
            }
            else if ($(".box" + y).text() === "5 Points") {
                score += 5
            }
            else ($(".box" + y).text() === "10 Points") ? score += 10 : score += 20
        }
    } $result()
    $(".scorePoints").text(score)
    $(".lifePoints").text(life)
})


/////////////////////////////////////////////////////////
// Result Trigger // Trigger Pop Up after 3 attempt //
/////////////////////////////////////////////////////////

$result = () => {
    if (attempt === 0 || life === 0) {
        $resultValue.text(score)
        $(".grid").append($resultBox.append($resultValue))
        console.log("life", life)
        if (life > 0) {
            $resultBox.append($buyALife).append($buyButton).append($continue)
        }
        else $resultBox.append($restart).append($playAgainBtn)
    }

    $playAgainBtn.on("click", () => {
        attempt = 3;
        x = 0
        life = 3
        stage = 1
        score = 0
        $resultBox.remove()
        $(".box").removeClass("itBox")
        startGame()
    })
    $continue.on("click", () => {
        attempt = 3;
        x = 0
        stage++
        $resultBox.remove()
        $(".box").removeClass("itBox")
        startGame()
    })
}

// Continue button to continue game