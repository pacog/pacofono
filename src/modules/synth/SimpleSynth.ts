import GenericSynth from "./GenericSynth";
import { Synth } from "tone";
import { IRawSimpleSynthParams } from "types";

export default class SimpleSynth extends GenericSynth {

    public set(paramName: string, value: any): void {
        switch (paramName) {
            case "type":
                this.tonejsSynth.oscillator.set("type", value);
                break;
            case "envelope":
                this.tonejsSynth.envelope.set(value);
                break;
            default:
                super.set(paramName, value);
        }
    }

    protected init(params: IRawSimpleSynthParams) {
        this.tonejsSynth = new Synth(this.transformParams(params));
    }

    protected getControlledParamsNames(): string[] {
        return [];
    }

    private transformParams(params: IRawSimpleSynthParams): any {
        return {
            oscillator: {
                type: params.type,
            },
            envelope: params.envelope,
        };
    }

}
