function Circle(x,y,r) {
    var options = {
        friction: 0.2,
        restitution: 0.8
    };

    this.body = Bodies.circle(x, y, r, options);
    this.r = r;

    this.squashX = 1;
    this.squashY = 1;

    Composite.add(world, this.body);

    this.grow = function(amount) {
        var oldR = this.r;
        this.r += amount;

        var scaleAmount = this.r / oldR;
        Matter.Body.scale(this.body, scaleAmount, scaleAmount);

        this.squashX = 1.25;
        this.squashY = 0.75;
    };

    this.squash = function() {
        var velocity = this.body.velocity;

        if (abs(velocity.y) > abs(velocity.x)) {
            this.squashX = 1.3;
            this.squashY = 0.7;
        } else {
            this.squashX = 0.75;
            this.squashY = 1.3;
        }
    };

    this.isOffScreen = function() {
        var pos = this.body.position;
        return pos.y > height + 200;
    };

    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angle;

        this.squashX = lerp(this.squashX, 1, 0.12);
        this.squashY = lerp(this.squashY, 1, 0.12);

        var fallSpeed = this.body.velocity.y;
        var fallingStretch = constrain(fallSpeed * 0.03, 0, 0.25);

        var drawScaleX = this.squashX - fallingStretch * 0.4;
        var drawScaleY = this.squashY + fallingStretch;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        scale(drawScaleX, drawScaleY);

        stroke(255);
        fill(0, 51, 102);
        ellipse(0, 0, this.r * 2, this.r * 2);

        pop();
    };
}