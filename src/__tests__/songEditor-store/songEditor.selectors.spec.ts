import { actionCreators } from "store/actions/songEditor";
import { actionCreators as songsActionCreators } from "store/actions/songs";
import { rootReducer } from "store/reducers/root";
import { getSong,
    getOriginalSong,
    isNewSong,
    isEditingSong,
    isShowingConfirmRestoreDefaults,
    isShowingConfirmDeleteSong,
} from "store/selectors/songEditor";

describe("songEditor store selectors", () => {
    it("should work after starting to edit a song", () => {
        const songToStartEditing = {
            id: "id_edit_2",
            name: "myNewSong",
            parts: ["partId"],
        };
        const state = rootReducer({}, { type: null });
        const newState = rootReducer(state, actionCreators.startEditingNewSong(songToStartEditing));
        const newState2 = rootReducer(newState, songsActionCreators.addSong(songToStartEditing));
        expect(isNewSong(newState2)).toBe(true);
        expect(isEditingSong(newState2)).toBe(false);
        expect(getSong(newState2)).toEqual(songToStartEditing);
        expect(getOriginalSong(newState2)).toEqual(null);
    });

    it("should have correct confirm restore song selectors", () => {
        const state = rootReducer({}, { type: null });
        expect(isShowingConfirmRestoreDefaults(state)).toBe(false);
        const newState = rootReducer(
            state,
            actionCreators.showConfirmRestoreDefaults(true),
        );
        expect(isShowingConfirmRestoreDefaults(newState)).toBe(true);
        const newState2 = rootReducer(
            newState,
            actionCreators.showConfirmRestoreDefaults(false),
        );
        expect(isShowingConfirmRestoreDefaults(newState2)).toBe(false);
    });

    it("should have correct confirm delete song selectors", () => {
        const state = rootReducer({}, { type: null });
        expect(isShowingConfirmDeleteSong(state)).toBe(false);
        const newState = rootReducer(
            state,
            actionCreators.showConfirmDeleteSong(true),
        );
        expect(isShowingConfirmDeleteSong(newState)).toBe(true);
        const newState2 = rootReducer(
            newState,
            actionCreators.showConfirmDeleteSong(false),
        );
        expect(isShowingConfirmDeleteSong(newState2)).toBe(false);
    });

});
