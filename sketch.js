let ball;
let platforms = [];
let waterZone;
let timer;
let fans = []; // Array to hold fan objects

function setup() {
    createCanvas(800, 600);
    ball = new Ball(50, 50, 20);

    // Create platforms: x, y, width, friction coefficient
    let platform1 = new Platform(0, 200, 300, 0.05);
    let platform2 = new Platform(400, 300, width - 400, 0.05);
    let floor = new Platform(0, height - 20, width, 0.05);
    platforms.push(platform1);
    platforms.push(platform2);
    platforms.push(floor);

    // Place fans on platforms: x, y, strength (negative for left)
    fans.push(new Fan(platform1.x + 20, platform1.y - 20, 0.1));
    fans.push(new Fan(platform2.x + platform2.len - 40, platform2.y - 20, -0.1));
    fans.push(new Fan(floor.x + 20, floor.y - 20, 0.1)); 

    // Create water zone: x, y, width, height, drag coefficient
    waterZone = new WaterZone(0, 400, width, height - 400, 0.05);

    // Create timer
    timer = new Timer();
    timer.start();
}

function draw() {
    background(255);

    waterZone.show();

    // Loop through the platforms and fans and show them
    platforms.forEach((p) => p.show());
    fans.forEach((f) => f.show()); 

    // Draw the end zone
    fill("firebrick");
    rect(700, 500, 80, 80); 

    let gravity = createVector(0, 0.2);
    ball.applyForce(gravity);

    // Apply forces from platforms
    platforms.forEach((p) => {
        if (p.isBallOnTop(ball)) {
            p.applyForces(ball);
        }
    });

    // Apply forces from fans
    fans.forEach((f) => {
        f.applyForce(ball);
    });

    if (waterZone.contains(ball)) {
        waterZone.applyDrag(ball);
    }

    // Only update and show the ball if the timer is running
    if (timer.isRunning()) {
        ball.update();
        ball.show();
    } 

    // Check if the ball has reached the goal
    checkGoalReached();

    // Show the timer
    timer.show();
}

function checkGoalReached() {
    if (ball.position.x > 700 && ball.position.y > 500) {
        if (timer.isRunning()) {
            timer.stop();
        }
    }
}
