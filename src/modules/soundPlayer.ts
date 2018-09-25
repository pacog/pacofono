import { INoteWithWeight } from "types";
import { create as createSynth, PFPolySynth } from "modules/polySynth";

interface ISoundPlayerOptions {
    voices: number;
}

export class SoundPlayer {

    private polySynth: PFPolySynth;

    constructor(options: ISoundPlayerOptions, output: any) {
        this.polySynth = createSynth(options, output);
    }

    public setVolume(volume: number): void {
        this.polySynth.setVolume(volume);
    }

    public startPlayingNotes(notes: INoteWithWeight[], velocity: number = 0.5): void {
        this.polySynth.startPlayingNotes(notes, velocity);
    }

    public updateFrequenciesBeingPlayed(notes: INoteWithWeight[]): void {
        this.polySynth.updateFrequenciesBeingPlayed(notes);
    }

    public stopPlaying(): void {
        this.polySynth.stopPlaying();
    }

    public destroy(): void {
        this.polySynth.destroy();
    }

}
