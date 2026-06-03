function Bucket(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // invisible scoring sensor inside the jerry can
    this.sensor = Bodies.rectangle(x, y + h * 0.15, w * 0.45, h * 0.35, {
        isStatic: true,
        isSensor: true
    });

    // solid angled left rim
    this.leftRim = Bodies.rectangle(x - w * 0.50, y - h * 0.18, w * 0.01, h * 0.15, {
        isStatic: true,
        angle: -0.55,
        friction: 0.2,
        restitution: 0.8
    });

    // solid angled right rim
    this.rightRim = Bodies.rectangle(x + w * 0.50, y - h * 0.18, w * 0.01, h * 0.15, {
        isStatic: true,
        angle: 0.55,
        friction: 0.2,
        restitution: 0.8
    });

    // bottom blocker so balls don't pass straight through visually
    this.bottom = Bodies.rectangle(x, y + h * 0.33, w * 0.45, h * 0.08, {
        isStatic: true,
        friction: 0.3,
        restitution: 0.4
    });

    Composite.add(world, [
        this.sensor,
        this.leftRim,
        this.rightRim,
        this.bottom
    ]);

    this.show = function() {
        imageMode(CENTER);
        image(jerryCanImg, this.x, this.y, this.w, this.h);

        // debug hitboxes
        /*
        this.showBody(this.leftRim);
        this.showBody(this.rightRim);
        this.showBody(this.bottom);
        this.showBody(this.sensor);
        */
        
    };

    this.showBody = function(body) {
        var pos = body.position;
        var angle = body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        noFill();
        stroke(0, 255, 0);
        rect(0, 0, body.bounds.max.x - body.bounds.min.x, body.bounds.max.y - body.bounds.min.y);
        pop();
    };

    this.contains = function(circle) {
        var pos = circle.body.position;

        return (
            pos.x > this.x - this.w * 0.25 &&
            pos.x < this.x + this.w * 0.25 &&
            pos.y > this.y - this.h * 0.05 &&
            pos.y < this.y + this.h * 0.35
        );
    };
}