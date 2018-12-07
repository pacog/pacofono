import GenericSynth from "./GenericSynth";
import { DuoSynth as ToneDuoSynth} from "tone";
import { IRawDuoSynthParams, ISynthVoiceParams } from "types";

export default class DuoSynth extends GenericSynth {

    public set(paramName: string, value: any): void {
        switch (paramName) {
            case "voice0":
                setVoiceValues(this.tonejsSynth.voice0, value);
                break;
            case "voice1":
                setVoiceValues(this.tonejsSynth.voice1, value);
                break;
            default:
                super.set(paramName, value);
        }
    }

    protected init(params: IRawDuoSynthParams) {
        this.tonejsSynth = new ToneDuoSynth(this.transformParams(params));
    }

    protected getControlledParamsNames(): string[] {
        return [];
    }

    private transformParams(params: IRawDuoSynthParams): any {
        const voice0 = transformVoice(params.voice0);
        const voice1 = transformVoice(params.voice1);
        const transformed = {
            ...params,
            voice0,
            voice1,
        };
        return transformed;
    }

}

function transformVoice(voiceParams: ISynthVoiceParams): any {
    const transformed = {
        ...voiceParams,
        oscillator: {
            type: voiceParams.type,
        },
    };
    delete transformed.type;

    return transformed;
}

function setVoiceValues(voice: any, values: any): void {
    voice.oscillator.set("type", values.type);
    voice.set("portamento", values.portamento);
    voice.set("volume", values.volume);
    voice.envelope.set(values.envelope);
    voice.filterEnvelope.set(values.filterEnvelope);
}
