import GenericPolySynth from "./genericPolySynth";
import { AMSynth } from "tone";

export default class AMPolySynth extends GenericPolySynth {

    protected getIndividualSynth() {
        return new AMSynth();
    }

}
