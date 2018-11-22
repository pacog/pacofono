import { ISound, SynthTypes } from "types";
import GenericPolySynth from "./genericPolySynth";
import VolumeNode from "modules/soundNodes/volumeNode";
import FMPolySynth from "./FMPolySynth";
import AMPolySynth from "./AMPolySynth";
import DuoPolySynth from "./DuoPolySynth";
import MonoPolySynth from "./MonoPolySynth";
import SimplePolySynth from "./SimplePolySynth";

const createSynth = (config: ISound, output: VolumeNode): GenericPolySynth => {
    if (!config) {
        throw new Error("Error: trying to create synth without config");
    }
    switch (config.synthType) {
        case SynthTypes.AMSynth:
            return new AMPolySynth(output, config);
        case SynthTypes.DuoSynth:
            return new DuoPolySynth(output, config);
        case SynthTypes.MonoSynth:
            return new MonoPolySynth(output, config);
        case SynthTypes.FMSynth:
            return new FMPolySynth(output, config);
        case SynthTypes.Synth:
            return new SimplePolySynth(output, config);
        default:
            throw new Error("Error: trying to create synth with a non existing type");
    }
};

export default createSynth;
