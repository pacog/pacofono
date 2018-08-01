import { IChord } from "types";
import { Volume, FMSynth } from "tone";
import { percentageToDecibels } from "utils/decibels";

interface IPFPolySynthOptions {
    voices: number;
}

class PFPolySynth {

    private options: IPFPolySynthOptions;
    private output: any;
    private allSynths: any[];

    constructor(options: IPFPolySynthOptions) {
        this.options = Object.assign({}, options);
        this.createOutput();
        this.createSynths();
    }

    public playChord(chord: IChord, velocity: number = 0.5): void {
        chord.notes.forEach((note, index) => {
            const synth = this.allSynths[index];
            if (synth) {
                synth.triggerAttackRelease(note, "4n", undefined, velocity);
            }
        });
    }

    public startPlayingChord(chord: IChord, velocity: number = 0.5): void {
        chord.notes.forEach((note, index) => {
            const synth = this.allSynths[index];
            if (synth) {
                synth.triggerAttack(note, undefined, velocity);
            }
        });
    }

    public stopPlaying(): void {
        this.allSynths.forEach((synth) => {
            synth.triggerRelease();
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

    private createOutput(): void {
        this.output = new Volume(-2);
        this.output.toMaster();
    }

    private createSynths(): void {
        this.allSynths = [];
        for (let i = 0; i < this.options.voices; i++) {
            const newSynth = new FMSynth();
            newSynth.connect(this.output);
            this.allSynths.push(newSynth);
        }
    }

}

export const create = (options: IPFPolySynthOptions): PFPolySynth => {
    return new PFPolySynth(options);
};
