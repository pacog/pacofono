import GenericPolySynth from "./genericPolySynth";
import AMSynth from "../synth/AMSynth";
import { IAMSynthParams } from "types";

export default class AMPolySynth extends GenericPolySynth {

    protected getIndividualSynth(params: IAMSynthParams): AMSynth {
        return new AMSynth(params);
    }

    protected setSpecificParams() {
        this.paramsThatTriggerRecreate = [];
        this.paramsThatCanUpdate = [];
    }

}
