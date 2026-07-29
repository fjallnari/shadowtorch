import AMBIENCE from "./Ambience.svelte";
import Torch from "./Torch.svelte";

export class Torches {
    public torches: Record<string, Torch> = $state({});

    public addTorch = (torch: Torch, litFromStart: boolean = false) => {
        this.torches[torch.id] = torch;
        if (litFromStart) {
            torch.lightUp();
        }
    }

    public deleteTorch = (id: string) => {
        this.torches[id].extinguish();
        delete this.torches[id];
    }

    /**
     * Extinguishes all torches
     */
    public pauseAllTorches = (currentTime: number) => {
        for (const torch in this.torches) {
            if (this.torches[torch].isLit) {
                this.torches[torch].pause(currentTime);
            }
        }
    }
    
    /**
     * Returns the ids of torches that have expired: lit torches whose remaining
     * time has run out, plus any unlit torches left at 0 (defensive cleanup).
     * @param currentTime current time in seconds
     */
    public getExpired = (currentTime: number): string[] =>
        Object.keys(this.torches).filter((id) => {
            const torch = this.torches[id];
            if (!torch) return false;
            return torch.isLit
                ? torch.timeLeft - (currentTime - torch.startTime) <= 0
                : torch.timeLeft <= 0;
        });

    /**
     * Cleans up torches that have been blown out
     * @param blownOut array of torch ids that have been blown out
     * @param currentTime current time in seconds
     */
    public cleanUpTorches = (blownOut: string[], currentTime: number) => {
        let didBlowOut = false;
        blownOut.forEach((id) => {
            const torch = this.torches[id];
            if (!torch) return;
            const expired = torch.isLit
                ? torch.timeLeft - (currentTime - torch.startTime) <= 0
                : torch.timeLeft <= 0;
            if (expired) {
                this.deleteTorch(id);
                didBlowOut = true;
            }
        });
        if (didBlowOut) {
            AMBIENCE.fire?.pause();
            AMBIENCE.blowout?.play();
        }
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