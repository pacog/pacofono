import GenericSynth from "./GenericSynth";
import { MonoSynth as ToneMonoSynth} from "tone";
import { IMonoSynthParams } from "types";

export default class MonoSynth extends GenericSynth {

    public set(paramName: string, value: any): void {
        switch (paramName) {
            case "type":
                this.tonejsSynth.oscillator.set("type", value);
                break;
            case "envelope":
                this.tonejsSynth.envelope.set(value);
                break;
            case "filterEnvelope":
                this.tonejsSynth.filterEnvelope.set(value);
                break;
            case "filter":
                this.tonejsSynth.filter.set(value);
                break;
            default:
                super.set(paramName, value);
        }
    }

    protected init(params: IMonoSynthParams) {
        this.tonejsSynth = new ToneMonoSynth(this.transformParams(params));
    }

    private transformParams(params: IMonoSynthParams): any {
        const transformed = {
            ...params,
            oscillator: {
                type: params.type,
            },
        };
        delete transformed.type;

        return transformed;
    }

}
