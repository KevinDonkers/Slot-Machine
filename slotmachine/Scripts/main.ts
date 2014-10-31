/*
 * File Name: main.ts
 * Author: Kevin Donkers
 * Last Modified By: Kevin Donkers
 * Date Last Modified: Oct 30th, 2014
 * Description: A slot machine game that can bet up to 500 and win jackpots
 */

//stage and queue
var stage: createjs.Stage;
var queue;

//machine components
var spinHandle: createjs.Bitmap;
var button100: createjs.Bitmap;
var button200: createjs.Bitmap;
var button300: createjs.Bitmap;
var button400: createjs.Bitmap;
var button500: createjs.Bitmap;
var powerButton: createjs.Bitmap;
var resetButton: createjs.Bitmap;
var slotReels: createjs.Container;
var startSeven1;
var startSeven2;
var startSeven3;
var winLossMessage: createjs.Text;
var betText: createjs.Text;
var moneyText: createjs.Text;
var jackpotText: createjs.Text;

//variables
var playerMoney = 5000;
var winnings = 0;
var jackpot = 10000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var grapes = 0;
var strawberries = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

//function to preload the images and sounds
function preload() {
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.addEventListener("complete", init);
    queue.loadManifest([
        { id: "background", src: "images/slotmachinebackground.jpg" },
        { id: "textbox", src: "images/textbox.png" },
        { id: "reset", src: "images/resetbutton.png" },
        { id: "power", src: "images/powerbutton.png" },
        { id: "handle", src: "images/handle.png" },
        { id: "seven", src: "images/7.png" },
        { id: "100", src: "images/button100.png" },
        { id: "200", src: "images/button200.png" },
        { id: "300", src: "images/button300.png" },
        { id: "400", src: "images/button400.png" },
        { id: "500", src: "images/button500.png" },
        { id: "click", src: "sounds/click.wav" },
        { id: "jackpot", src: "sounds/jackpot.wav" },
        { id: "spin", src: "sounds/spin.wav" },
        { id: "win", src: "sounds/win.wav" },
    ]);
}

//the init function that sets the stage and the game loop after the assests have been preloaded
function init() {
    stage = new createjs.Stage(document.getElementById("canvas"));
    stage.enableMouseOver();

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);

    drawSlotMachine();
}

//updates the stage at 60FPS
function handleTick() {
    stage.update();
}

//draws all the components of the slot machine
function drawSlotMachine() {
    var slotMachine = new createjs.Bitmap(queue.getResult("background"));
    var betBox = new createjs.Bitmap(queue.getResult("textbox"));
    var moneyBox = new createjs.Bitmap(queue.getResult("textbox"));
    var jackpotBox = new createjs.Bitmap(queue.getResult("textbox"));
    var textLabels = new createjs.Text("<-Money Jackpot->", "17px Arial", "#ffd900");
    var betLabel = new createjs.Text("Bet->", "17px Arial", "#ffd900");
    betText = new createjs.Text("$" + playerBet.toString(), "30px Arial", "#ffd900");
    moneyText = new createjs.Text("$" + playerMoney.toString(), "30px Arial", "#ffd900");
    jackpotText = new createjs.Text("$" + jackpot.toString(), "30px Arial", "#ffd900");
    resetButton = new createjs.Bitmap(queue.getResult("reset"));
    powerButton = new createjs.Bitmap(queue.getResult("power"));
    spinHandle = new createjs.Bitmap(queue.getResult("handle")); 
    startSeven1 = new createjs.Bitmap(queue.getResult("seven"));
    startSeven2 = new createjs.Bitmap(queue.getResult("seven"));
    startSeven3 = new createjs.Bitmap(queue.getResult("seven"));  
    button100 = new createjs.Bitmap(queue.getResult("100"));
    button200 = new createjs.Bitmap(queue.getResult("200"));
    button300 = new createjs.Bitmap(queue.getResult("300"));
    button400 = new createjs.Bitmap(queue.getResult("400"));
    button500 = new createjs.Bitmap(queue.getResult("500"));
    slotReels = new createjs.Container();

    slotReels.x = stage.x;
    slotReels.y = stage.y;

    startSeven1.x = 40;
    startSeven1.y = 236;

    startSeven2.x = 174;
    startSeven2.y = 236;

    startSeven3.x = 306;
    startSeven3.y = 236;

    betBox.x = 300;
    betBox.y = 367;

    betText.x = 310;
    betText.y = 366;

    betLabel.x = 250;
    betLabel.y = 372;

    moneyBox.x = 34;
    moneyBox.y = 182;

    moneyText.x = 44;
    moneyText.y = 181;

    textLabels.x = 150;
    textLabels.y = 190;

    jackpotBox.x = 300;
    jackpotBox.y = 182;

    jackpotText.x = 310;
    jackpotText.y = 181;

    powerButton.x = 373;
    powerButton.y = 85;

    resetButton.x = 30;
    resetButton.y = 85;

    button100.x = 35;
    button100.y = 367;

    button200.x = 75;
    button200.y = 367;

    button300.x = 115;
    button300.y = 367;

    button400.x = 155;
    button400.y = 367;

    button500.x = 195;
    button500.y = 367;

    spinHandle.x = 443;
    spinHandle.y = 62;

    stage.addChild(slotMachine);
    stage.addChild(spinHandle);
    stage.addChild(betBox);
    stage.addChild(betText);
    stage.addChild(betLabel);
    stage.addChild(moneyBox);
    stage.addChild(moneyText);
    stage.addChild(textLabels);
    stage.addChild(jackpotBox);
    stage.addChild(jackpotText);
    stage.addChild(powerButton);
    stage.addChild(resetButton);
    stage.addChild(button100);
    stage.addChild(button200);
    stage.addChild(button300);
    stage.addChild(button400);
    stage.addChild(button500);
    stage.addChild(slotReels);
    threeSevens();

    addEventListeners(); 
}

//adds all the button event handlers
function addEventListeners() {
    powerButton.addEventListener("click", function () {
        createjs.Sound.play("click");
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
        createjs.Sound.play("click");
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
        createjs.Sound.play("click");
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
        createjs.Sound.play("click");
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
        createjs.Sound.play("click");
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
        createjs.Sound.play("click");
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
        createjs.Sound.play("click");
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
    spinHandle.addEventListener("mouseover", function () {
        spinHandle.alpha = 0.5;
    });
    spinHandle.addEventListener("mouseout", function () {
        spinHandle.alpha = 1;
    });
}

//closes the window or redirects to a thank you page if the widnow close fails
function powerOff() {
    window.close();
    window.location.href = 'thankyou.html';
}

//event handler for the spin button that kicks of the majority of the logic
function spin() {
    createjs.Sound.play("spin");
    if (playerMoney == 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet == 0) {
        alert("Please enter a valid bet amount");
    }
    else if (playerBet <= playerMoney) {

        spinResult = Reels();

        clearReels();

        spinResult[0].x = 40;
        spinResult[0].y = 236;

        spinResult[1].x = 174;
        spinResult[1].y = 236;

        spinResult[2].x = 306;
        spinResult[2].y = 236;

        slotReels.addChild(spinResult[0], spinResult[1], spinResult[2]);

        determineWinnings();
        moneyText.text = "$" + playerMoney.toString();
        jackpotText.text = "$" + jackpot.toString();
        turn++;
    }
}

//clears the previous spin results
function clearReels() {
    slotReels.removeAllChildren();
}

//displays 3 sevens on the reels
function threeSevens() {
    slotReels.addChild(startSeven1, startSeven2, startSeven3);
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    strawberries = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 5000;
    winnings = 0;
    jackpot = 10000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    stage.removeChild(winLossMessage);
    moneyText.text = "$" + playerMoney.toString();
    jackpotText.text = "$" + jackpot.toString();
    betText.text = "$" + playerBet.toString();
    clearReels();
    threeSevens();
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        createjs.Sound.play("jackpot");
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 10000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    createjs.Sound.play("win");
    playerMoney += winnings;
    resetFruitTally();
    checkJackPot();

    stage.removeChild(winLossMessage);

    winLossMessage = new createjs.Text("You Win $" + winnings, "30px Arial", "black");

    winLossMessage.x = 20;
    winLossMessage.y = 417;

    stage.addChild(winLossMessage);
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    resetFruitTally();
    jackpot += playerBet;

    stage.removeChild(winLossMessage);

    winLossMessage = new createjs.Text("You lose", "30px Arial", "black");

    winLossMessage.x = 20;
    winLossMessage.y = 417;

    stage.addChild(winLossMessage);
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
e.g. Bar - Orange - Seven */
function Reels() {
    var betLine = [];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = new createjs.Bitmap("images/blank.png");
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = new createjs.Bitmap("images/Grape.png");
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = new createjs.Bitmap("images/strawberry.png");
                strawberries++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = new createjs.Bitmap("images/orange.png");
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = new createjs.Bitmap("images/cherries.png");
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = new createjs.Bitmap("images/bar.png");
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = new createjs.Bitmap("images/bell.png");
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = new createjs.Bitmap("images/7.png");
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
        else if (strawberries == 3) {
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
        else if (strawberries == 2) {
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