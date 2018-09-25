import { Store, AnyAction } from "redux";
import { IChord, SynthTypes } from "types";
import { IRootState } from "./reducers/root";
import { getCurrentChords } from "store/selectors/currentSongPart";
import { getVolume, isMuted } from "store/selectors/mainVolume";
import { getCurrentSound } from "store/selectors/currentSound";
import Observable from "utils/observable";

export const currentChordsChangeObservable = new Observable<IChord[]>({ notifyOnSubscribe: true });
export const mainVolumeChangeObservable = new Observable<number>({ notifyOnSubscribe: true });
export const muteVolumeChangeObservable = new Observable<boolean>({ notifyOnSubscribe: true });
export const synthTypeChangeObservable = new Observable<SynthTypes>({ notifyOnSubscribe: true });

export const init = (store: Store<IRootState, AnyAction>): void => {

    notifyAllIfNeeded(store.getState());

    store.subscribe(() => {
        notifyAllIfNeeded(store.getState());
    });
};

function notifyAllIfNeeded(state: IRootState) {
    notifyCurrentChordsChangeIfNeeded(state);
    notifyVolumeChangeIfNeeded(state);
    notifyMuteChangeIfNeeded(state);
    notifySynthChangeIfNeeded(state);
}

let currentChords: IChord[];
function notifyCurrentChordsChangeIfNeeded(state: IRootState): void {
    const newChords = getCurrentChords(state);
    if (newChords !== currentChords) {
        currentChords = newChords;
        currentChordsChangeObservable.notify(newChords);
    }
}

let currentVolume: number;
function notifyVolumeChangeIfNeeded(state: IRootState): void {
    const newVolume = getVolume(state);
    if (newVolume !== currentVolume) {
        currentVolume = newVolume;
        mainVolumeChangeObservable.notify(newVolume);
    }
}

let currentIsMuted: boolean;
function notifyMuteChangeIfNeeded(state: IRootState): void {
    const newMuted = isMuted(state);
    if (newMuted !== currentIsMuted) {
        currentIsMuted = newMuted;
        muteVolumeChangeObservable.notify(newMuted);
    }
}

let currentSynthType: SynthTypes;
function notifySynthChangeIfNeeded(state: IRootState): void {
    const currentSound = getCurrentSound(state);
    if (!currentSound) {
        return;
    }
    if (currentSound.synthType !== currentSynthType) {
        currentSynthType = currentSound.synthType;
        synthTypeChangeObservable.notify(currentSynthType);
    }
}
