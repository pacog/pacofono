import { ISound } from "types";
import { INoteWithWeight } from "types";
import createSynth from "modules/polySynth/polySynthFactory";
import GenericPolySynth from "modules/polySynth/genericPolySynth";
import VolumeNode from "modules/soundNodes/volumeNode";
import { getRawParamsFromConfig } from "modules/synthParamsProcessor";

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
            this.destroyCurrentSynth();
            return;
        }

        if (this.polySynth && (config.synthType !== this.polySynth.getType())) {
            this.destroyCurrentSynth();
        }

        if (this.polySynth) {
            this.polySynth.updateSynthsWithParams(getRawParamsFromConfig(config));
        } else {
            this.createSynth(config);
        }
    }

    public setNumberOfVoices(numberOfVoices: number) {
        this.numberOfVoices = numberOfVoices;
        if (this.polySynth) {
            this.polySynth.setNumberOfVoices(numberOfVoices);
        }
    }

    public destroy(): void {
        this.destroyCurrentSynth();
    }

    private createSynth(config: ISound) {
        this.polySynth = createSynth(config.synthType, getRawParamsFromConfig(config), this.masterOut);
        if (this.numberOfVoices) {
            this.polySynth.setNumberOfVoices(this.numberOfVoices);
        }
    }

    private destroyCurrentSynth(): void {
        if (this.polySynth) {
            this.polySynth.destroy();
            this.polySynth = null;
        }
    }

}
