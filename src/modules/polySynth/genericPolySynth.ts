import { Volume } from "tone";
import VolumeNode from "modules/soundNodes/volumeNode";
import { INoteWithWeight, RawSynthParams, SynthTypes, ISound } from "types";
import { percentageToDecibels } from "utils/decibels";
import isAttrEqual from "utils/isAttrEqual";
import GenericSoundNode from "../soundNodes/GenericSoundNode";
import GenericSynth from "../synth/GenericSynth";

const RAMP_TIME_FOR_VOLUME = 0.02; // seconds

export default abstract class GenericPolySynth extends GenericSoundNode {

    protected numberOfVoices: number;
    protected output: any;
    protected allSynths: GenericSynth[];
    protected synthsPlaying: boolean[];
    protected params: RawSynthParams;
    protected paramsThatCanUpdate: string[] = [];
    private type: SynthTypes = null;

    constructor(output: VolumeNode, type: SynthTypes, params: RawSynthParams) {
        super();
        this.createOutput(output);
        this.allSynths = [];
        this.synthsPlaying = [];
        this.params = params;
        this.type = type;
        this.setSpecificParams();
    }

    public setVolume(percentage: number): void {
        this.output.set("volume", percentageToDecibels(percentage), RAMP_TIME_FOR_VOLUME);
    }

    public getType(): SynthTypes {
        return this.type;
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

    public updateConfig(config: ISound): void {
        // No need to do anything, this will be handled by the ControlledSoundNode Object containing this one
    }

    public updateWithParams(newParams: RawSynthParams): void {
        const paramsToSet = {
            ...this.params,
            ...newParams,
        };
        for (const paramName of this.paramsThatCanUpdate) {
            if (!isAttrEqual(this.params, paramsToSet, paramName)) {
                const paramValue = (paramsToSet as {[key: string]: any; })[paramName];
                this.updateParamAndValueForAllSynths(paramName, paramValue);
            }
        }
        this.params = paramsToSet;
    }

    public shouldBeRecreatedToUseConfig(config: ISound): boolean {
        if (!config) {
            return true;
        }
        return config.synthType !== this.getType();
    }

    protected abstract getIndividualSynth(params: RawSynthParams): GenericSynth;
    protected abstract setSpecificParams(): void;

    protected createSynths() {
        this.allSynths = [];
        for (let i = 0; i < this.numberOfVoices; i++) {
            const newSynth = this.getIndividualSynth(this.params);
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

    private updateParamAndValueForAllSynths(paramName: string, paramValue: any): void {
        if (!this.allSynths) {
            return;
        }
        this.allSynths.forEach((synth) => {
            synth.set(paramName, paramValue);
        });
    }

}
