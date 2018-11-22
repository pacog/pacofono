import GenericPolySynth from "./genericPolySynth";
import { IAMSynthParams } from "types";
import { AMSynth } from "tone";

export default class AMPolySynth extends GenericPolySynth {

    protected getIndividualSynth(params: IAMSynthParams) {
        return new AMSynth(params);
    }

    protected setSpecificParams() {
        this.paramsThatTriggerRecreate = [];
        this.paramsThatCanUpdate = [];
    }

}
