import GenericSynth from "./GenericSynth";
import { MonoSynth as ToneMonoSynth} from "tone";
import { IMonoSynthParams } from "types";

export default class MonoSynth extends GenericSynth {

    protected init(params: IMonoSynthParams) {
        this.tonejsSynth = new ToneMonoSynth(params);
    }

}
