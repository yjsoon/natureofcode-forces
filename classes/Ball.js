class Ball {
    constructor(x, y, r) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.r = r;
        this.mass = r * 0.1;
    }

    applyForce(force) {
        let f = force.copy().div(this.mass);
        this.acceleration.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    show() {
        fill("black");
        noStroke();
        circle(this.position.x, this.position.y, this.r * 2);
    }
} 