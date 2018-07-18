import { INote } from "types";
import unfilteredNotes from "./unfilteredNotes";

interface IRawNote {
    freq: number;
    name: string;
}

const MIN_FREQ = 32;
const MAX_FREQ = 1400;

const allNotesMap: Map<string, INote> = new Map();

(unfilteredNotes as IRawNote[])
    .filter((note) => note.freq > MIN_FREQ && note.freq < MAX_FREQ)
    .forEach((note) => {
        allNotesMap.set(note.name, {
            name: note.name,
            frequency: note.freq,
            sharp: note.name.includes("#"),
        });
    });

export const allNotes = allNotesMap;
export const allNotesArray = Array.from(allNotesMap.values());
