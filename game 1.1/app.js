// BUG //
// Quick space while button not fully hidden
// keydown trigger before page ready [Add await]

// to do //
// create array of messages
// hide jquery for animation

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
let attempt = 3
let life = 3
let score = 0
let $gridValue = 9
let difficulty = "easy"

/////////////////////////////////////////////////////////
// Shit Talk
/////////////////////////////////////////////////////////

winner = []
loser = []
buyLifeFailed = []
negativePoints = []

/////////////////////////////////////////////////////////
// Buttons (3 Selection [3x3, 4x4, 5x5])
/////////////////////////////////////////////////////////

const gridBtnContainer = $("<div>").addClass("gridBtnContainer")
const $3x3 = $("<button>").addClass("gridBtn 3x3Btn").text("3x3").attr("value", 9)
const $4x4 = $("<button>").addClass("gridBtn 4x4Btn").text("4x4").attr("value", 16)
const $5x5 = $("<button>").addClass("gridBtn 5x5Btn").text("5x5").attr("value", 25)

$("body").append(gridBtnContainer.append($3x3).append($4x4).append($5x5))


/////////////////////////////////////////////////////////
// Select Difficulty Stage
/////////////////////////////////////////////////////////

const $gameDifficulty = $("<div>").addClass("gameDifficulty hide")
const $easy = $("<button>").addClass("difBtn easy").text("Easy").attr("value", "easy")
const $normal = $("<button>").addClass("difBtn normal").text("Normal").attr("value", "normal")
const $hard = $("<button>").addClass("difBtn hard").text("Hard").attr("value", "hard")
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

const $resultBoxWin = $("<div>").addClass("resultBox")
const $resultBoxLose = $("<div>").addClass("resultBox")
const $resultValueWin = $("<p>").addClass("resultValue")
const $resultValueLose = $("<p>").addClass("resultValue")

const buyALifeText = $("<p>").addClass("buyALife").text("Need a boost? Get one life for only 10 points!")
const $buyButton = $("<button>").addClass("buyButton").text("Buy Now!")
const $continue = $("<button>").addClass("continue").text("Continue")

const $restart = $("<p>").addClass("restart").text("Game over loser!")
const $playAgainBtn = $("<button>").addClass("playAgainButton").text("Try again!")

const $resultBoxWinContainer = $resultBoxWin.append($resultValueWin).append(buyALifeText).append($buyButton).append($continue)
const $resultBoxLoseContainer = $resultBoxLose.append($resultValueLose).append($restart).append($playAgainBtn)

/////////////////////////////////////////////////////////
// Function
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
// Build Board (3 Selectin [3x3, 4x4, 5x5])
/////////////////////////////////////////////////////////

const buildBoard = () => {
    $(".gridBtnContainer").toggle(".hide")
    $(".gameDifficulty").toggle(".hide")
    $(".footerContainer").toggle(".hide")
    $(".playBtn").toggle(".hide")
    $(".grid").remove()      //assign button with value
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

/////////////////////////////////////////////////////////
// Difficulty Selection
/////////////////////////////////////////////////////////

$(".gridBtn").on("click", (event) => {
    $gridValue = $(event.target).attr("value")
    const target = $(event.target)
    $(".gridBtn").removeClass("btnClicked")
    target.addClass("btnClicked")
    $(".gameDifficulty").removeClass("hide")
})

$(".difBtn").on("click", (e) => {
    difficulty = $(e.target).attr("value")
    buildBoard()
})

/////////////////////////////////////////////////////////
// Difficulty Stage         //      Return number of bomb
/////////////////////////////////////////////////////////

boardDifficulty = (difficulty) => {
    if (difficulty === "easy") {
        return numBomb = Math.ceil(0.2 * $gridValue)
    }

    if (difficulty === "normal") {
        return numBomb = Math.ceil(0.4 * $gridValue)
    }
    if (difficulty === "hard") {
        return numBomb = Math.ceil(0.6 * $gridValue)
    }
}

/////////////////////////////////////////////////////////
// Return mixed array filled with outcome
/////////////////////////////////////////////////////////

boardMixer = (numBomb) => {
    const arr = Array(parseInt($gridValue)).fill("?")

    const remainder = arr.length - parseInt(numBomb)
    const split = Math.floor(remainder / 6)
    const arrayBomb = Array(numBomb).fill("BOMB")
    const fivePoints = Array(split * 3).fill("5 Points")
    const tenPoints = Array(split * 2).fill("10 Points")
    const twentyPoints = Array(split).fill("20 Points")

    let selection = arrayBomb.concat(fivePoints).concat(tenPoints).concat(twentyPoints)
    while (selection.length < $gridValue) {
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
    let moveSpeed = 180 - (stage * 20)

    if (moveSpeed <= 60) {
        return 60
    }
    return moveSpeed
}

/////////////////////////////////////////////////////////
// Main Game Function
/////////////////////////////////////////////////////////

startGame = async () => {
    $lifePoints.text(life)
    $stagePoints.text(stage)
    $scorePoints.text(score)

    let numBomb = boardDifficulty(difficulty)
    let mixedArray = boardMixer(numBomb)

    for (let a = 0; a < $gridValue; a++) {
        $(".boxText" + a).text(mixedArray[a])
    }

    while (attempt > 0 && life > 0) {
        let i = 0
        while (i < parseInt($gridValue) + 1) {
            await sleep(speed())
            $attemptTrigger //stop +1 causing color to stop running
            attempt === 0 || life === 0 ? i = 100 :
                $(".box" + i).addClass("itBox")
            attempt === 0 || life === 0 ? i = 100 :
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
    for (let y = 0; y < $gridValue; y++) {
        if ($(".box" + y).attr("class").includes("itBox")) {
            if ($(".box" + y).text() === "BOMB") {
                score <= 20 ? score = 0 : score -= 20
                life--
            }
            else if ($(".box" + y).text() === "5 Points") {
                score += 5
            }
            else ($(".box" + y).text() === "10 Points") ? score += 10 : score += 20
        }
    }
    if (attempt === 0 || life === 0) {
        $result()
    }
    $(".scorePoints").text(score)
    $(".lifePoints").text(life)
})


/////////////////////////////////////////////////////////
// Result Trigger // Trigger Pop Up after 3 attempt //
/////////////////////////////////////////////////////////

$result = () => {
    if (life > 0) {
        $resultValueWin.text(score + " Points")
        $(".grid").append($resultBoxWinContainer)
    }
    else {
        $resultValueLose.text(score + " Points")
        $(".grid").append($resultBoxLoseContainer)
    }
    $playAgainBtn.on("click", () => {
        attempt = 3;
        life = 3
        stage = 1
        score = 0
        $resultBoxLoseContainer.remove()
        $(".box").removeClass("itBox")
        startGame()
    })
    $continue.on("click", () => {
        attempt = 3;
        stage++
        $resultBoxWinContainer.remove()
        $(".box").removeClass("itBox")
        startGame()
    })
    $buyButton.on("click", () => {
        if (score >= 10) {
            life++
            score -= 10
            $resultValueWin.text(score)
            console.log(score)
        }
        else $resultValueWin.text(`${score} ${"shittalk"}`)
    })
}