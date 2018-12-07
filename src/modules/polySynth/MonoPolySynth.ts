import GenericPolySynth from "./genericPolySynth";
import MonoSynth from "../synth/MonoSynth";
import { IRawMonoSynthParams } from "types";

export default class MonoPolySynth extends GenericPolySynth {

    protected getIndividualSynth(params: IRawMonoSynthParams) {
        return new MonoSynth(params);
    }

    protected setSpecificParams() {
        this.paramsThatCanUpdate = ["type", "filter", "filterEnvelope", "envelope"];
    }

}
