import GenericPolySynth from "./GenericPolySynth";
import DuoSynth from "../synth/DuoSynth";
import { IRawDuoSynthParams } from "types";

export default class DuoPolySynth extends GenericPolySynth {

    protected getIndividualSynth(params: IRawDuoSynthParams): DuoSynth {
        return new DuoSynth(params);
    }

    protected setSpecificParams() {
        this.paramsThatCanUpdate = [
            "harmonicity",
            "vibratoRate",
            "vibratoAmount",
            "voice0",
            "voice1",
            "voice0.volume",
            "voice1.volume",
        ];
    }

}
