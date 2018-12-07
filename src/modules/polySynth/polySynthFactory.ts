import VolumeNode from "modules/soundNodes/volumeNode";
import { SynthTypes, RawSynthParams } from "types";
import AMPolySynth from "./AMPolySynth";
import DuoPolySynth from "./DuoPolySynth";
import FMPolySynth from "./FMPolySynth";
import GenericPolySynth from "./genericPolySynth";
import MonoPolySynth from "./MonoPolySynth";
import SimplePolySynth from "./SimplePolySynth";

const createSynth = (synthType: SynthTypes, params: RawSynthParams, output: VolumeNode): GenericPolySynth => {
    switch (synthType) {
        case SynthTypes.AMSynth:
            return new AMPolySynth(output, synthType, params);
        case SynthTypes.DuoSynth:
            return new DuoPolySynth(output, synthType, params);
        case SynthTypes.MonoSynth:
            return new MonoPolySynth(output, synthType, params);
        case SynthTypes.FMSynth:
            return new FMPolySynth(output, synthType, params);
        case SynthTypes.Synth:
            return new SimplePolySynth(output, synthType, params);
        default:
            throw new Error("Error: trying to create synth with a non existing type");
    }
};

export default createSynth;
