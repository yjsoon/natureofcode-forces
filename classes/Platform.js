class Platform {
    constructor(x, y, len, frictionCoefficient = 0.05) {
        this.x = x;
        this.y = y;
        this.len = len;
        this.h = 10;
        this.frictionCoefficient = frictionCoefficient;
    }

    show() {
        fill(200);
        rect(this.x, this.y, this.len, this.h);
    }

    isBallOnTop(ball) {
        return (
            ball.position.x > this.x &&
            ball.position.x < this.x + this.len &&
            ball.position.y + ball.r >= this.y &&
            ball.position.y + ball.r <= this.y + this.h &&
            ball.velocity.y >= 0
        );
    }

    applyForces(ball) {
        // Apply friction using the stored coefficient
        let friction = ball.velocity.copy();
        friction.normalize();
        friction.mult(-this.frictionCoefficient);
        ball.applyForce(friction);

        // Snap to platform and stop vertical motion
        ball.velocity.y = 0;
        ball.position.y = this.y - ball.r;
    }
} 