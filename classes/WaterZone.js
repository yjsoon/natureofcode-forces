class WaterZone {
    constructor(x, y, w, h, dragCoefficient = 0.01) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.dragCoefficient = dragCoefficient;
    }

    show() {
        fill("#c2f0f4");
        rect(this.x, this.y, this.w, this.h);
    }

    contains(ball) {
        return (
            ball.position.x > this.x &&
            ball.position.x < this.x + this.w &&
            ball.position.y + ball.r > this.y
        );
    }

    applyDrag(ball) {
        let speed = ball.velocity.mag();
        let drag = ball.velocity.copy();
        drag.normalize();
        drag.mult(-this.dragCoefficient * speed * speed);
        ball.applyForce(drag);
    }
} 