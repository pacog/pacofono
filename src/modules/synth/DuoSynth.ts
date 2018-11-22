import GenericSynth from "./GenericSynth";
import { DuoSynth as ToneDuoSynth} from "tone";
import { IDuoSynthParams } from "types";

export default class DuoSynth extends GenericSynth {

    protected init(params: IDuoSynthParams) {
        this.tonejsSynth = new ToneDuoSynth(params);
    }

}
