import GenericPolySynth from "./genericPolySynth";
import { Synth } from "tone";
import { ISimpleSynthParams } from "types";

export default class SimplePolySynth extends GenericPolySynth {

    protected getIndividualSynth(params: ISimpleSynthParams) {
        return new Synth(params);
    }

    protected setSpecificParams() {
        this.paramsThatTriggerRecreate = ["envelope", "type"];
        this.paramsThatCanUpdate = [];
    }

}
