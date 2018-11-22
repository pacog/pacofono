import { SynthParams } from "types";

export default abstract class GenericSynth {

    protected tonejsSynth: any;

    constructor(params: SynthParams) {
        this.init(params);
    }

    // TODO use a proper type
    public connect(node: any) {
        this.tonejsSynth.connect(node);
    }

    public set(paramName: string, value: any): void {
        this.tonejsSynth.set(paramName, value);
    }

    public triggerAttack(frequency: number, time: number, velocity: number = 1) {
        this.tonejsSynth.triggerAttack(frequency, time, velocity);
    }

    public triggerRelease(): void {
        this.tonejsSynth.triggerRelease();
    }

    public dispose(): void {
        this.tonejsSynth.dispose();
    }

    protected abstract init(params: SynthParams): void;

}
