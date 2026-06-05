var Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

    
// Global variables
var engine;
var world;

// Game objects
var circ;
var spawnY = 110;
var cloudPreviewY = 40;
var previewRadius = 30;

// Boundaries
var leftWall;
var rightWall;
var boundaries = [];
var ground;

// Game state variables
var score = 0;
var snappedScore = 0;
var flOzPerCollectable = 150;
var collectables = [];
var savedCollectableStates = [];
var playerDropletsLeft = 7;
var snappedPlayerDropletsLeft = 7;

// UI constants
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

const PLAY_AREA_WIDTH = 700;
const PLAY_AREA_HEIGHT = 720;

var playX;
var playY;

// Assets
var logo;
var openingScreenImg;

var jerryCanImg;
var buckets = [];

var cloudPegImg;
var cloudPlatformImg;

function preload() {
    openingScreenImg = loadImage(
        "assets/images/openingScreen.png",
        function() {
            console.log("Opening screen loaded");
        }
    );

    jerryCanImg = loadImage(
        "assets/images/jerry_can_yellow.png",
        function() {
            console.log("Jerry can loaded");
        },
        function() {
            console.error("Jerry can failed to load");
        }
    );

    cloudPegImg = loadImage(
        "assets/images/cloud_peg.png",
        function() {
            console.log("Cloud peg loaded");
        },
        function() {
            console.error("Cloud peg failed to load");
        }
    );

    cloudPlatformImg = loadImage(
        "assets/images/cloud_platform.png",
        function() {
            console.log("Cloud platform loaded");
        },
        function() {
            console.error("Cloud platform failed to load");
        }
    );
    logo = loadImage(
        "assets/images/charitywater_logo_vertical_WhiteText.png",
        function() {
            console.log("logo loaded");
        },
        function() {
            console.log("logo failed to load");
        }
    )
}

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    engine = Engine.create();
    world = engine.world;

    var runner = Runner.create();
    Runner.run(runner, engine);

    playX = (CANVAS_WIDTH - PLAY_AREA_WIDTH) / 2;
    playY = (CANVAS_HEIGHT - PLAY_AREA_HEIGHT) / 2; // not really necessary since play area is same height as canvas, but just in case

    leftWall = new Boundary(playX, CANVAS_HEIGHT / 2, 50, CANVAS_HEIGHT, 0);
    rightWall = new Boundary(playX + PLAY_AREA_WIDTH, CANVAS_HEIGHT / 2, 50, CANVAS_HEIGHT, 0);
    //ground = new Boundary(playX + PLAY_AREA_WIDTH / 2, playY + PLAY_AREA_HEIGHT - 25, PLAY_AREA_WIDTH, 50, 0);

    //add buckets
    var bucketWidth = 90;
    var bucketHeight = 125;
    var bucketCount = 4;

    for (var i = 0; i < bucketCount; i++) {
        var bucketX = playX + PLAY_AREA_WIDTH * ((i + 1) / (bucketCount + 1));
        buckets.push(new Bucket(bucketX, height - 85, bucketWidth, bucketHeight));
    }

    pushCloudBoundaries();
    pushCollectables();
}

function mousePressed() {
    if (gameState === "title") {
        if (charityLinkClicked(playX + PLAY_AREA_WIDTH / 2, height - 40)) {
            window.open("https://www.charitywater.org/", "_blank");
            return;
        }

        gameState = "playing";
        return;
    }

    if (handleGameOverClick()) {
        return;
    }
    
    var spawnX = constrain(mouseX, playX + previewRadius, playX + PLAY_AREA_WIDTH - previewRadius);

    // Checks to ensure clicks only register within the play area and when there isn't already a circle in play
    var insidePlayCheck = 
        mouseX > playX && mouseX < playX + PLAY_AREA_WIDTH &&
        mouseY > playY && mouseY < playY + PLAY_AREA_HEIGHT;
    if (!insidePlayCheck) {
        return;
    }
    if (circ) {
        return;
    }

    // Delete previous circle if it exists
    if (circ) {
        Composite.remove(world, circ.body);
    }

    saveTurnState();

    playerDropletsLeft--;
    circ = new Circle(spawnX, spawnY, previewRadius);
}

function draw() {
    background(0, 161, 157);

    if (gameState === "title") {
        drawTitleScreen();
        return;
    }

    drawWhiteBg();

    drawPreviewCloud();
    drawPreviewDroplet();

    if (circ) {
        circ.show();
    }

    if (circ && circ.isOffScreen()) {
        Composite.remove(world, circ.body);
        circ = null;
    }

    for (var i = 0; i < boundaries.length; i++) {
        boundaries[i].show();
    }

    for (var i = 0; i < collectables.length; i++) {
        collectables[i].show();

        if (collectables[i].checkCollected(circ)) {
            score += flOzPerCollectable;
            circ.grow(1.35)
            console.log("Collected droplet! Score: " + score);
        }
    }

    for (var i = 0; i < buckets.length; i++) {
        buckets[i].show();

        if (circ && buckets[i].contains(circ)) {
            console.log("Circle is in bucket " + i);
            Composite.remove(world, circ.body);
            circ = null;
        }
    }

    leftWall.show();
    rightWall.show();
    //ground.show();

    drawSidesUI();

    checkWinLose();
    drawGameOverScreen();
}

function drawWhiteBg() {
    push();

    var whiteStartY = height - 160;
    var fadeHeight = 50;

    var topColor = color(0, 161, 157);
    var bottomColor = color(255);

    noStroke();

    // fully white bottom first
    fill(255);
    rect(playX, whiteStartY, PLAY_AREA_WIDTH, height - whiteStartY);

    // gradient overlaps slightly into white
    for (var y = whiteStartY - fadeHeight; y <= whiteStartY + 2; y++) {
        var amount = map(y, whiteStartY - fadeHeight, whiteStartY, 0, 1);
        amount = constrain(amount, 0, 1);

        var gradientColor = lerpColor(topColor, bottomColor, amount);

        stroke(gradientColor);
        line(playX, y, playX + PLAY_AREA_WIDTH, y);
    }

    pop();
}

function drawSidesUI() {
    push();

    fill(50);
    noStroke();
    rect(0, 0, playX, CANVAS_HEIGHT);
    rect(playX + PLAY_AREA_WIDTH, 0, playX, CANVAS_HEIGHT);

    fill(255);
    textSize(36);
    textAlign(CENTER, CENTER);

    var leftUICenterX = playX / 2;
    var rightUICenterX = playX + PLAY_AREA_WIDTH + (playX / 2);

    text("WATERFALL", leftUICenterX, 90);

    var logoMaxW = 220;
    var logoScale = logoMaxW / logo.width;
    var logoW = logoMaxW;
    var logoH = logo.height * logoScale;

    imageMode(CENTER);
    image(logo, rightUICenterX, 90, logoW, logoH);

    textSize(18);
    text("Click inside the play area", leftUICenterX, 210);
    text("to drop a circle", leftUICenterX, 235);
    text("Press R to reset the drop", leftUICenterX, 270);

    text("Player Droplets left: " + playerDropletsLeft, rightUICenterX, 210);
    text("Water collected: " + score + " fl oz", rightUICenterX, 235);
    text("Droplets left: " + (16 - Math.floor(score / 150)), rightUICenterX, 260);
    pop();
}



function pushCloudBoundaries() {
    // cloud pegs
    boundaries.push(new CloudPeg(
        playX + PLAY_AREA_WIDTH * 0.5,
        210,
        28
    ));

    boundaries.push(new CloudPeg(
        playX + PLAY_AREA_WIDTH * 0.75,
        270,
        28
    ));

    boundaries.push(new CloudPeg(
        playX + PLAY_AREA_WIDTH * 0.25,
        270,
        28
    ));

    // cloud platforms
    boundaries.push(new CloudPlatform(
        playX + PLAY_AREA_WIDTH * 0.5,
        410,
        160,
        28,
        1.6
    ));

    boundaries.push(new CloudPlatform(
        playX + PLAY_AREA_WIDTH * 0.75,
        410,
        135,
        30,
        -0.5
    ));

    boundaries.push(new CloudPlatform(
        playX + PLAY_AREA_WIDTH * 0.25,
        410,
        135,
        30,
        0.5
    ));
}

function pushCollectables() {
    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * .5, 150, 12));

    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * 0.625, 225, 12));
    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * 0.595, 325, 12));
    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * 0.78, 325, 12));
    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * 0.68, 355, 12));
    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * 0.595, 425, 12));
    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * 0.595, 525, 12));
    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * 0.8, 525, 12));

    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * .5, 275, 12));

    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * 0.375, 225, 12));
    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * 0.405, 325, 12));
    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * 0.22, 325, 12));
    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * 0.32, 355, 12));
    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * 0.405, 425, 12));
    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * 0.405, 525, 12));
    collectables.push(new Collectable(playX + PLAY_AREA_WIDTH * 0.2, 525, 12));
}

// Turn state handling
function saveTurnState() {
    savedCollectableStates = [];

    for (var i = 0; i < collectables.length; i++) {
        savedCollectableStates.push(collectables[i].collected);
    }

    snappedScore = score;
    snappedPlayerDropletsLeft = playerDropletsLeft;
}

function restoreTurnState() {
    for (var i = 0; i < collectables.length; i++) {
        collectables[i].collected = savedCollectableStates[i];

        if (!collectables[i].collected) {
            Composite.add(world, collectables[i].body);
        } else {
            Composite.remove(world, collectables[i].body);
        }
    }
}

function resetCurrentDrop() {
    if (circ) {
        Composite.remove(world, circ.body);
        circ = null;
    }

    restoreTurnState();

    score = snappedScore;
    playerDropletsLeft = snappedPlayerDropletsLeft;
}

function keyPressed() {
    if (key === 'r' || key === 'R') {
        resetCurrentDrop();
    }
}