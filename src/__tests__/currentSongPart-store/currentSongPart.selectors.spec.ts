import { actionCreators } from "store/actions/currentSongPart";
import { actionCreators as songActions } from "store/actions/songs";
import { actionCreators as partActions } from "store/actions/parts";
import { actionCreators as chordActions } from "store/actions/chords";
import { actionCreators as currentSongActions } from "store/actions/currentSong";
import { rootReducer } from "store/reducers/root";
import { getCurrentSongPart, isCurrentSongPart, getCurrentChords } from "store/selectors/currentSongPart";

describe("currentSongPart store selectors", () => {
    it("should be able to get the current song part", () => {
        const song = {
            id: "111",
            name: "My way",
            parts: ["other_part"],
        };
        const part = {
            id: "part_629",
            name: "Chorus_13",
            chords: ([] as string[]),
        };
        const chord1 = {
            id: "chord_09",
            name: "second chord",
            notes: ["A", "C9"],
        };
        const chord2 = {
            id: "chord_55",
            name: "first chord",
            notes: ["F#3"],
        };
        const state = rootReducer({}, { type: null });
        expect(getCurrentSongPart(state)).toBe(null);
        expect(isCurrentSongPart(state, part)).toBe(false);
        expect(getCurrentChords(state)).toBe(null);
        const newState = rootReducer(state, songActions.addSong(song));
        const newState2 = rootReducer(newState, partActions.addPart(part, song.id));
        const newState3 = rootReducer(newState2, chordActions.addChord(chord2, part.id));
        const newState4 = rootReducer(newState3, chordActions.addChord(chord1, part.id));
        const newState5 = rootReducer(newState4, currentSongActions.setCurrentSong(song));
        const newState6 = rootReducer(newState5, actionCreators.setCurrentPart(part));
        expect(getCurrentSongPart(newState6)).toEqual({ ...part, chords: ["chord_55", "chord_09"]});
        expect(isCurrentSongPart(newState6, part)).toBe(true);
        expect(getCurrentChords(newState6)).toEqual([chord2, chord1]);
    });

    describe("getCurrentChords memoization", () => {
        it("should memoize getCurrentChords", () => {
            // TODO
        });
    });
});
