import { SynthTypes } from "types";
import GenericPolySynth from "./genericPolySynth";
import VolumeNode from "modules/soundNodes/volumeNode";
import FMPolySynth from "./FMPolySynth";
import AMPolySynth from "./AMPolySynth";
import DuoPolySynth from "./DuoPolySynth";
import MonoPolySynth from "./MonoPolySynth";
import SimplePolySynth from "./SimplePolySynth";

const createSynth = (type: SynthTypes, output: VolumeNode): GenericPolySynth => {
    switch (type) {
        case SynthTypes.AMSynth:
            return new AMPolySynth(output);
        case SynthTypes.DuoSynth:
            return new DuoPolySynth(output);
        case SynthTypes.MonoSynth:
            return new MonoPolySynth(output);
        case SynthTypes.FMSynth:
            return new FMPolySynth(output);
        case SynthTypes.Synth:
            return new SimplePolySynth(output);
        default:
            throw new Error("Error: trying to create synth with a non existing type");
    }
};

export default createSynth;
