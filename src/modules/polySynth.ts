import { INoteWithWeight } from "types";
import { Volume, FMSynth } from "tone";
import { percentageToDecibels } from "utils/decibels";
import { currentSynths } from "modules/currentSynthInfo";

interface IPFPolySynthOptions {
    voices: number;
}

export class PFPolySynth {

    private options: IPFPolySynthOptions;
    private output: any;
    private allSynths: any[];
    private synthsPlaying: boolean[];

    constructor(options: IPFPolySynthOptions, output: any) {
        this.options = Object.assign({}, options);
        this.createOutput(output);
        this.createSynths();
    }

    public startPlayingNotes(notes: INoteWithWeight[], velocity: number = 0.5): void {
        currentSynths.notify({
            numVoices: this.allSynths.length,
            currentNotes: notes,
        });
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
        currentSynths.notify({
            numVoices: this.allSynths.length,
            currentNotes: notes,
        });
        notes.forEach((newNote, index) => {
            if (newNote.frequency) {
                this.updateFrequencyForSynth(index, newNote);
            } else {
                this.stopSynth(index);
            }
        });
    }

    public stopPlaying(): void {
        currentSynths.notify({
            numVoices: this.allSynths.length,
            currentNotes: [],
        });
        this.allSynths.forEach((synth, index) => {
            synth.triggerRelease();
            this.synthsPlaying[index] = false;
        });
    }

    public setVolume(percentage: number): void {
        this.output.set("volume", percentageToDecibels(percentage));
    }

    public destroy() {
        this.allSynths.forEach((synth) => synth.dispose());
        this.allSynths = [];
        this.output.dispose();
        this.output = null;
    }

    private createOutput(externalOutput: any): void {
        this.output = new Volume(-2);
        this.output.connect(externalOutput);
    }

    private createSynths(): void {
        this.allSynths = [];
        for (let i = 0; i < this.options.voices; i++) {
            const newSynth = new FMSynth();
            newSynth.connect(this.output);
            this.allSynths.push(newSynth);
        }
        this.synthsPlaying = new Array(this.options.voices).fill(false);
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

export const create = (options: IPFPolySynthOptions, output: any): PFPolySynth => {
    return new PFPolySynth(options, output);
};
