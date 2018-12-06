import { SynthParams } from "types";

export default abstract class GenericSynth {

    protected tonejsSynth: any;

    constructor(params: SynthParams) {
        // Should store here the arams being controlled so we can update values
        this.init(params);
    }

    public connect(node: any) { // TODO use a proper type
        this.tonejsSynth.connect(node);
    }

    public set(paramName: string, value: any): void {
        // TODO: we should have a list of params being controlled, and check that
        const TYPES_THAT_CAN_BE_SET = ["number", "string"];
        if (TYPES_THAT_CAN_BE_SET.indexOf(typeof value) !== -1) {
            this.tonejsSynth.set(paramName, value);
        } else {
            console.log("setting other param");
        }
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
