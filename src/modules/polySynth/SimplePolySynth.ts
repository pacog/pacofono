import GenericPolySynth from "./genericPolySynth";
import { Synth } from "tone";

export default class SimplePolySynth extends GenericPolySynth {

    protected getIndividualSynth() {
        return new Synth();
    }

}
