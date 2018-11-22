import GenericSynth from "./GenericSynth";
import { AMSynth as ToneAMSynth} from "tone";
import { IAMSynthParams } from "types";

export default class AMSynth extends GenericSynth {

    protected init(params: IAMSynthParams) {
        this.tonejsSynth = new ToneAMSynth(params);
    }

}
