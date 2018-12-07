import GenericPolySynth from "./genericPolySynth";
import FMSynth from "../synth/FMSynth";
import { IRawFMSynthParams } from "types";

export default class FMPolySynth extends GenericPolySynth {

    protected getIndividualSynth(params: IRawFMSynthParams) {
        return new FMSynth(params);
    }

    protected setSpecificParams() {
        this.paramsThatCanUpdate = [
            "envelope",
            "harmonicity",
            "type",
            "modulationType",
            "modulationEnvelope",
            "modulationIndex",
        ];
    }

}
