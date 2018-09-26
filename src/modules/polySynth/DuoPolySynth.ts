import GenericPolySynth from "./genericPolySynth";
import { DuoSynth } from "tone";

export default class DuoPolySynth extends GenericPolySynth {

    protected getIndividualSynth() {
        return new DuoSynth();
    }

}
