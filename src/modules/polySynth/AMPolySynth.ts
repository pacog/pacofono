import GenericPolySynth from "./GenericPolySynth";
import AMSynth from "../synth/AMSynth";
import { IRawAMSynthParams } from "types";

export default class AMPolySynth extends GenericPolySynth {

    protected getIndividualSynth(params: IRawAMSynthParams): AMSynth {
        return new AMSynth(params);
    }

    protected setSpecificParams() {
        this.paramsThatCanUpdate = ["envelope", "harmonicity", "type", "modulationType", "modulationEnvelope"];
    }

}
