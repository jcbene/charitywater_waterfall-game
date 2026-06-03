function Bucket(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // create an invisble bucket body for collision detection
    this.body = Bodies.rectangle(x, y, w * 0.75, h * 0.25, {
        isStatic: true,
        isSensor: true // make the body a sensor so it doesn't physically interact with circles
    });

    Composite.add(world, this.body);

    this.show = function() {
        imageMode(CENTER);
        image(jerryCanImg, this.x, this.y, this.w, this.h);
    };

    this.contains = function(circle) {
        var pos = circle.body.position;
        return (
            pos.x > this.x - this.w / 2 &&
            pos.x < this.x + this.w / 2 &&
            pos.y > this.y - this.h / 2 &&
            pos.y < this.y + this.h / 2
        );
    };
}