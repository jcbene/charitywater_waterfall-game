var Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

    

var engine;
var world;
var circ;

var leftWall;
var rightWall;
var ground;

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

const PLAY_AREA_WIDTH = 700;
const PLAY_AREA_HEIGHT = 720;

var playX;
var playY;

var boundaries = [];

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
    ground = new Boundary(playX + PLAY_AREA_WIDTH / 2, playY + PLAY_AREA_HEIGHT - 25, PLAY_AREA_WIDTH, 50, 0);

    //boundaries.push(new Boundary(0, 300, 300, 50, .3));
}

function mousePressed() {
    var insidePlayCheck = 
        mouseX > playX && mouseX < playX + PLAY_AREA_WIDTH &&
        mouseY > playY && mouseY < playY + PLAY_AREA_HEIGHT;
    
    if (!insidePlayCheck) {
        return;
    }
    // delete previous circle if it exists
    if (circ) {
        Composite.remove(world, circ.body);
    }
    circ = new Circle(mouseX, mouseY, 50);
}

function draw() {
    background(100);

    if (circ) {
        circ.show();
    }

    for (var i = 0; i < boundaries.length; i++) {
        boundaries[i].show();
    }

    leftWall.show();
    rightWall.show();
    ground.show();

    drawSidesUI();
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

    text("UI", leftUICenterX, 50);
    text("UI", rightUICenterX, 50);

    textSize(18);
    text("Click inside the play area", leftUICenterX, 100);
    text("to drop a circle", leftUICenterX, 120);
    text("Score/droplets left/", rightUICenterX, 130);
    text("[ button ]", rightUICenterX, 150);
    pop();
}