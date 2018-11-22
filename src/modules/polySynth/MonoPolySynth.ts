import GenericPolySynth from "./genericPolySynth";
import MonoSynth from "../synth/MonoSynth";
import { IMonoSynthParams } from "types";

export default class MonoPolySynth extends GenericPolySynth {

    protected getIndividualSynth(params: IMonoSynthParams) {
        return new MonoSynth(params);
    }

    protected setSpecificParams() {
        this.paramsThatTriggerRecreate = [];
        this.paramsThatCanUpdate = [];
    }

}
