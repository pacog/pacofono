import GenericPolySynth from "./genericPolySynth";
import { DuoSynth } from "tone";
import { IDuoSynthParams } from "types";

export default class DuoPolySynth extends GenericPolySynth {

    protected getIndividualSynth(params: IDuoSynthParams) {
        return new DuoSynth(params);
    }

    protected setSpecificParams() {
        this.paramsThatTriggerRecreate = [];
        this.paramsThatCanUpdate = [];
    }

}
