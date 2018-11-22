import GenericSynth from "./GenericSynth";
import { FMSynth as ToneFMSynth} from "tone";
import { IFMSynthParams } from "types";

export default class FMSynth extends GenericSynth {

    protected init(params: IFMSynthParams) {
        this.tonejsSynth = new ToneFMSynth(params);
    }

}
