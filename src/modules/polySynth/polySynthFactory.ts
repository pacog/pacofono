import { SynthTypes } from "types";
import GenericPolySynth from "./genericPolySynth";
import VolumeNode from "modules/soundNodes/volumeNode";
import FMPolySynth from "./FMPolySynth";

const createSynth = (type: SynthTypes, output: VolumeNode): GenericPolySynth => {
    switch (type) {
        case SynthTypes.AmSynth:
        case SynthTypes.FMSynth:
        case SynthTypes.Monosynth:
        case SynthTypes.Synth:
            return new FMPolySynth(output);
        default:
            throw new Error("Error: trying to create synth with a non existing type");
    }
};

export default createSynth;
