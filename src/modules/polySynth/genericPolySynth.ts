import { Volume } from "tone";
import VolumeNode from "modules/soundNodes/volumeNode";
import { INoteWithWeight } from "types";
import { percentageToDecibels } from "utils/decibels";

// TODO: should probably inherit from GenericNode
export default abstract class GenericPolySynth {

    protected numberOfVoices: number;
    protected output: any;
    protected allSynths: any[];
    protected synthsPlaying: boolean[];

    constructor(output: VolumeNode) {
        this.createOutput(output);
        this.allSynths = [];
        this.synthsPlaying = [];
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

    public destroy(): void {
        this.destroyCurrentSynths();
        this.output.dispose();
        this.output = null;
    }

    protected abstract getIndividualSynth(): any;

    protected createSynths() {
        this.allSynths = [];
        for (let i = 0; i < this.numberOfVoices; i++) {
            const newSynth = this.getIndividualSynth();
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

}
