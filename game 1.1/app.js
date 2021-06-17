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
//! Global Value
/////////////////////////////////////////////////////////

let stage = 1
let attempt = 3
let life = 3
let score = 0
let gridValue = 9
let difficulty = "easy"
let gameStartCheck = false
let crusherSpace = 0
let highScore = 0
let playerName = ""
let currentSpeed = 180

/////////////////////////////////////////////////////////
//! Shit Talk
/////////////////////////////////////////////////////////

let winner = ["Well done! Mr.Snuffles balls are saved this time!", "Yay! Mr.Snuffles get to keep his balls!"]
let loser = ["Damn.. There goes Smowball balls", "Snip Snip, bye bye balls", "Game Over Loser"]
let buyFailed = ["You don't have enough score!", "Can't count?", "What are you gonna pay with? Mr.Snuffles balls?"]


/////////////////////////////////////////////////////////
//! Dark Mode
/////////////////////////////////////////////////////////
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

/////////////////////////////////////////////////////////
//! Input Player Name
/////////////////////////////////////////////////////////

const nameInputContainer = $("<div>").addClass("nameInputContainer")
const nameInputFrame = $("<div>").addClass("nameInputFrame")
const nameInput = $("<input>").addClass("nameInput").attr({ placeholder: "Enter player name" })
const nameInputBtn = $("<input>").attr("type", "submit").addClass("nameInputBtn").text("Enter")
$("#playerName").append(nameInputContainer.append(nameInputFrame.append(nameInput, nameInputBtn)))

nameInputBtn.on("click", (event) => {
    event.preventDefault()
    playerName = nameInput.val()
    nameInput.val("")
    nameInputContainer.slideUp(400)
})

/////////////////////////////////////////////////////////
//! Buttons (3 Selection [3x3, 4x4, 5x5])
/////////////////////////////////////////////////////////

const gridBtnContainer = $("<div>").addClass("gridBtnContainer animate__animated")
const $3x3 = $("<button>").addClass("gridBtn 3x3Btn").text("3x3").attr("value", 9)
const $4x4 = $("<button>").addClass("gridBtn 4x4Btn").text("4x4").attr("value", 16)
const $5x5 = $("<button>").addClass("gridBtn 5x5Btn").text("5x5").attr("value", 25)

$("body").append(gridBtnContainer.append($3x3, $4x4, $5x5))


/////////////////////////////////////////////////////////
//! Select Difficulty Stage
/////////////////////////////////////////////////////////

const gameDifficulty = $("<div>").addClass("gameDifficulty animate__animated").hide()
const easy = $("<button>").addClass("difBtn easy").text("Easy").attr("value", "easy")
const noraml = $("<button>").addClass("difBtn normal").text("Normal").attr("value", "normal")
const hard = $("<button>").addClass("difBtn hard").text("Hard").attr("value", "hard")
$("body").append(gameDifficulty.append(easy, noraml, hard))

/////////////////////////////////////////////////////////
//! Highscore
/////////////////////////////////////////////////////////

const highScoreMainContainer = $("<div>").addClass("highScoreMainContainer animate__animated")

const highScoreNameContainer = $("<div>").addClass("highScoreNameContainer animate__animated")
const highscoreNameTitle = $("<h4>").addClass("highScoreTitle highScoreBoard animate__animated")
const highscoreName = $("<p>").addClass("highScoreName animate__animated").text(playerName)

const highScoreContainer = $("<div>").addClass("highScoreContainer animate__animated")
const highScoreTitle = $("<h4>").addClass("highScoreTitle highScoreBoard animate__animated")
const highscore = $("<p>").addClass("highScorePoints animate__animated")
$("body").append(highScoreMainContainer.append(highScoreNameContainer.append(highscoreNameTitle, highscoreName), highScoreContainer.append(highScoreTitle, highscore)))

/////////////////////////////////////////////////////////
//! Game Rules
/////////////////////////////////////////////////////////

const gameRuleContainer = $("<div>").addClass('gameRuleContainer')
const gameRuleTitle = $("<ul>").addClass("gameRuleTitle").text("Game Rules")
const gameRuleIcon = $("<img>").addClass("gameRuleIcon").attr("src", "./picture/arrow.png")

nameInputContainer.append(gameRuleContainer.append(gameRuleTitle.append(gameRuleIcon)))

$(".gameRuleTitle").on("click", () => {
    tutorialMainContainerAppear(true)
    $(".gameRuleIcon").toggleClass("clickRotate")
})

///////////////////////////////////////////////////////////
//! Tutorial
///////////////////////////////////////////////////////////

//! Main container
tutorialMainContainer = $("<div>").addClass("container").hide()
crossIcon = $("<img>").addClass("cross").attr("src", "./picture/cross.png")

//! Objective 
slideContainer1 = $("<div>").addClass("slideContainer")
slideImage1 = $("<img>").addClass("slide slideImage").attr("src", "./picture/play.png")
slideText1 = $("<ul>").addClass("slide slideText slideTitle").text("Game Objective")
slideText1_list1 = $("<li>").addClass("slide slideText").text("3 Trigger each round")
slideText1_list2 = $("<li>").addClass("slide slideText").text("Any key down to activate trigger")
slideText1_list3 = $("<li>").addClass("slide slideText").text("Use all trigger before the scissors reaches Mr.Snuffles!")
slideText1_list4 = $("<li>").addClass("slide slideText").text("Avoid Bombs! Bomb cost 1 Life & $20")
slideContainer1.append(slideImage1, slideText1.append(crossIcon, slideText1_list1, slideText1_list2, slideText1_list3, slideText1_list4))

//! Shop
slideContainer2 = $("<div>").addClass("slideContainer")
slideImage2 = $("<img>").addClass("slide slideImage").attr("src", "./picture/shop.png")
slideText2 = $("<ul>").addClass("slide slideText slideTitle").text("Shop")
slideText2_list1 = $("<li>").addClass("slide slideText").text("1 Life cost $10")
slideText2_list2 = $("<li>").addClass("slide slideText").text("1 PushBack cost $5")
slideText2_list3 = $("<li>").addClass("slide slideText").text("Slowdown cost $5")
slideContainer2.append(slideImage2, slideText2.append(slideText2_list1, slideText2_list2, slideText2_list3))

$("body").append(tutorialMainContainer.append(slideContainer1, slideContainer2))

/////////////////////////////////////////////////////////
//! Grid
/////////////////////////////////////////////////////////

const gridContainer = $("<div>").addClass("gridContainer").hide()
const grid = $("<div>").addClass("grid")
$("body").append(gridContainer.append(grid))


const playBtn = $("<button>").addClass("playBtn").text("Start Game!")


/////////////////////////////////////////////////////////
//! Life
/////////////////////////////////////////////////////////

const lifeContainer = $("<div>").addClass("lifeContainer")
const lifeTitle = $("<h3>").addClass("lifeTitle footerBoard").text("Life")
const lifePoints = $("<p>").addClass("lifePoints")
lifeContainer.append(lifeTitle, lifePoints.text(life))


/////////////////////////////////////////////////////////
//! Stage
/////////////////////////////////////////////////////////

const stageContainer = $("<div>").addClass("stageContainer")
const stageTitle = $("<h3>").addClass("stageTitle footerBoard").text("Stage")
const stagePoints = $("<p>").addClass("stagePoints")
stageContainer.append(stageTitle, stagePoints.text(stage))


/////////////////////////////////////////////////////////
//! Score Board
/////////////////////////////////////////////////////////

const scoreContainer = $("<div>").addClass("scoreContainer")
const scoreTitle = $("<h3>").addClass("scoreTitle footerBoard").text("Score")
const scorePoints = $("<p>").addClass("scorePoints")
scoreContainer.append(scoreTitle, scorePoints.text(score))

/////////////////////////////////////////////////////////
//! Footer Container
/////////////////////////////////////////////////////////

const footerContainer = $("<div>").addClass("footer").hide()
$("body").append(footerContainer.append(playBtn, lifeContainer, scoreContainer, stageContainer))

/////////////////////////////////////////////////////////
//! Smash Box
/////////////////////////////////////////////////////////

const crusherContainerMain = $("<div>").addClass("crusherContainerMain").hide()
const hostage = $("<img>").addClass("hostage").attr("src", "./picture/snowball.png")
const crusherContainer = $("<div>").addClass("crusherContainer")
const crusherLeft = $("<img>").addClass("crusher crusherLeft").attr("src", "./picture/whiteScissors.png")
const crusherRight = $("<img>").addClass("crusher crusherRight").attr("src", "./picture/whiteScissors.png")
$("body").append(crusherContainerMain.append(crusherContainer.append(crusherLeft, hostage, crusherRight)))

/////////////////////////////////////////////////////////
//! Result Box
/////////////////////////////////////////////////////////

const resultBoxWin = $("<div>").addClass("resultBox")
const resultBoxLose = $("<div>").addClass("resultBox")
const resultValueWin = $("<p>").addClass("resultValue")
const resultValueLose = $("<p>").addClass("resultValue")

const buyALifeText = $("<p>").addClass("buyText")
const buyALifeButton = $("<button>").addClass("buyButton resultBtn").text("+1 Life") //! Add ding sound
const pushBackCrusherText = $("<p>").addClass("buyText")
const pushBackCrusher = $("<button>").addClass("pushBackBtn resultBtn").text("Push Scissors!") //! Add woosh sound
const reduceSpeedText = $("<p>").addClass("buyText")
const reduceSpeed = $("<button>").addClass("slowSpeed resultBtn").text("Slow it down") //! Add gear crank sound
const $continue = $("<button>").addClass("continue resultBtn").text("Continue")

const restart = $("<p>").addClass("restart")

const resetBtnWin = $("<button>").addClass("resetBtn").text("Reset")
const resetBtnLose = $("<button>").addClass("resetBtn").text("Reset")

const resultBoxWinContainer = resultBoxWin.append(resultValueWin, buyALifeText, buyALifeButton, pushBackCrusherText, pushBackCrusher, reduceSpeedText, reduceSpeed, $continue, resetBtnWin)
const resultBoxLoseContainer = resultBoxLose.append(resultValueLose, restart, resetBtnLose)


/////////////////////////////////////////////////////////
//! Function
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//! Trigger Function // true to appear, false to hide
/////////////////////////////////////////////////////////


const nameInputContainerAppear = (appear) => appear === true ? nameInputContainer.show("slow") : nameInputContainer.hide("slow")

const gridBtnContainerAppear = (appear) => appear === true ? gridBtnContainer.show("slow") : gridBtnContainer.hide("slow")

const gameDifficultyAppear = (appear) => appear === true ? gameDifficulty.show("slow") : gameDifficulty.hide("slow")

const gridContainerAppear = (appear) => appear === true ? gridContainer.show("slow") : gridContainer.hide("slow")

const playBtnAppear = (appear) => appear === true ? playBtn.show("slow") : playBtn.hide("slow")

const footerContainerAppear = (appear) => appear === true ? footerContainer.show() : footerContainer.hide()

const crusherContainerAppear = (appear) => appear === true ? crusherContainerMain.show() : crusherContainerMain.hide()

const tutorialMainContainerAppear = (appear) => appear === true ? tutorialMainContainer.show() : tutorialMainContainer.hide()

$(".cross").on("click", () => {
    tutorialMainContainerAppear(false)
})

/////////////////////////////////////////////////////////
//! Difficulty Stage         //      Return number of bomb
/////////////////////////////////////////////////////////

const boardDifficulty = (difficulty) => {
    if (difficulty === easy.attr("value")) {
        return numBomb = Math.ceil(0.2 * gridValue)
    }
    if (difficulty === noraml.attr("value")) {
        return numBomb = Math.ceil(0.3 * gridValue)
    }
    if (difficulty === hard.attr("value")) {
        return numBomb = Math.ceil(0.4 * gridValue)
    }
}

/////////////////////////////////////////////////////////
//! Return mixed array filled with outcome
/////////////////////////////////////////////////////////

const boardMixer = (numBomb) => {
    const arr = Array(parseInt(gridValue)).fill("?")

    const remainder = arr.length - parseInt(numBomb)
    const split = Math.floor(remainder / 6)
    const arrayBomb = Array(numBomb).fill("BOMB")
    const fivePoints = Array(split * 3).fill("$5")
    const tenPoints = Array(split * 2).fill("$10")
    const twentyPoints = Array(split).fill("$20")

    let selection = arrayBomb.concat(fivePoints).concat(tenPoints).concat(twentyPoints)
    while (selection.length < gridValue) {
        selection.push("$5")
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
//! Speed Control // Stage 1, 2, 3
/////////////////////////////////////////////////////////

const speed = (currentSpeed) => {
    let moveSpeed = currentSpeed - (stage * 15)

    if (moveSpeed <= 60) {
        return 60
    }
    return moveSpeed
}


/////////////////////////////////////////////////////////
//! Sleep
/////////////////////////////////////////////////////////

const sleep = (duration) => {
    return new Promise((accept) => {
        setTimeout(() => {
            accept()
        }, duration)
    }
    )
}

/////////////////////////////////////////////////////////
//! Difficulty Selection
/////////////////////////////////////////////////////////

const gridBtnSelection = () => {
    $(".gridBtn").on("mousedown", (event) => {
        gridValue = $(event.target).attr("value")
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
        playBtnAppear(true)
        buildBoard()
    })
}
difBtnSelection()

/////////////////////////////////////////////////////////
//! Build Board (3 Selectin [3x3, 4x4, 5x5])
/////////////////////////////////////////////////////////

const buildBoard = () => {
    grid.addClass("grid" + gridValue)

    for (let i = 0; i < gridValue; i++) {
        const boxP = $("<p>").addClass("boxText boxText" + i).text("?")
        grid.append($("<div>").addClass("box box" + i).append(boxP))
    }

    gridContainerAppear(true)
    footerContainerAppear(true)
    crusherContainerAppear(true)

    playBtn.on("mousedown", () => {
        if (gameStartCheck === false)
            startGame()
        playBtnAppear(false);
    })
}



/////////////////////////////////////////////////////////
//! Main Game Function
/////////////////////////////////////////////////////////

startGame = async () => {
    lifePoints.text(life)
    stagePoints.text(stage)
    scorePoints.text(score)

    let numBomb = boardDifficulty(difficulty)
    let mixedArray = boardMixer(numBomb)

    for (let a = 0; a < gridValue; a++) {
        $(".boxText" + a).text(mixedArray[a])
        if (mixedArray[a] === "BOMB") {
            $(".boxText" + a).addClass("bombBox")
        } else if (mixedArray[a] === "$5") {
            $(".boxText" + a).addClass("ptBox5")
        } else if (mixedArray[a] === "$10") {
            $(".boxText" + a).addClass("ptBox10")
        } else $(".boxText" + a).addClass("ptBox20")
    }
    gameStartCheck = true

    while (attempt > 0 && life > 0) {
        let i = 0
        while (i < parseInt(gridValue) + 1) {
            crusher()
            await sleep(speed(currentSpeed))
            attemptTrigger
            //stop +1 causing color to stop running
            attempt === 0 || life === 0 ? i = gridValue + 1 :
                $(".box" + i).addClass("itBox")
            attempt === 0 || life === 0 ? i = gridValue + 1 :
                $(".box" + (i - 1)).removeClass("itBox")
            i++
        }
    }
}

/////////////////////////////////////////////////////////
//! Crusher
/////////////////////////////////////////////////////////

crusher = () => {
    if (gameStartCheck === true) {
        crusherSpace += 5
        crusherLeft.animate({
            left: crusherSpace
        }, speed(currentSpeed))
        crusherRight.animate({
            right: crusherSpace
        }, speed(currentSpeed))
    }
    if (crusherSpace === 210) {
        life = 0
        gameStartCheck = false
        $result()
    }
}

pushBackCrusherFunction = () => {
    crusherSpace -= 50
    crusherLeft.animate({
        left: crusherSpace
    }, speed(currentSpeed))
    crusherRight.animate({
        right: crusherSpace
    }, speed(currentSpeed))
}

/////////////////////////////////////////////////////////
//! Attempt Trigger
/////////////////////////////////////////////////////////

const bombDamage = () => {
    score -= 20
    life--
}

const bombDamageMin = () => {
    score = 0
    life--
}

const triggerOutcome = () => {
    for (let y = 0; y < gridValue; y++) {
        if ($(".box" + y).attr("class").includes("itBox")) {
            if ($(".box" + y).text() === "BOMB") {
                score <= 20 ? bombDamageMin() : bombDamage()
            }
            else if ($(".box" + y).text() === "$5") {
                score += 5
            }
            else ($(".box" + y).text() === "$10") ? score += 10 : score += 20
        }
    }
}

const attemptTrigger = $("body").on("keydown", () => {
    if (gameStartCheck === true) {
        attempt--
        triggerOutcome()
        if (attempt === 0 || life === 0) {
            $result()
        }
        $(".scorePoints").text(score)
        $(".lifePoints").text(life)
    }
})

/////////////////////////////////////////////////////////
//! Result Trigger // Trigger Pop Up after 3 attempt //
/////////////////////////////////////////////////////////

const continueBtn = () => {
    $continue.on("mousedown", () => {
        attempt = 3;
        stage++
        resultBoxWinContainer.remove()
        $(".boxText").removeClass("bombBox ptBox5 ptBox10 ptBox20")
        $(".box").removeClass("itBox")
        gameStartCheck = true
        startGame()
    })
}

const buyALifeBtn = () => {
    buyALifeButton.on("mousedown", () => {
        if (score >= 10) {
            life++
            score -= 10
            resultValueWin.text(`$ ${score}`)
            buyALifeText.text(`Great! You got ${life} life now! Another one?`)
        }
        else {
            resultValueWin.text(`$ ${score}`)
            buyALifeText.text(`${buyFailed[Math.floor(Math.random() * buyFailed.length)]}`)
        }
    })
}
const pushBackCrusherBtn = () => {
    pushBackCrusher.on("mousedown", () => {
        if (score >= 5) {
            pushBackCrusherFunction()
            score -= 5
            resultValueWin.text(`$ ${score}`)
            pushBackCrusherText.text(`Another one?`)
        }
        else {
            resultValueWin.text(`$ ${score}`)
            pushBackCrusherText.text(`${buyFailed[Math.floor(Math.random() * buyFailed.length)]}`)
        }
    })
}
const reduceSpeedBtn = () => {
    reduceSpeed.on("mousedown", () => {
        if (score >= 5) {
            currentSpeed += 5
            score -= 5
            resultValueWin.text(`$ ${score}`)
            reduceSpeedText.text(`Current Speed: ${currentSpeed - (stage * 15)}ms. Slow it down by 5ms for $5!`)
        }
        else {
            resultValueWin.text(`$ ${score}`)
            reduceSpeedText.text(`${buyFailed[Math.floor(Math.random() * buyFailed.length)]}`)
        }
    })
}

$result = () => {
    if (life > 0) {
        resultValueWin.text("$" + score)
        $(".grid").append(resultBoxWinContainer)
        buyALifeText.text(`You currently have ${life} Life. Need a boost? Only $10!`)
        reduceSpeedText.text(`Light Delay: ${currentSpeed - (stage * 15)}ms. Prolong delay by 5ms for $5!`)
        pushBackCrusherText.text(`$5 to push the scissors back`)
        gameStartCheck = false
    }
    else {
        resultValueLose.text("$" + score)
        $(".grid").append(resultBoxLoseContainer)
        restart.text(loser[Math.floor(Math.random() * loser.length)])
        gameStartCheck = false
    }
    continueBtn()
    buyALifeBtn()
    pushBackCrusherBtn()
    reduceSpeedBtn()

    $(".resetBtn").on("mousedown", () => {
        attempt = 3
        life = 3
        if (score > highScore) {
            highScore = stage
            if (highscoreName.text() === "") {
                highscoreName.text("Player Unknown").addClass("animate__zoomIn")
            }
            else {
                highscoreNameTitle.text("Name").addClass("animate__zoomIn")
                highscoreName.text(playerName).addClass("animate__zoomIn")
            }

            highScoreTitle.text("Highscore").addClass("animate__slideInLeft")
            highscore.text(`Stage ${highScore}`).addClass("animate__slideInLeft")
        }

        score = 0
        stage = 1
        gridValue = 9
        difficulty = "easy"
        gameStartCheck = false
        crusherSpace = 0

        lifePoints.text(life)
        stagePoints.text(stage)
        scorePoints.text(score)

        crusherRight.animate({
            right: crusherSpace
        })
        crusherLeft.animate({
            left: crusherSpace
        })

        resultBoxWinContainer.remove()
        $(".boxText").removeClass("bombBox ptBox5 ptBox10 ptBox20")
        $(".box").removeClass("itBox")

        grid.children().remove()
        grid.removeClass("grid9 grid16 grid25")
        $(".gridBtn").removeClass("btnClicked")

        nameInputContainerAppear(true)
        gridBtnContainerAppear(true)
        gameDifficultyAppear(false)
        footerContainerAppear(false)
        playBtnAppear(false)
        crusherContainerAppear(false)
    })
}