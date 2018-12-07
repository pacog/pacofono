import GenericSynth from "./GenericSynth";
import { FMSynth as ToneFMSynth} from "tone";
import { IRawFMSynthParams } from "types";

export default class FMSynth extends GenericSynth {

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

    protected init(params: IRawFMSynthParams) {
        this.tonejsSynth = new ToneFMSynth(this.transformParams(params));
    }

    protected getControlledParamsNames(): string[] {
        return ["harmonicity"];
    }

    private transformParams(params: IRawFMSynthParams): any {
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
