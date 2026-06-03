var Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

var engine;
var world;
var circ;
var ground;

function setup() {
    createCanvas(800, 800);

    engine = Engine.create();
    world = engine.world;

    var runner = Runner.create();
    Runner.run(runner, engine);

    ground = Bodies.rectangle(width / 2, height - 25, width, 50, {
        isStatic: true
    });

    Composite.add(world, ground);
}

function mousePressed() {
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

    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, width, 50);
}