import { SynthTypes } from "types";

const types = new Map<SynthTypes, string>();

types.set(SynthTypes.AmSynth, "Am synth");
types.set(SynthTypes.FMSynth, "FM synth");
types.set(SynthTypes.Monosynth, "Monosynth");
types.set(SynthTypes.Synth, "Simple synth");

export default types;
