import GenericSynth from "./GenericSynth";
import { AMSynth as ToneAMSynth} from "tone";
import { IAMSynthParams } from "types";

export default class AMSynth extends GenericSynth {

    public set(paramName: string, value: any): void {
        switch (paramName) {
            case "type":
                this.tonejsSynth.oscillator.set("type", value);
                break;
            case "modulationType":
                this.tonejsSynth.modulation.set("type", value);
                break;
            case "envelope":
                this.tonejsSynth.envelope.set(value);
                break;
            case "modulationEnvelope":
                this.tonejsSynth.modulationEnvelope.set(value);
                break;
            default:
                super.set(paramName, value);
        }
    }

    protected init(params: IAMSynthParams) {
        this.tonejsSynth = new ToneAMSynth(this.transformParams(params));
    }

    private transformParams(params: IAMSynthParams): any {
        const transformed = {
            ...params,
            oscillator: {
                type: params.type,
            },
            modulation: {
                type: params.modulationType,
            },
        };
        delete transformed.type;
        delete transformed.modulationType;

        return transformed;
    }

}
