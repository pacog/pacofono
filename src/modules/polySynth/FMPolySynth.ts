import GenericPolySynth from "./genericPolySynth";
import FMSynth from "../synth/FMSynth";
import { IFMSynthParams } from "types";

export default class FMPolySynth extends GenericPolySynth {

    protected getIndividualSynth(params: IFMSynthParams) {
        return new FMSynth(params);
    }

    protected setSpecificParams() {
        this.paramsThatTriggerRecreate = [];
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
