import { WaveTypes } from "types";

const types = new Map<WaveTypes, string>();

types.set(WaveTypes.Sine, "Sine");
types.set(WaveTypes.Triangle, "Triangle");
types.set(WaveTypes.Square, "Square");
types.set(WaveTypes.Sawtooth, "Sawtooth");

export default types;
