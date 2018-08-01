// Generates the music taking into account user input
import { pointerStartObservable, pointerMoveObservable, pointerEndObservable } from "modules/inputManager";
import { currentChordsChangeObservable } from "store/storeChanges";

// TODO translate current chord plus position to list of notes with intensity
// TODO create here the main output, that can be used to adjust volume, mute and show graphs
// TODO create a Polysynth each time we change the song, so it takes as many voices as needed
// TODO abstract that Polysynth to a "current instrument" that will conain synths, arpegiators and noise generators
// TODO when the soundConfig changes, we will notify the current instrument, and it will change accordingly (if needed)


export const init = () => {
    pointerStartObservable.subscribe((where) => {
        console.log("pointerStartObservable", where);
    });
    pointerMoveObservable.subscribe((where) => {
        console.log("pointerMoveObservable", where);
    });
    pointerEndObservable.subscribe((where) => {
        console.log("pointerEndObservable", where);
    });

    currentChordsChangeObservable.subscribe((newChords) => {
        console.log("newChords", newChords);
    });
};
