import GenericSynth from "./GenericSynth";
import { Synth } from "tone";
import { ISimpleSynthParams } from "types";

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

    protected init(params: ISimpleSynthParams) {
        this.tonejsSynth = new Synth(this.transformParams(params));
    }

    private transformParams(params: ISimpleSynthParams): any {
        return {
            oscillator: {
                type: params.type,
            },
            envelope: params.envelope,
        };
    }

}
