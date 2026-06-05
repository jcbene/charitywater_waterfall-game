var gameState = "title"; // "title", "playing", "won", "lost"
var totalCollectables = 16;
var flOzPerCollectable = 150;
var targetFlOz = totalCollectables * flOzPerCollectable;

function checkWinLose() {
    if (gameState !== "playing") {
        return;
    }

    if (score >= targetFlOz) {
        gameState = "won";

        if (circ) {
            Composite.remove(world, circ.body);
            circ = null;
        }
    } else if (playerDropletsLeft <= 0 && !circ) {
        gameState = "lost";
    }
}

function drawTitleScreen() {
    push();

    // side bars
    fill(50);
    noStroke();
    rect(0, 0, playX, height);
    rect(playX + PLAY_AREA_WIDTH, 0, playX, height);

    // title screen inside play area only
    imageMode(CORNER);
    image(openingScreenImg, playX, playY, PLAY_AREA_WIDTH, PLAY_AREA_HEIGHT);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(28);
    text("Click to Start", playX + PLAY_AREA_WIDTH / 2, height - 80);

    textSize(18);
    text("Learn more at charitywater.org", playX + PLAY_AREA_WIDTH / 2, height - 30);

    pop();
}

function drawGameOverScreen() {
    if (gameState === "playing") {
        return;
    }

    push();

    fill(0, 180);
    rect(0, 0, width, height);

    textAlign(CENTER, CENTER);
    fill(255);
    textSize(56);

    if (gameState === "won") {
        text("You Won!", width / 2, height / 2 - 80);
    } else if (gameState === "lost") {
        text("There is water still!", width / 2, height / 2 - 80);
    }

    textSize(24);
    text("Water collected: " + score + " fl oz", width / 2, height / 2 - 20);

    fill(255);
    rectMode(CENTER);
    rect(width / 2, height / 2 + 50, 180, 55, 10);

    fill(0);
    textSize(22);
    text("Try Again", width / 2, height / 2 + 50);

    fill(255);
    textSize(18);
    text("Learn more at charitywater.org", width / 2, height / 2 + 110);

    pop();
}

function handleGameOverClick() {
    if (gameState === "playing") {
        return false;
    }

    var buttonX = width / 2;
    var buttonY = height / 2 + 50;
    var buttonW = 180;
    var buttonH = 55;

    var clickedButton =
        mouseX > buttonX - buttonW / 2 &&
        mouseX < buttonX + buttonW / 2 &&
        mouseY > buttonY - buttonH / 2 &&
        mouseY < buttonY + buttonH / 2;

    if (charityLinkClicked(width / 2, height / 2 + 105)) {
        window.open("https://www.charitywater.org/", "_blank");
        return true;
    }

    if (clickedButton) {
        restartGame();
    }

    return true;
}

function restartGame() {
    if (circ) {
        Composite.remove(world, circ.body);
        circ = null;
    }

    for (var i = 0; i < collectables.length; i++) {
        Composite.remove(world, collectables[i].body);
    }

    collectables = [];
    savedCollectableStates = [];

    score = 0;
    snappedScore = 0;

    playerDropletsLeft = 7;
    snappedPlayerDropletsLeft = 7;

    gameState = "playing";

    pushCollectables();
}

function charityLinkClicked(centerX, centerY) {
    var linkW = 360;
    var linkH = 35;

    return (
        mouseX > centerX - linkW / 2 &&
        mouseX < centerX + linkW / 2 &&
        mouseY > centerY - linkH / 2 &&
        mouseY < centerY + linkH / 2
    );
}