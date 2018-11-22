import GenericPolySynth from "./genericPolySynth";
import SimpleSynth from "../synth/SimpleSynth";
import { ISimpleSynthParams } from "types";

export default class SimplePolySynth extends GenericPolySynth {

    protected getIndividualSynth(params: ISimpleSynthParams): SimpleSynth {
        return new SimpleSynth(params);
    }

    protected setSpecificParams() {
        this.paramsThatTriggerRecreate = [];
        this.paramsThatCanUpdate = ["type", "envelope"];
    }

}
