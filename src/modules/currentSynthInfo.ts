import { INoteWithWeight } from "types";
import Observable from "utils/observable";

export interface ICurrentSynths {
    numVoices: number;
    currentNotes: INoteWithWeight[];
}

export const currentSynths = new Observable<ICurrentSynths>({ notifyOnSubscribe: true });
