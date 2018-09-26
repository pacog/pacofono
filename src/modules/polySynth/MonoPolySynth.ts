import GenericPolySynth from "./genericPolySynth";
import { MonoSynth } from "tone";

export default class MonoPolySynth extends GenericPolySynth {

    protected getIndividualSynth() {
        return new MonoSynth();
    }

}
