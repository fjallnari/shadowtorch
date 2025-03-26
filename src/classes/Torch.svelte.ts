import { nanoid } from "nanoid/non-secure";
import type TorchInterface from "../interfaces/TorchInterface";
import AMBIENCE from "./Ambience.svelte";

class Torch implements TorchInterface {
    public id: string = $state("");
    public name: string = $state("");
    public timeLeft: number = $state(3600);
    public isLit: boolean = $state(false);
    public intervalID?: NodeJS.Timeout | undefined = $state(undefined);

    constructor() {
        this.id = nanoid(10);
    }

    public lightUp = () => {
        this.intervalID = setInterval(() => {
			this.timeLeft -= 1;
			if (this.timeLeft === 0) {
				clearInterval(this.intervalID);
				this.isLit = false;
			}
		}, 1000);
		this.isLit = true;
        
        if (AMBIENCE.fire?.paused) {
            AMBIENCE.fire?.play();
        }
    }

    public extinguish = () => {
        clearInterval(this.intervalID!);
        this.isLit = false;
    }

    public switch = () => {
		this.isLit = !this.isLit;

		if (this.isLit) {
			this.lightUp();
		} else {
			clearInterval(this.intervalID);
		}
	};

    /**
     * @returns time left in a format of MM:SS
     */
    public prettyTime = () => {
        const minutes = this.secondsToMinutes(this.timeLeft);
        const remainingSeconds = this.timeLeft % 60;
        return `${this.padWithZeroes(minutes)}:${this.padWithZeroes(remainingSeconds)}`;
    }

    private secondsToMinutes = (seconds: number) => Math.floor(seconds / 60);
    private padWithZeroes = (number: number) => number.toString().padStart(2, '0');
}

export default Torch;