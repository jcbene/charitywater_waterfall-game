function Collectable(x, y, r) {
    this.body = Bodies.circle(x, y, r, {
        isStatic: true,
        isSensor: true
    });

    this.r = r;
    this.collected = false; // flag to track if this collectable has been collected

    Composite.add(world, this.body);

    this.show = function() {
        if (this.collected) {
            return;
        }

        var pos = this.body.position;

        push();
        translate(pos.x, pos.y);

        noStroke();
        fill(120, 220, 255);
        ellipse(0, 0, this.r * 2, this.r * 2);

        fill(255, 180);
        ellipse(-this.r * 0.35, -this.r * 0.35, this.r * 0.5, this.r * 0.5);

        pop();
    };

    this.checkCollected = function(circle) {
        if (this.collected || !circle) {
            return false;
        }

        var pos = this.body.position;
        var circlePos = circle.body.position;

        var d = dist(pos.x, pos.y, circlePos.x, circlePos.y);

        if (d < this.r + circle.r) {
            this.collected = true;
            Composite.remove(world, this.body);
            return true;
        }

        return false;
    };
}