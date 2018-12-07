import GenericPolySynth from "./genericPolySynth";
import SimpleSynth from "../synth/SimpleSynth";
import { IRawSimpleSynthParams } from "types";

export default class SimplePolySynth extends GenericPolySynth {

    protected getIndividualSynth(params: IRawSimpleSynthParams): SimpleSynth {
        return new SimpleSynth(params);
    }

    protected setSpecificParams() {
        this.paramsThatCanUpdate = ["type", "envelope"];
    }

}
