let level = 1
let gameSize = 9
let attempt = 3
let life = 3

/////////////////////////////////////////////////////////
// Buttons (3 Selectin [3x3, 4x4, 5x5])
/////////////////////////////////////////////////////////

const gridBtnContainer = $("<div>").addClass("gridBtnContainer")
const $3x3 = $("<button>").addClass("gridBtn 3x3Btn").text("3x3").attr("value", 9)
const $4x4 = $("<button>").addClass("gridBtn 4x4Btn").text("4x4").attr("value", 16)
const $5x5 = $("<button>").addClass("gridBtn 4x4Btn").text("5x5").attr("value", 25)

$("body").append(gridBtnContainer.append($3x3).append($4x4).append($5x5))

/////////////////////////////////////////////////////////
// Build Board (3 Selectin [3x3, 4x4, 5x5])
/////////////////////////////////////////////////////////

const buildBoard = (e) => {
    const $footerContainer = $("<div>").addClass("footer hide")
    $(".gridBtnContainer").toggle(".hide")
    $(".footerContainer").toggle(".hide")
    $(".playBtn").toggle(".hide")
    $(".grid").remove()
    const $gridValue = $(e.target).attr("value")
    gameSize = $gridValue      //assign button with value
    const $grid = $("<div>").addClass("grid grid" + $gridValue)

    const numBomb = boardDifficulty()
    const mixedArray = boardMixer(numBomb)

    for (i = 0; i < $gridValue; i++) {
        const $boxP = $("<p>").addClass("boxText" + i).text(mixedArray[i])
        $grid.append($("<div>").addClass("box box" + i).append($boxP))
    }

    $("body").append($grid).append($footerContainer.append($("<button>").addClass("playBtn").text("Start Game!")).append($scoreContainer))

    $(".playBtn").on("click", startGame)
}

$(".gridBtn").on("click", buildBoard)


/////////////////////////////////////////////////////////
// Select Difficulty Level
/////////////////////////////////////////////////////////

// $select = $("<select>").addClass("select")
// $selectEasy = $("<option>").addClass("selectEasy").attr("value", "Easy").text("Easy")
// $selectNormal = $("<option>").addClass("selectNormal").attr("value", "Normal").text("Normal")
// $selectHard = $("<option>").addClass("selectHard").attr("value", "Hard").text("Hard")
// $("body").append($select.append($selectEasy).append($selectNormal).append($selectHard))

/////////////////////////////////////////////////////////
// Return number of bomb
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

    let selection = Array(numBomb).fill("BOMB").concat(Array(split * 3).fill("5 Points")).concat(Array(split * 2).fill("10 Points")).concat(Array(split).fill("20 Points"))
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
// Speed Control // Level 1, 2, 3
/////////////////////////////////////////////////////////

const speed = () => {
    if (level === 1) {
        moveSpeed = 160
    }
    else moveSpeed = level === 2 ? 120 : 80
    return moveSpeed
}

/////////////////////////////////////////////////////////
// Start Game!
/////////////////////////////////////////////////////////

startGame = () => {
    let wave = 3     //Not used
    let x = 0
    score = 0
    $scoreContainer.append($scoreTitle).append($scorePoints.text(score))

    while (x < wave) {
        setTimeout(() => {
            for (let i = 0; i < gameSize + 1; i++) {
                setTimeout(() => {
                    $attemptTrigger //stop +1 causing color to stop running
                    attempt === 0 ? [x, i] = [3, 20] :
                        $(".box" + i).addClass("itBox")
                    attempt === 0 ? [x, i] = [3, 20] :
                        $(".box" + (i - 1)).removeClass("itBox")
                }, i * speed()) //for loop timer
            }
        }, (x * speed() * gameSize)) //while loop timer
        x++
    }
    //Stop Light Runner On Keydown
    $attemptTrigger = $("body").on("keydown", () => {
        attempt--
        $result()
        for (let y = 0; y < gameSize; y++) {
            if ($(".box" + y).attr("class").includes("itBox")) {
                if ($(".box" + y).text() === "BOMB") {
                    score -= 20
                }
                else if ($(".box" + y).text() === "5 Points") {
                    score += 5
                }
                else ($(".box" + y).text() === "10 Points") ? score += 10 : score += 20
            }
        }
        $(".scorePoints").text(score)
    })
    $(".playBtn").toggle(".hide")
}



/////////////////////////////////////////////////////////
// Render Game
/////////////////////////////////////////////////////////

//$render = (gameData) => {
//grid.append(gameData)
// }


/////////////////////////////////////////////////////////
// Score Board
/////////////////////////////////////////////////////////

$scoreContainer = $("<div>").addClass("scoreContainer")
$scoreTitle = $("<h3>").addClass("scoreTitle").text("Score")
$scorePoints = $("<p>").addClass("scorePoints")


/////////////////////////////////////////////////////////
// Result Trigger // Trigger Pop Up after 3 attempt //
/////////////////////////////////////////////////////////

$result = () => {
    if (attempt === 0) {
        for (let y = 0; y < gameSize; y++) {
            if ($(".box" + y).attr("class").includes("itBox")) {
                const $resultBox = $("<div>").addClass("resultBox")
                const $resultValue = $("<p>").addClass("resultValue").text(score)
                $(".grid").append($resultBox.append($resultValue))
                $(".box" + y).removeClass("itBox")
                if (life > 0) {
                    const $buyALife = $("<p>").addClass("buyALife").text("Need a boost? Get one life for only 10 points!")
                    const $buyButton = $("<button>").addClass("buyButton").text("Buy Now!")
                    const $continue = $("<button>").addClass("continue").text("Continue")
                    $resultBox.append($buyALife).append($buyButton).append($continue)
                }
                else $resultBox.append($("<button>").addClass("playAgainButton").text("Game Over :("))


            }
            $playAgain = $(".playAgainButton").on("click", () => { //Play Again Button
                attempt = 3;
                x = 0
                score = 0
                console.log("remove")
                $resultBox.remove()
                // gamePlay() // can't trigger game. click start game to restart game.

            })
            $continue = $(".continue").on("click", () => { //Play Again Button
                x = 0
                $resultBox.remove()
            }) //create all DOM and use class to hide
        }
    }
}

//if life > 0
//level +1