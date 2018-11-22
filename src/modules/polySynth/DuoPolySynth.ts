import GenericPolySynth from "./genericPolySynth";
import DuoSynth from "../synth/DuoSynth";
import { IDuoSynthParams } from "types";

export default class DuoPolySynth extends GenericPolySynth {

    protected getIndividualSynth(params: IDuoSynthParams): DuoSynth {
        return new DuoSynth(params);
    }

    protected setSpecificParams() {
        this.paramsThatTriggerRecreate = [];
        this.paramsThatCanUpdate = ["harmonicity", "vibratoRate", "vibratoAmount", "voice0", "voice1"];
    }

}
