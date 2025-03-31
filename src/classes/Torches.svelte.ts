import AMBIENCE from "./Ambience.svelte";
import Torch from "./Torch.svelte";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

class Torches {
    public torches: Record<string, Torch> = $state({});

    public addTorch = (torch: Torch, litFromStart: boolean = false) => {
        this.torches[torch.id] = torch;
        if (litFromStart) {
            torch.lightUp();
        }
    }

    public deleteTorch = (id: string) => {
        this.torches[id].extinguish();
        //delete this.torches[id];
        this.torches = Object.assign(
            {},
            ...Object.keys(this.torches)
                .filter((idIter) => idIter !== id)
                .map((idIter) => ({ [idIter]: this.torches[idIter] }))
        )
    }

    /**
     * Extinguishes all torches
     */
    public pauseAllTorches = () => {
        for (const torch in this.torches) {
            if (this.torches[torch].isLit) {
                this.torches[torch].extinguish();
            }
        }
    }
    /**
     * Cleans up torches that have been blown out
     * @param blownOut array of torch ids that have been blown out
     * @param currentTime current time in seconds
     */
    public cleanUpTorches = (blownOut: string[], currentTime: number) => {
        blownOut.forEach((id) => {
            if (this.torches[id].isLit) {
                if (this.torches[id].timeLeft - (currentTime - this.torches[id].startTime)  <= 0) {
                    this.torches[id].extinguish();
                    this.deleteTorch(id);

                    AMBIENCE.fire?.pause();
                    AMBIENCE.blowout?.play();
                }
            }
        })
        
    }

    /**
     * Decrements the time left on all torches by 10 minutes
     */
    public decrementRound = () => {
        for (const torch in this.torches) {
            // if the torch is lit, decrement the time left by 10 minutes
            const newTimeLeft = this.torches[torch].isLit ? 
                this.torches[torch].timeLeft - 600 : this.torches[torch].timeLeft;
            
            
            this.torches[torch].timeLeft = newTimeLeft;
            this.torches[torch].endTime = dayjs().utc().add(newTimeLeft, 's')

            if (this.torches[torch].timeLeft <= 0) {
                this.deleteTorch(torch);

                // play blowout sound if there are no torches left
                if (Object.keys(this.torches).length === 0) {
                    AMBIENCE.fire?.pause();
                    AMBIENCE.blowout?.play();
                }
            }
        }
    }

    /**
     * Sorts the torches by time left from least to most
     */
    public sortByTimeLeft = () => {
        if (Object.keys(this.torches).length === 0) return;
		this.torches = Object.assign(
			{},
			...Object.keys(this.torches)
				.sort((a, b) => this.torches[a].timeLeft - this.torches[b].timeLeft)
				.map((idIter) => ({ [idIter]: this.torches[idIter] }))
		);
    }
}

export const t = new Torches();