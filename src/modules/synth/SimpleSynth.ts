import GenericSynth from "./GenericSynth";
import { Synth } from "tone";
import { ISimpleSynthParams } from "types";

export default class SimpleSynth extends GenericSynth {

    protected init(params: ISimpleSynthParams) {
        this.tonejsSynth = new Synth(params);
    }

}
