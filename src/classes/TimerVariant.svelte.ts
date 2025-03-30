class TimerVariant {
    public timers: { [key: string]: NodeJS.Timeout } = $state({}); // An object of timers by ID
    public nextID: number = $state(0); // Next available timer reference ID

    // Set a timer
    public set = (callback: () => void, interval: number) => { 
        var expected = Date.now() + interval; // Expected currect time when timeout fires
        var ID = this.nextID++; // Create reference to timer

        // Adjusts the timeout to account for any drift since last timeout
        const step = () => { 
            callback();
            // The drift (ms) (positive for overshooting) comparing the expected time to the current time
            var dt = Date.now() - expected; 
            expected += interval; // Set the next expected currect time when timeout fires
            this.timers[ID] = setTimeout(step, Math.max(0, interval - dt)); // Take into account drift
        }
        // Return reference to timer
        this.timers[ID] = setTimeout(step, interval);
        return ID;
    }

    // Clear & delete a timer by ID reference
    public clear = (ID: number) => { 
        // Preventing errors when trying to clear a timer that no longer exists
        if (this.timers[ID] != undefined) { 
            console.log('clear timer:', ID);
            console.log('timers before:', this.timers);
            // Clear timer
            clearTimeout(this.timers[ID]);
            // Delete timer reference
            delete this.timers[ID];
            console.log('timers after:', this.timers);
        }
    }
}

let pTimer = $state(new TimerVariant());

export default pTimer;