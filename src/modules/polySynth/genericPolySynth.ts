import { Volume } from "tone";
import VolumeNode from "modules/soundNodes/volumeNode";
import { INoteWithWeight, ISound, SynthParams } from "types";
import { percentageToDecibels } from "utils/decibels";
import isAttrEqual from "utils/isAttrEqual";
import GenericSynth from "../synth/GenericSynth";

// TODO: should probably inherit from GenericNode
export default abstract class GenericPolySynth {

    protected numberOfVoices: number;
    protected output: any;
    protected allSynths: GenericSynth[];
    protected synthsPlaying: boolean[];
    protected config: ISound;
    protected paramsThatTriggerRecreate: string[] = [];
    protected paramsThatCanUpdate: string[] = [];

    constructor(output: VolumeNode, config: ISound) {
        this.createOutput(output);
        this.allSynths = [];
        this.synthsPlaying = [];
        this.config = config;
        this.setSpecificParams();
    }

    public setVolume(percentage: number): void {
        this.output.set("volume", percentageToDecibels(percentage));
    }

    public startPlayingNotes(notes: INoteWithWeight[], velocity: number = 0.5): void {
        notes.forEach((note, index) => {
            const synth = this.allSynths[index];
            if (synth && note.frequency) {
                this.synthsPlaying[index] = true;
                synth.set("volume", percentageToDecibels(note.weight));
                synth.triggerAttack(note.frequency, undefined, velocity);
            }
        });
    }

    public updateFrequenciesBeingPlayed(notes: INoteWithWeight[]): void {
        notes.forEach((newNote, index) => {
            if (newNote.frequency) {
                this.updateFrequencyForSynth(index, newNote);
            } else {
                this.stopSynth(index);
            }
        });
    }

    public stopPlaying(): void {
        this.allSynths.forEach((synth, index) => {
            synth.triggerRelease();
            this.synthsPlaying[index] = false;
        });
    }

    public setNumberOfVoices(numberOfVoices: number): void {
        if (numberOfVoices !== this.numberOfVoices) {
            this.numberOfVoices = numberOfVoices;
            this.destroyCurrentSynths();
            this.createSynths();
        }
    }

    public shouldRecreateSynths(newConfig: ISound): boolean {
        if (this.config.synthType !== newConfig.synthType) {
            return true;
        }
        return this.shouldRecreateSynthsBasedOnParams(this.config.params, newConfig.params);
    }

    public destroy(): void {
        this.destroyCurrentSynths();
        this.output.dispose();
        this.output = null;
    }

    public updateSynthsWithConfig(newConfig: ISound): void {
        for (const paramName of this.paramsThatCanUpdate) {
            if (!isAttrEqual(this.config.params, newConfig.params, paramName)) {
                const paramValue = (newConfig.params as {[key: string]: any; })[paramName];
                this.updateParamAndValueForAllSynths(paramName, paramValue);
            }
        }
        this.config = newConfig;
    }

    protected abstract getIndividualSynth(params: SynthParams): GenericSynth;
    protected abstract setSpecificParams(): void;

    protected createSynths() {
        this.allSynths = [];
        for (let i = 0; i < this.numberOfVoices; i++) {
            const newSynth = this.getIndividualSynth(this.config.params);
            newSynth.connect(this.output);
            this.allSynths.push(newSynth);
        }
        this.synthsPlaying = new Array(this.numberOfVoices).fill(false);
    }

    private destroyCurrentSynths(): void {
        this.allSynths.forEach((synth) => synth.dispose());
        this.allSynths = [];
        this.synthsPlaying = [];
    }

    private createOutput(externalOutput: VolumeNode): void {
        this.output = new Volume(-2);
        this.output.connect(externalOutput.getNode());
    }

    private updateFrequencyForSynth(synthIndex: number, note: INoteWithWeight): void {
        const synth = this.allSynths[synthIndex];
        synth.set("volume", percentageToDecibels(note.weight));
        if (!this.synthsPlaying[synthIndex]) {
            synth.triggerAttack(note.frequency, undefined, 1);
            this.synthsPlaying[synthIndex] = true;
        } else {
            synth.set("frequency", note.frequency);
        }
    }

    private stopSynth(synthIndex: number): void {
        if (this.synthsPlaying[synthIndex]) {
            const synth = this.allSynths[synthIndex];
            synth.set("volume", percentageToDecibels(0));
            synth.triggerRelease();
            this.synthsPlaying[synthIndex] = false;
        }
    }

    private shouldRecreateSynthsBasedOnParams(oldParams: SynthParams, newParams: SynthParams): boolean {
        for (const paramName of this.paramsThatTriggerRecreate) {
            if (!isAttrEqual(oldParams, newParams, paramName)) {
                return true;
            }
        }

        return false;
    }

    private updateParamAndValueForAllSynths(paramName: string, paramValue: any): void {
        if (!this.allSynths) {
            return;
        }
        this.allSynths.forEach((synth) => {
            synth.set(paramName, paramValue);
        });
    }

}
