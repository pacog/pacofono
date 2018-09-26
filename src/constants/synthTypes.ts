import { SynthTypes } from "types";

const types = new Map<SynthTypes, string>();

types.set(SynthTypes.AMSynth, "AM synth");
types.set(SynthTypes.FMSynth, "FM synth");
types.set(SynthTypes.MonoSynth, "Mono synth");
types.set(SynthTypes.Synth, "Simple synth");
types.set(SynthTypes.DuoSynth, "Duo synth");

export default types;
