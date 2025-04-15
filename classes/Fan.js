class Fan {
    constructor(x, y, directionStrength) {
        this.x = x;
        this.y = y;
        
        // Determine direction based on the sign of directionStrength
        let dirX = (directionStrength >= 0) ? 1 : -1; // Right if positive/zero, Left if negative
        this.direction = createVector(dirX, 0); 
        
        // Set strength based on the absolute value of directionStrength
        // Added a small minimum strength to avoid zero strength if directionStrength is 0
        this.strength = Math.max(0.01, Math.abs(directionStrength)); 
        
        // Calculate size based on strength: base size + scaled strength
        const baseSize = 10;
        const scaleFactor = 50; // Adjust this factor to control how much size changes with strength
        this.size = baseSize + this.strength * scaleFactor; 
    }

    show() {
        push(); // Isolate drawing state
        translate(this.x, this.y);

        // Draw the square base
        fill(100); // Dark grey for the base
        noStroke();
        rect(0, 0, 20, 20);

        // Draw the direction arrow (triangle)
        // Position the arrow relative to the center of the appropriate edge of the square
        fill(150, 150, 250); // Light blue color for the fan arrow
        translate(10, 10); // Move origin to the center of the square

        let angle = this.direction.heading();
        rotate(angle);

        // Adjust triangle size and position to look like an arrow attached to the base
        let arrowSize = 8;
        // Position the triangle slightly ahead of the center, along its direction
        translate(10, 0); // Move forward from the center (square edge)
        triangle(
            -arrowSize, -arrowSize / 1.5, // Back left corner
            -arrowSize, arrowSize / 1.5,  // Back right corner
             arrowSize, 0                 // Tip pointing in the direction
        );

        pop(); // Restore drawing state
    }

    // Apply force to a ball object
    applyForce(ball) {
        // Check if the ball is vertically aligned with the fan (within 50px)
        if (abs(ball.position.y - this.y) <= 50) {
            // The force vector is direction scaled by strength
            let force = this.direction.copy();
            force.setMag(this.strength); // Use setMag for clarity, applies magnitude to the direction vector
            ball.applyForce(force);
        }

        // Maybe add a check for distance? Example:
        // let distance = dist(this.x, this.y, ball.position.x, ball.position.y);
        // let maxDistance = 150; // Only apply force if ball is within 150 pixels
        // if (distance < maxDistance) {
        //     let forceMagnitude = map(distance, 0, maxDistance, this.strength, 0); // Force decreases with distance
        //     let force = this.direction.copy();
        //     force.setMag(forceMagnitude);
        //     ball.applyForce(force);
        // }
    }
} 