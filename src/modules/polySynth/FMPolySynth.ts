import { INoteWithWeight } from "types";
import VolumeNode from "modules/soundNodes/volumeNode";
import GenericPolySynth from "./genericPolySynth";
import { Volume, FMSynth } from "tone";
import { percentageToDecibels } from "utils/decibels";

export default class FMPolySynth extends GenericPolySynth {

    private numberOfVoices: number;
    private allSynths: any[];
    private synthsPlaying: boolean[];
    private output: any;

    constructor(output: VolumeNode) {
        super();
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

    private destroyCurrentSynths(): void {
        this.allSynths.forEach((synth) => synth.dispose());
        this.allSynths = [];
        this.synthsPlaying = [];
    }

    private createSynths() {
        this.allSynths = [];
        for (let i = 0; i < this.numberOfVoices; i++) {
            const newSynth = new FMSynth();
            newSynth.connect(this.output);
            this.allSynths.push(newSynth);
        }
        this.synthsPlaying = new Array(this.numberOfVoices).fill(false);
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
//
// private options: IPFPolySynthOptions;
// private output: any;
// private allSynths: any[];
// private synthsPlaying: boolean[];
//
// constructor(options: IPFPolySynthOptions, output: any) {
//     this.options = Object.assign({}, options);
//     this.createOutput(output);
//     this.createSynths();
// }
//
// public startPlayingNotes(notes: INoteWithWeight[], velocity: number = 0.5): void {
//     currentSynths.notify({
//         numVoices: this.allSynths.length,
//         currentNotes: notes,
//     });
//
// }
//
// public updateFrequenciesBeingPlayed(notes: INoteWithWeight[]): void {
//     currentSynths.notify({
//         numVoices: this.allSynths.length,
//         currentNotes: notes,
//     });
//
// }
//
// public stopPlaying(): void {
//     currentSynths.notify({
//         numVoices: this.allSynths.length,
//         currentNotes: [],
//     });
//
// }
//
// public setVolume(percentage: number): void {
//
// }
//
// public destroy() {
//     this.allSynths.forEach((synth) => synth.dispose());
//     this.allSynths = [];
//     this.output.dispose();
//     this.output = null;
// }
//
// private createOutput(externalOutput: any): void {
//     this.output = new Volume(-2);
//     this.output.connect(externalOutput);
// }
//
// private createSynths(): void {
//     this.allSynths = [];
//     for (let i = 0; i < this.options.voices; i++) {
//         const newSynth = new FMSynth();
//         newSynth.connect(this.output);
//         this.allSynths.push(newSynth);
//     }
//     this.synthsPlaying = new Array(this.options.voices).fill(false);
// }
//
