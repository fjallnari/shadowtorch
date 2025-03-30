import { nanoid } from "nanoid/non-secure";
import type TorchInterface from "../interfaces/TorchInterface";
import AMBIENCE from "./Ambience.svelte";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { timer } from "./Timer.svelte";

dayjs.extend(utc);


class Torch implements TorchInterface {
    public id: string = $state("");
    public name: string = $state("");
    public timeLeft: number = $state(3600);
    public startTime: number = $state(0); // ! relative time to mounting the application
    public endTime?: dayjs.Dayjs = $state(undefined);
    public isLit: boolean = $state(false);
    

    constructor() {
        this.id = nanoid(10);
        this.endTime = dayjs().utc().add(1, 'h');
    }

    public lightUp = () => {
        this.endTime = dayjs().utc().add(this.timeLeft, 's');
        this.startTime = timer.getTime() / 1000;
		this.isLit = true;
        
        if (AMBIENCE.fire?.paused) {
            AMBIENCE.fire?.play();
        }
    }

    public extinguish = () => {
        this.timeLeft = this.endTime?.diff(dayjs().utc(), 's')!;
        this.isLit = false;
    }

    public switch = () => {
		this.isLit = !this.isLit;

		if (this.isLit) {
			this.lightUp();
		} else {
			this.extinguish();
		}
	};

    /**
     * @returns time left in a format of MM:SS
     * Gets called every change of the timer
     */
    public prettyTime = (currentTime: number) => {
        if (this.timeLeft === 0) {
            this.extinguish();
        }
        
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