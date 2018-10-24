import { SynthTypes, ISound } from "../types";
import { defaultMonoSynth } from "./defaultSynthParams";
const defaultSound: ISound = {
    id: "default-sound",
    name: "Default sound",
    synthType: SynthTypes.Synth,
    params: { ...defaultMonoSynth },
};

export default defaultSound;
