function CloudPeg(x, y, r) {
    this.body = Bodies.circle(x, y, r, {
        isStatic: true,
        friction: 0,
        restitution: .8
    });

    this.r = r;

    Composite.add(world, this.body);

    this.show = function() {
        var pos = this.body.position;

        imageMode(CENTER);
        image(cloudPegImg, pos.x, pos.y, this.r * 3.2, this.r * 2.4);
    };
}

function CloudPlatform(x, y, w, h, angle) {
    this.body = Bodies.rectangle(x, y, w, h, {
        isStatic: true,
        angle: angle,
        friction: 0.3,
        restitution: 0.7
    });

    this.w = w;
    this.h = h;

    Composite.add(world, this.body);

    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(cloudPlatformImg, 0, 0, this.w * 1.4, this.h * 3);
        pop();
    };
}