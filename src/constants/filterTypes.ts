import { FilterTypes } from "types";

const types = new Map<FilterTypes, string>();

types.set(FilterTypes.Allpass, "Allpass");
types.set(FilterTypes.Bandpass, "Bandpass");
types.set(FilterTypes.Highpass, "Highpass");
types.set(FilterTypes.Highshelf, "Highshelf");
types.set(FilterTypes.Lowpass, "Lowpass");
types.set(FilterTypes.Lowshelf, "Lowshelf");
types.set(FilterTypes.Notch, "Notch");
types.set(FilterTypes.Peaking, "Peaking");

export default types;
