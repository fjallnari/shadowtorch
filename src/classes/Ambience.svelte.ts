class Ambience {
    public fire: HTMLAudioElement | null = $state(null);
    public blowout: HTMLAudioElement | null = $state(null);
    public fireEnabled: boolean = $state(true);
    public blowoutEnabled: boolean = $state(true);

    public switchFire = () => {
        if (!this.fire) return;
        this.fire.muted = !this.fire.muted;
        this.fireEnabled = !this.fire.muted;
    }

    public switchBlowout = () => {
        if (!this.blowout) return;
        this.blowout.muted = !this.blowout.muted;
        this.blowoutEnabled = !this.blowout.muted;
    }

}

const AMBIENCE = $state(new Ambience());
export default AMBIENCE;