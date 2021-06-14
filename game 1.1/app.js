// Add difficulty level for highscore board
// Slow down of crusher moving in (power up)
// Start inventory
// Bomb diffuser kit

/////////////////////////////////////////////////////////
// Code Map
/////////////////////////////////////////////////////////

//  Base Value

//  Layout | Jquery
//      Array of Shit Talk
//      Buttons
//      Select Difficulty Stage
//      Grid
//      Life
//      Stage
//      Score Board
//      Footer Container
//      Score Board
//      Result Box

//  Function
//      Trigger Function    | Hide Container
//      Build Board         | 3x3, 4x4, 5x5
//      Difficulty Stage    | Determine number of bomb
//      Mixed array         | Randomizer
//      Speed Control       | Stage
//      Sleep               | Await function
//      Difficulty Selection|
//      Build Board         |
//      Start Game          | Main game function
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
let gameStartCheck = false
let crusherSpace = 0
let highScore = 0
let playerName = ""

/////////////////////////////////////////////////////////
// Shit Talk
/////////////////////////////////////////////////////////

let winner = ["Well done! Mr.Snuffles balls are saved this time!", "Yay! Mr.Snuffles get to keep his balls!"]
let loser = ["Damn.. There goes Smowball balls", "Snip Snip, bye bye balls", "Game Over Loser"]
let buyFailed = ["You don't have enough score!", "Can't count?", "What are you gonna pay with? Mr.Snuffles balls?"]

/////////////////////////////////////////////////////////
// Input Player Name
/////////////////////////////////////////////////////////

const nameInputContainer = $("<div>").addClass("nameInputContainer")
const nameInputFrame = $("<div>").addClass("nameInputFrame")
const $nameInput = $("<input>").addClass("nameInput").attr({ placeholder: "Enter player name" })
const $nameInputBtn = $("<input>").attr("type", "submit").addClass("nameInputBtn").text("Enter")
$("#playerName").append(nameInputContainer.append(nameInputFrame.append($nameInput).append($nameInputBtn)))

$nameInputBtn.on("click", (event) => {
    event.preventDefault()
    playerName = $nameInput.val()
    $nameInput.val("")
    $highscoreNameTitle.text("Name")
    $highscoreName.text(playerName)
    nameInputContainer.slideUp(400)
})

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
// Highscore
/////////////////////////////////////////////////////////

const highScoreMainContainer = $("<div>").addClass("highScoreMainContainer")

const $highScoreNameContainer = $("<div>").addClass("highScoreNameContainer")
const $highscoreNameTitle = $("<h4>").addClass("highScoreTitle highScoreBoard")
const $highscoreName = $("<p>").addClass("highScoreName").text(playerName)

const $highScoreContainer = $("<div>").addClass("highScoreContainer")
const $highScoreTitle = $("<h4>").addClass("highScoreTitle highScoreBoard")
const $highscore = $("<p>").addClass("highScorePoints")
$("body").append(highScoreMainContainer.append($highScoreNameContainer.append($highscoreNameTitle).append($highscoreName)).append($highScoreContainer.append($highScoreTitle).append($highscore)))

/////////////////////////////////////////////////////////
// Game Rules
/////////////////////////////////////////////////////////

const gameRuleContainer = $("<div>").addClass('gameRuleContainer')
const gameRuleTitle = $("<ul>").addClass("gameRuleTitle").text("Game Rules")
const gameRuleIcon = $("<img>").addClass("gameRuleIcon").attr("src", "./arrow.png")
const rule1 = $("<li>").addClass("rule rule1").text("You lose if Life = 0 or Scissors reaches Mr.Snuffles, You Lose")
const rule2 = $("<li>").addClass("rule rule1").text("Bomb = -20 Points & -1 Life")
const rule3 = $("<li>").addClass("rule rule1").text("Reset to end game & log highscore!")

$("body").append(gameRuleContainer.append(gameRuleTitle.append(gameRuleIcon)).append(rule1, rule2, rule3))

$(".gameRuleTitle").on("click", () => {
    $(".rule").slideToggle(300)
    $(".gameRuleIcon").toggleClass("clickRotate")
})
/////////////////////////////////////////////////////////
// Grid
/////////////////////////////////////////////////////////

const $gridContainer = $("<div>").addClass("gridContainer hide")
const $grid = $("<div>").addClass("grid hide")
$("body").append($gridContainer.append($grid))


const $playBtn = $("<button>").addClass("playBtn hide").text("Start Game!")


/////////////////////////////////////////////////////////
// Life
/////////////////////////////////////////////////////////

const $lifeContainer = $("<div>").addClass("lifeContainer hide")
const $lifeTitle = $("<h3>").addClass("lifeTitle footerBoard").text("Life")
const $lifePoints = $("<p>").addClass("lifePoints")
$lifeContainer.append($lifeTitle).append($lifePoints.text(life))


/////////////////////////////////////////////////////////
// Stage
/////////////////////////////////////////////////////////

const $stageContainer = $("<div>").addClass("stageContainer hide")
const $stageTitle = $("<h3>").addClass("stageTitle footerBoard").text("Stage")
const $stagePoints = $("<p>").addClass("stagePoints")
$stageContainer.append($stageTitle).append($stagePoints.text(stage))


/////////////////////////////////////////////////////////
// Score Board
/////////////////////////////////////////////////////////

const $scoreContainer = $("<div>").addClass("scoreContainer hide")
const $scoreTitle = $("<h3>").addClass("scoreTitle footerBoard").text("Score")
const $scorePoints = $("<p>").addClass("scorePoints")
$scoreContainer.append($scoreTitle).append($scorePoints.text(score))

/////////////////////////////////////////////////////////
// Footer Container
/////////////////////////////////////////////////////////

const $footerContainer = $("<div>").addClass("footer hide")
$("body").append($footerContainer.append($playBtn).append($lifeContainer).append($scoreContainer).append($stageContainer))

/////////////////////////////////////////////////////////
// Smash Box
/////////////////////////////////////////////////////////

const hostage = $("<img>").addClass("hostage hide").attr("src", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aaa79357-9476-4c1d-b9a8-6e881f2449d3/ddgdrd9-cb8622a9-d3a4-45a4-8b28-6968bbc71866.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FhYTc5MzU3LTk0NzYtNGMxZC1iOWE4LTZlODgxZjI0NDlkM1wvZGRnZHJkOS1jYjg2MjJhOS1kM2E0LTQ1YTQtOGIyOC02OTY4YmJjNzE4NjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.luPKAZzBSuD5ibste5HXotlKlI4KQyQdyvsjuCSqzJI")
const $crusherContainerMain = $("<div>").addClass("crusherContainerMain hide")
const $crusherContainer = $("<div>").addClass("crusherContainer hide")
const $crusherLeft = $("<img>").addClass("crusher crusherLeft hide").attr("src", "https://lh3.googleusercontent.com/proxy/SSB82bMJzmevtW81bxZr_GG6gC04PWSPfzs6BXLACHA3ebJ8HHO9dBGPrWcXSO_nQ72rumj-C_JvJYce8l3NakP-ND0qR-ynZMr4yf93q5AdNfa3JS91p0uWUtX9yzaV")
const $crusherRight = $("<img>").addClass("crusher crusherRight hide").attr("src", "https://lh3.googleusercontent.com/proxy/SSB82bMJzmevtW81bxZr_GG6gC04PWSPfzs6BXLACHA3ebJ8HHO9dBGPrWcXSO_nQ72rumj-C_JvJYce8l3NakP-ND0qR-ynZMr4yf93q5AdNfa3JS91p0uWUtX9yzaV")
$("body").append($crusherContainerMain.append($crusherContainer.append($crusherLeft).append(hostage).append($crusherRight)))

/////////////////////////////////////////////////////////
// Result Box
/////////////////////////////////////////////////////////

const $resultBoxWin = $("<div>").addClass("resultBox")
const $resultBoxLose = $("<div>").addClass("resultBox")
const $resultValueWin = $("<p>").addClass("resultValue")
const $resultValueLose = $("<p>").addClass("resultValue")

const buyALifeText = $("<p>").addClass("buyALife").text("Need a boost? Get one life for only 10 points!")
const $buyALifeButton = $("<button>").addClass("buyButton resultBtn").text("+1 Life!")
const $pushBackCrusher = $("<button>").addClass("pushBackBtn resultBtn").text("Push Scissors!")
const $continue = $("<button>").addClass("continue resultBtn").text("Continue")

const $restart = $("<p>").addClass("restart")

const $resetBtnWin = $("<button>").addClass("resetBtn").text("Reset")
const $resetBtnLose = $("<button>").addClass("resetBtn").text("Reset")

const $resultBoxWinContainer = $resultBoxWin.append($resultValueWin).append(buyALifeText).append($buyALifeButton).append($pushBackCrusher).append($continue).append($resetBtnWin)
const $resultBoxLoseContainer = $resultBoxLose.append($resultValueLose).append($restart).append($resetBtnLose)


/////////////////////////////////////////////////////////
// Function
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
// Trigger Function // true to appear, false to hide
/////////////////////////////////////////////////////////


const nameInputContainerAppear = (appear) => {
    if (nameInputContainer.attr("class").includes("hide") === appear) {
        nameInputContainer.toggleClass("hide")
        nameInputFrame.toggleClass("hide")
        $nameInput.toggleClass("hide")
        $nameInputBtn.toggleClass("hide")
    }
}

const gridBtnContainerAppear = (appear) => {
    if (gridBtnContainer.attr("class").includes("hide") === appear) {
        gridBtnContainer.toggleClass("hide")
    }
}
const gameDifficultyAppear = (appear) => {
    if ($gameDifficulty.attr("class").includes("hide") === appear) {
        $gameDifficulty.toggleClass("hide")
    }
}

const gridContainerAppear = (appear) => {
    if ($gridContainer.attr("class").includes("hide") === appear) {
        $gridContainer.toggleClass("hide")
        $grid.toggleClass("hide")
    }
}

const playBtnAppear = (appear) => {
    if ($playBtn.attr("class").includes("hide") === appear) {
        $playBtn.toggleClass("hide")
    }
}

const footerContainerAppear = (appear) => {
    if ($footerContainer.attr("class").includes("hide") === appear) {
        $footerContainer.toggleClass("hide")
        $playBtn.toggleClass("hide")
        $lifeContainer.toggleClass("hide")
        $scoreContainer.toggleClass("hide")
        $stageContainer.toggleClass("hide")
    }
}

const crusherContainerAppear = (appear) => {
    if ($crusherContainerMain.attr("class").includes("hide") === appear) {
        hostage.toggleClass("hide")
        $crusherContainerMain.toggleClass("hide")
        $crusherContainer.toggleClass("hide")
        $crusherLeft.toggleClass("hide")
        $crusherRight.toggleClass("hide")
    }
}

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
// Difficulty Selection
/////////////////////////////////////////////////////////

const gridBtnSelection = () => {
    $(".gridBtn").on("mousedown", (event) => {
        $gridValue = $(event.target).attr("value")
        const target = $(event.target)
        $(".gridBtn").removeClass("btnClicked")
        target.addClass("btnClicked")

        gameDifficultyAppear(true)
    })
}
gridBtnSelection()

const difBtnSelection = () => {
    $(".difBtn").on("mousedown", (e) => {
        difficulty = $(e.target).attr("value")
        gridBtnContainerAppear(false)
        gameDifficultyAppear(false)
        nameInputContainerAppear(false)
        buildBoard()
    })
}
difBtnSelection()

/////////////////////////////////////////////////////////
// Build Board (3 Selectin [3x3, 4x4, 5x5])
/////////////////////////////////////////////////////////

const buildBoard = () => {
    $grid.addClass("grid" + $gridValue)

    for (let i = 0; i < $gridValue; i++) {
        const $boxP = $("<p>").addClass("boxText boxText" + i).text("?")
        $grid.append($("<div>").addClass("box box" + i).append($boxP))
    }

    gridContainerAppear(true)
    footerContainerAppear(true)
    crusherContainerAppear(true)

    $playBtn.on("mousedown", () => {
        if (gameStartCheck === false)
            startGame()
        playBtnAppear(false);
    })
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
        if (mixedArray[a] === "BOMB") {
            $(".boxText" + a).addClass("bombBox")
        } else if (mixedArray[a] === "5 Points") {
            $(".boxText" + a).addClass("ptBox5")
        } else if (mixedArray[a] === "10 Points") {
            $(".boxText" + a).addClass("ptBox10")
        } else $(".boxText" + a).addClass("ptBox20")
    }
    gameStartCheck = true

    while (attempt > 0 && life > 0) {
        let i = 0
        while (i < parseInt($gridValue) + 1) {
            console.log("above await I", i)
            crusher()
            await sleep(speed())
            attemptTrigger
            //stop +1 causing color to stop running
            console.log("i", i)
            attempt === 0 || life === 0 ? i = 100 :
                $(".box" + i).addClass("itBox")
            attempt === 0 || life === 0 ? i = 100 :
                $(".box" + (i - 1)).removeClass("itBox")
            i++
            console.log("below I", i)
        }
    }
}

/////////////////////////////////////////////////////////
// Crusher
/////////////////////////////////////////////////////////

crusher = () => {
    if (gameStartCheck === true) {
        crusherSpace += 5
        $crusherLeft.animate({
            left: crusherSpace
        }, speed())
        $crusherRight.animate({
            right: crusherSpace
        }, speed())
    }
    if (crusherSpace === 210) {
        life = 0
        gameStartCheck = false
        $result()
    }
}

pushBackCrusher = () => {
    crusherSpace -= 50
    $crusherLeft.animate({
        left: crusherSpace
    }, speed())
    $crusherRight.animate({
        right: crusherSpace
    }, speed())
}

/////////////////////////////////////////////////////////
// Attempt Trigger
/////////////////////////////////////////////////////////

attemptTrigger = $("body").on("keydown", () => {
    if (gameStartCheck === true) {
        console.log("test")
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
    }
})

/////////////////////////////////////////////////////////
// Result Trigger // Trigger Pop Up after 3 attempt //
/////////////////////////////////////////////////////////

$result = () => {
    if (life > 0) {
        $resultValueWin.text(score + " Points")
        $(".grid").append($resultBoxWinContainer)
        gameStartCheck = false
    }
    else {
        $resultValueLose.text(score + " Points")
        $(".grid").append($resultBoxLoseContainer)
        $restart.text(loser[Math.floor(Math.random() * loser.length)])
        gameStartCheck = false
    }
    $continue.on("mousedown", () => {
        attempt = 3;
        stage++
        $resultBoxWinContainer.remove()
        $(".boxText").removeClass("bombBox ptBox5 ptBox10 ptBox20")
        $(".box").removeClass("itBox")
        gameStartCheck = true
        startGame()
    })
    $buyALifeButton.on("mousedown", () => {
        if (score >= 10) {
            life++
            score -= 10
            $resultValueWin.text(score + " Points")
            buyALifeText.text(`Great! You got ${life} life now! Another one?`)
        }
        else {
            $resultValueWin.text(`${score} Points`)
            buyALifeText.text(`${buyFailed[Math.floor(Math.random() * buyFailed.length)]}`)
        }
    })
    $pushBackCrusher.on("mousedown", () => {
        if (score >= 10) {
            pushBackCrusher()
            score -= 10
            $resultValueWin.text(score + " Points")
            buyALifeText.text(`That's a relief`)
        }
        else {
            $resultValueWin.text(`${score} Points`)
            buyALifeText.text(`${buyFailed[Math.floor(Math.random() * buyFailed.length)]}`)
        }
    })

    $(".resetBtn").on("mousedown", () => {
        stage = 1
        attempt = 3
        life = 3
        if (score > highScore) {
            highScore = score
        }
        $highScoreTitle.text("Score")
        $highscore.text(highScore)
        score = 0
        $gridValue = 9
        difficulty = "easy"
        gameStartCheck = false
        crusherSpace = 0

        $lifePoints.text(life)
        $stagePoints.text(stage)
        $scorePoints.text(score)

        $crusherRight.animate({
            right: crusherSpace
        })
        $crusherLeft.animate({
            left: crusherSpace
        })

        $resultBoxWinContainer.remove()
        $(".boxText").removeClass("bombBox ptBox5 ptBox10 ptBox20")
        $(".box").removeClass("itBox")

        $grid.children().remove()
        $grid.removeClass("grid9 grid16 grid25")
        $(".gridBtn").removeClass("btnClicked")

        nameInputContainerAppear(true)
        gridBtnContainerAppear(true)
        gameDifficultyAppear(false)
        footerContainerAppear(false)
        playBtnAppear(false)
        crusherContainerAppear(false)
    })
}