import { actionCreators } from "store/actions/currentSongPart";
import { actionCreators as currentSongActions } from "store/actions/currentSong";
import { currentSongPartReducer } from "store/reducers/currentSongPart";
import { rootReducer } from "store/reducers/root";

describe("currentSongPart store reducer", () => {
    it("should have an initial value", () => {
        const state = rootReducer({}, { type: null });
        expect(state.currentSongPart).toEqual({
            id: null,
        });
    });

    it("should process changing values", () => {
        const part = {
            id: "627",
            name: "Chorus 2",
            chords: ["chord_12"],
        };
        const state = rootReducer({}, { type: null });
        const stateAfter = currentSongPartReducer(state.currentSongPart, actionCreators.setCurrentPart(part));
        expect(stateAfter)
            .toEqual({
                id: "627",
            });
        const stateAfter2 = currentSongPartReducer(stateAfter, actionCreators.setCurrentPart(null));
        expect(stateAfter2)
            .toEqual({
                id: null,
            });
    });

    it("should change part when changing song if there is no current part", () => {
        const song = {
            id: "song_111",
            name: "My way",
            parts: ["part_629"],
        };
        const part = {
            id: "part_629",
            name: "Chorus_13",
            chords: ["chord_55"],
        };
        const state = rootReducer({
            songs: {
                [song.id]: song,
            },
            parts: {
                [part.id]: part,
            },
        }, { type: null });
        expect(state.currentSongPart)
            .toEqual({
                id: null,
            });
        const stateAfter = rootReducer(state, currentSongActions.setCurrentSong(song));
        expect(stateAfter.currentSongPart)
            .toEqual({
                id: "part_629",
            });
    });

    it("should change part when changing song if the current part is not in song", () => {
        const song = {
            id: "song_111",
            name: "My way",
            parts: ["part_629"],
        };
        const part = {
            id: "part_629",
            name: "Chorus_13",
            chords: ["chord_55"],
        };
        const state = rootReducer({
            songs: {
                [song.id]: song,
            },
            parts: {
                [part.id]: part,
            },
            currentSongPart: {
                id: "other_part",
            },
        }, { type: null });
        const stateAfter = rootReducer(state, currentSongActions.setCurrentSong(song));
        expect(stateAfter.currentSongPart)
            .toEqual({
                id: "part_629",
            });
    });

    it("should not change part when changing song if there current part is in song", () => {
        const song = {
            id: "song_111",
            name: "My way",
            parts: ["part_629", "part_6asdasd"],
        };
        const part = {
            id: "part_629",
            name: "Chorus_13",
            chords: ["chord_55"],
        };
        const part2 = {
            id: "part_6asdasd",
            name: "Chorus_134",
            chords: ["chord_55"],
        };
        const state = rootReducer({
            songs: {
                [song.id]: song,
            },
            parts: {
                [part.id]: part,
                [part2.id]: part2,
            },
            currentSongPart: {
                id: "part_6asdasd",
            },
        }, { type: null });
        const stateAfter = rootReducer(state, currentSongActions.setCurrentSong(song));
        expect(stateAfter.currentSongPart)
            .toEqual({
                id: "part_6asdasd",
            });
    });

    it("should be set to null if we set no current song", () => {
        const song = {
            id: "song_111",
            name: "My way",
            parts: ["part_629"],
        };
        const part = {
            id: "part_629",
            name: "Chorus_13",
            chords: ["chord_55"],
        };
        const part2 = {
            id: "part_6asdasd",
            name: "Chorus_134",
            chords: ["chord_55"],
        };
        const state = rootReducer({
            songs: {
                [song.id]: song,
            },
            parts: {
                [part.id]: part,
                [part2.id]: part2,
            },
            currentSongPart: {
                id: "part_6asdasd",
            },
        }, { type: null });
        const stateAfter = rootReducer(state, currentSongActions.setCurrentSong(null));
        expect(stateAfter.currentSongPart)
            .toEqual({
                id: null,
            });
    });
});
