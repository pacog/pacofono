import { Store, AnyAction } from "redux";
import { IChord } from "types";
import { IRootState } from "./reducers/root";
import { getCurrentChords } from "store/selectors/currentSongPart";
import Observable from "utils/observable";

export const currentChordsChangeObservable = new Observable<IChord[]>({ notifyOnSubscribe: true });

export const init = (store: Store<IRootState, AnyAction>): void => {
    notifyCurrentChordsChangeIfNeeded(store.getState());
    store.subscribe(() => {
        const newState = store.getState();
        notifyCurrentChordsChangeIfNeeded(newState);
    });
};

let currentChords: IChord[];
function notifyCurrentChordsChangeIfNeeded(state: IRootState): void {
    const newChords = getCurrentChords(state);
    if (newChords !== currentChords) {
        currentChords = newChords;
        currentChordsChangeObservable.notify(newChords);
    }
}
