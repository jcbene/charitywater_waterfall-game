function Circle(x,y,r) {
    var options = {
        friction: 0.2,
        restitution: 0.8
    }
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;

    Composite.add(world, this.body);

    this.isOffScreen = function() {
        var pos = this.body.position;
        return (pos.y > height + 200);
    }

    this.show = function() {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        stroke(255);
        fill(0, 51, 102);
        ellipse(0, 0, this.r*2, this.r*2);
        pop();
        
    }
}