var stage: createjs.Stage;
var spinHandle: createjs.Bitmap;
var button100: createjs.Bitmap;
var button200: createjs.Bitmap;
var button300: createjs.Bitmap;
var button400: createjs.Bitmap;
var button500: createjs.Bitmap;
var powerButton: createjs.Bitmap;
var seven: createjs.Bitmap;
var bar: createjs.Bitmap;
var grape: createjs.Bitmap;
var banana: createjs.Bitmap;
var orange: createjs.Bitmap;
var cherry: createjs.Bitmap;
var bell: createjs.Bitmap;
var betText: createjs.Text;
var moneyText: createjs.Text;
var jackpotText: createjs.Text;

var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;

var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

function init() {
    stage = new createjs.Stage(document.getElementById("canvas"));

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);

    drawSlotMachine();
}

function handleTick() {
    stage.update();
}

function drawSlotMachine() {
    var slotMachine = new createjs.Bitmap("images/slotmachinebackground.jpg");
    var betBox = new createjs.Bitmap("images/textbox.png");
    var moneyBox = new createjs.Bitmap("images/textbox.png");
    var jackpotBox = new createjs.Bitmap("images/textbox.png");
    var resetButton = new createjs.Bitmap("images/resetbutton.png");
    powerButton = new createjs.Bitmap("images/powerbutton.png");
    betText = new createjs.Text("$" + playerBet.toString(), "30px Arial", "#ffd900");
    moneyText = new createjs.Text("$" + playerMoney.toString(), "30px Arial", "#ffd900");
    jackpotText = new createjs.Text("$" + jackpot.toString(), "30px Arial", "#ffd900");
    spinHandle = new createjs.Bitmap("images/handle.png");
    button100 = new createjs.Bitmap("images/button100.png");
    button200 = new createjs.Bitmap("images/button200.png");
    button300 = new createjs.Bitmap("images/button300.png");
    button400 = new createjs.Bitmap("images/button400.png");
    button500 = new createjs.Bitmap("images/button500.png");
    stage.enableMouseOver();

    betBox.x = 300;
    betBox.y = 367;

    betText.x = 310;
    betText.y = 367;

    moneyBox.x = 34;
    moneyBox.y = 182;

    moneyText.x = 44;
    moneyText.y = 182;

    jackpotBox.x = 300;
    jackpotBox.y = 182;

    jackpotText.x = 310;
    jackpotText.y = 182;

    powerButton.x = 373;
    powerButton.y = 85;

    resetButton.x = 30;
    resetButton.y = 85;

    button100.x = 35;
    button100.y = 367;

    button200.x = 85;
    button200.y = 367;

    button300.x = 135;
    button300.y = 367;

    button400.x = 185;
    button400.y = 367;

    button500.x = 235;
    button500.y = 367;

    spinHandle.x = 443;
    spinHandle.y = 62;

    stage.addChild(slotMachine);
    stage.addChild(spinHandle);
    stage.addChild(betBox);
    stage.addChild(betText);
    stage.addChild(moneyBox);
    stage.addChild(moneyText);
    stage.addChild(jackpotBox);
    stage.addChild(jackpotText);
    stage.addChild(powerButton);
    stage.addChild(resetButton);
    stage.addChild(button100);
    stage.addChild(button200);
    stage.addChild(button300);
    stage.addChild(button400);
    stage.addChild(button500);

    powerButton.addEventListener("click", function () {
        if (confirm("Are you sure you want to quit?")) {
            powerOff();
        }
    });
    powerButton.addEventListener("mouseover", function () {
        powerButton.alpha = 0.5;
    });
    powerButton.addEventListener("mouseout", function () {
        powerButton.alpha = 1;
    });

    resetButton.addEventListener("click", function () {
        if (confirm("Are you sure you want to reset?")) {
            resetAll();
        }
    });
    resetButton.addEventListener("mouseover", function () {
        resetButton.alpha = 0.5;
    });
    resetButton.addEventListener("mouseout", function () {
        resetButton.alpha = 1;
    });

    button100.addEventListener("click", function () {
        playerBet = 100;
        betText.text = "$100";
    });
    button100.addEventListener("mouseover", function () {
        button100.alpha = 0.5;
    });
    button100.addEventListener("mouseout", function () {
        button100.alpha = 1;
    });

    button200.addEventListener("click", function () {
        playerBet = 200;
        betText.text = "$200";
    });
    button200.addEventListener("mouseover", function () {
        button200.alpha = 0.5;
    });
    button200.addEventListener("mouseout", function () {
        button200.alpha = 1;
    });

    button300.addEventListener("click", function () {
        playerBet = 300;
        betText.text = "$300";
    });
    button300.addEventListener("mouseover", function () {
        button300.alpha = 0.5;
    });
    button300.addEventListener("mouseout", function () {
        button300.alpha = 1;
    });

    button400.addEventListener("click", function () {
        playerBet = 400;
        betText.text = "$400";
    });
    button400.addEventListener("mouseover", function () {
        button400.alpha = 0.5;
    });
    button400.addEventListener("mouseout", function () {
        button400.alpha = 1;
    });

    button500.addEventListener("click", function () {
        playerBet = 500;
        betText.text = "$500";
    });
    button500.addEventListener("mouseover", function () {
        button500.alpha = 0.5;
    });
    button500.addEventListener("mouseout", function () {
        button500.alpha = 1;
    });

    spinHandle.addEventListener("click", spin);
    spinHandle.addEventListener("mouseover", overHandler);
    spinHandle.addEventListener("mouseout", outHandler);
    
}

function overHandler() {
    spinHandle.alpha = 0.5;
}

function outHandler() {
    spinHandle.alpha = 1;
}

function powerOff() {
    betText.text = "";
    jackpotText.text = "";
    moneyText.text = "";

    powerButton.alpha = 1;
    powerButton.removeAllEventListeners();
    spinHandle.removeAllEventListeners();
    button100.removeAllEventListeners();
    button200.removeAllEventListeners();
    button300.removeAllEventListeners();
    button400.removeAllEventListeners();
    button500.removeAllEventListeners();
}

function spin() {
    if (playerMoney == 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        determineWinnings();
        moneyText.text = "$" + playerMoney.toString();
        jackpotText.text = "$" + jackpot.toString();
        turn++;
    }
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
    moneyText.text = "$" + playerMoney.toString();
    jackpotText.text = "$" + jackpot.toString();
    betText.text = "$" + playerBet.toString();
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    resetFruitTally();
    jackpot += playerBet;
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }

}