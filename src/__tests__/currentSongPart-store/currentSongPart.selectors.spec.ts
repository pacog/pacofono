import { actionCreators } from "store/actions/currentSongPart";
import { actionCreators as songActions } from "store/actions/songs";
import { actionCreators as partActions } from "store/actions/parts";
import { actionCreators as currentSongActions } from "store/actions/currentSong";
import { rootReducer } from "store/reducers/root";
import { getCurrentSongPart, isCurrentSongPart } from "store/selectors/currentSongPart";

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
            chords: ["chord_55"],
        };
        const state = rootReducer({}, { type: null });
        expect(getCurrentSongPart(state)).toBe(null);
        expect(isCurrentSongPart(state, part)).toBe(false);
        const newState = rootReducer(state, songActions.addSong(song));
        const newState2 = rootReducer(newState, partActions.addPart(part, song.id));
        const newState3 = rootReducer(newState2, currentSongActions.setCurrentSong(song));
        const newState4 = rootReducer(newState3, actionCreators.setCurrentPart(part));
        expect(getCurrentSongPart(newState4)).toEqual(part);
        expect(isCurrentSongPart(newState4, part)).toBe(true);
    });
});
