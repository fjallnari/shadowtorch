import AMBIENCE from "./Ambience.svelte";
import Torch from "./Torch.svelte";

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
        delete this.torches[id];
    }

    /**
     * Extinguishes all torches
     */
    public pauseAllTorches = () => {
        for (const torch in this.torches) {
            this.torches[torch].extinguish();
        }
    }

    /**
     * Decrements the time left on all torches by 10 minutes
     */
    public decrementRound = () => {
        for (const torch in this.torches) {
            this.torches[torch].timeLeft -= 600;
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

export default Torches;