import { nanoid } from "nanoid/non-secure";
import type TorchInterface from "../interfaces/TorchInterface";
import AMBIENCE from "./Ambience.svelte";
import { timer } from "./Timer.svelte";
import TORCH_SETTINGS from "./TorchSettings.svelte";


class Torch implements TorchInterface {
    public id: string = $state("");
    public name: string = $state("");
    public timeLeft: number = $state(0);
    public startTime: number = $state(0); // ! relative time to mounting the application
    public isLit: boolean = $state(false);

    constructor() {
        this.id = nanoid(10);
        this.timeLeft = TORCH_SETTINGS.maxSeconds;
    }

    public lightUp = () => {
        this.startTime = Math.round(timer.getTime() / 1000);
		this.isLit = true;
        
        if (AMBIENCE.fire?.paused) {
            AMBIENCE.fire?.play();
        }
    }

    public extinguish = () => {
        this.timeLeft = 0;
        this.isLit = false;
    }

    public pause = (currentTime: number) => {
        this.timeLeft = this.timeLeft - (currentTime - this.startTime);
        this.isLit = false;
    }

    public switch = (currentTime: number) => {
		this.isLit = !this.isLit;

		if (this.isLit) {
			this.lightUp();
		} else {
			this.pause(currentTime);
		}
	};

    /**
     * @returns time left in a format of MM:SS
     * Gets called every change of the timer
     */
    public prettyTime = (currentTime: number) => {
        let displayTime = this.isLit ? 
            this.timeLeft - (currentTime - this.startTime) : this.timeLeft;

        const minutes = this.secondsToMinutes(displayTime);
        const remainingSeconds = Math.floor(displayTime % 60);
        return `${this.padWithZeroes(minutes)}:${this.padWithZeroes(remainingSeconds)}`;
    }

    private secondsToMinutes = (seconds: number) => Math.floor(seconds / 60);
    private padWithZeroes = (number: number) => number.toString().padStart(2, '0');
}

export default Torch;