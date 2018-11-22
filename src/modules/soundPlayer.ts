import { ISound } from "types";
import { INoteWithWeight } from "types";
// import { create as createSynth, PFPolySynth } from "modules/polySynth";
import createSynth from "modules/polySynth/polySynthFactory";
import GenericPolySynth from "modules/polySynth/genericPolySynth";
import VolumeNode from "modules/soundNodes/volumeNode";

export class SoundPlayer {

    private polySynth: GenericPolySynth;
    private masterOut: VolumeNode;
    private numberOfVoices: number;

    constructor(output: VolumeNode) {
        this.masterOut = output;
    }

    public setVolume(volume: number): void {
        if (this.polySynth) {
            this.polySynth.setVolume(volume);
        }
    }

    public startPlayingNotes(notes: INoteWithWeight[], velocity: number = 0.5): void {
        if (this.polySynth) {
            this.polySynth.startPlayingNotes(notes, velocity);
        }
    }

    public updateFrequenciesBeingPlayed(notes: INoteWithWeight[]): void {
        if (this.polySynth) {
            this.polySynth.updateFrequenciesBeingPlayed(notes);
        }
    }

    public stopPlaying(): void {
        if (this.polySynth) {
            this.polySynth.stopPlaying();
        }
    }

    public updateSynth(config: ISound) {
        if (!config) {
            if (this.polySynth) {
                this.polySynth.destroy();
            }
            return;
        }
        if (!this.polySynth || this.polySynth.shouldRecreateSynths(config)) {
            this.recreateSynth(config);
        } else {
            this.polySynth.updateSynthsWithConfig(config);
        }
    }

    public setNumberOfVoices(numberOfVoices: number) {
        this.numberOfVoices = numberOfVoices;
        if (this.polySynth) {
            this.polySynth.setNumberOfVoices(numberOfVoices);
        }
    }

    public destroy(): void {
        if (this.polySynth) {
            this.polySynth.destroy();
        }
    }

    private recreateSynth(config: ISound) {
        if (this.polySynth) {
            this.polySynth.destroy();
        }
        this.polySynth = createSynth(config, this.masterOut);
        if (this.numberOfVoices) {
            this.polySynth.setNumberOfVoices(this.numberOfVoices);
        }
    }

}
