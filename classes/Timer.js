class Timer {
    constructor() {
        this.startTime = 0;
        this.endTime = 0;
        this.running = false;
    }

    start() {
        this.startTime = millis();
        this.running = true;
        this.endTime = 0; // Reset end time in case of restart
    }

    stop() {
        if (this.running) {
            this.endTime = millis();
            this.running = false;
        }
    }

    isRunning() {
        return this.running;
    }

    getElapsedTime() {
        if (this.running) {
            return (millis() - this.startTime) / 1000;
        } else if (this.endTime > 0) {
            return (this.endTime - this.startTime) / 1000;
        } else {
            return 0; // Timer hasn't started or hasn't stopped properly
        }
    }

    show() {
        let elapsed = this.getElapsedTime();
        fill(0);
        textSize(16);
        textStyle(NORMAL); // Ensure normal style by default

        if (this.running) {
            text(`Time: ${elapsed.toFixed(2)}s`, 10, 20);
        } else if (this.endTime > 0) {
            textStyle(BOLD);
            text(`Final Time: ${elapsed.toFixed(2)}s`, 10, 20);
        } else {
            // Optional: Show something if timer hasn't started
            text(`Time: 0.00s`, 10, 20); 
        }
        // Reset text style in case BOLD was used
        textStyle(NORMAL);
    }
} 