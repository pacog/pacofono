import GenericPolySynth from "./genericPolySynth";
import { FMSynth } from "tone";

export default class FMPolySynth extends GenericPolySynth {

    protected getIndividualSynth() {
        return new FMSynth();
    }

}
