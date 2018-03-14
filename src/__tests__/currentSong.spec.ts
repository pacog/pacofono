import { SET_CURRENT_SONG, actionCreators } from "store/actions/currentSong";
import { actionCreators as songsActions } from "store/actions/songs";
import { currentSongReducer } from "store/reducers/currentSong";
import { rootReducer } from "store/reducers/root";
import { getCurrentSong, isCurrentSong } from "store/selectors/currentSong";

describe("currentSong store", () => {

    describe("actions", () => {
        it("should have a set current song action", () => {
            const song = {
                id: "42",
                name: "Tu fiesta",
            };
            expect(actionCreators.setCurrentSong(song))
                .toEqual({
                    type: SET_CURRENT_SONG,
                    song,
                });
        });
    });

    describe("reducer", () => {
        it("should have an initial value", () => {
            const state = rootReducer({}, { type: null });
            expect(state.currentSong).toEqual({
                id: null,
            });
        });

        it("should process changing values", () => {
            const song = {
                id: "67",
                name: "Música rancia",
            };
            const state = rootReducer({}, { type: null });
            const stateAfter = currentSongReducer(state.currentSong, actionCreators.setCurrentSong(song));
            expect(stateAfter)
                .toEqual({
                    id: "67",
                });
            const stateAfter2 = currentSongReducer(stateAfter, actionCreators.setCurrentSong(null));
            expect(stateAfter2)
                .toEqual({
                    id: null,
                });
        });
    });

    describe("selectors", () => {
        it("should be able to get the current song", () => {
            const song = {
                id: "69",
                name: "Medusas",
            };
            const state = rootReducer({}, { type: null });
            expect(getCurrentSong(state)).toBe(null);
            expect(isCurrentSong(state, song)).toBe(false);
            const newState = rootReducer(state, songsActions.addSong(song));
            const newState2 = rootReducer(newState, actionCreators.setCurrentSong(song));
            expect(getCurrentSong(newState2)).toEqual(song);
            expect(isCurrentSong(newState2, song)).toBe(true);
        });
    });
});
