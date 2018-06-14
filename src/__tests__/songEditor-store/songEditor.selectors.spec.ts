import { actionCreators } from "store/actions/songEditor";
import { actionCreators as songsActionCreators } from "store/actions/songs";
import { actionCreators as partsActionCreators } from "store/actions/parts";
import { rootReducer } from "store/reducers/root";
import { getSong,
    getOriginalSong,
    isNewSong,
    isEditingSong,
    isShowingConfirmRestoreDefaults,
    isShowingConfirmDeleteSong,
    getPartBeingEdited,
    isPartBeingEdited,
    canPartBeDeleted,
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

    describe("edited part selectors", () => {
        it("should resturn correctly when editing", () => {
            const songToStartEditing = {
                id: "id_edit_2",
                name: "myNewSong",
                parts: ["partId", "partId2"],
            };
            const part1 = {
                id: "partId",
                name: "Chorus",
                chords: ["chord_1"],
            };
            const part2 = {
                id: "partId2",
                name: "Chorus 2",
                chords: ["chord_2"],
            };
            const state = rootReducer({}, { type: null });
            const newState = rootReducer(state, actionCreators.startEditingNewSong(songToStartEditing));
            const newState2 = rootReducer(newState, songsActionCreators.addSong(songToStartEditing));
            const newState3 = rootReducer(newState2, partsActionCreators.addPart(part1, songToStartEditing.id));
            const newState4 = rootReducer(newState3, partsActionCreators.addPart(part2, songToStartEditing.id));

            expect(getPartBeingEdited(newState4)).toEqual(part1);
            expect(isPartBeingEdited(newState4, part1)).toBe(true);
            expect(isPartBeingEdited(newState4, part2)).toBe(false);

            const newState5 = rootReducer(newState4, actionCreators.selectSongPartToEdit(part2.id));
            expect(getPartBeingEdited(newState5)).toEqual(part2);
            expect(isPartBeingEdited(newState5, part1)).toBe(false);
            expect(isPartBeingEdited(newState5, part2)).toBe(true);

            const errorSelector = () => {
                return isPartBeingEdited(newState5, null);
            };

            expect(errorSelector).toThrow();
        });
    });

    it("should handle canPartBeDeleted correctly", () => {
        const song1 = {
            id: "id_edit_2",
            name: "myNewSong",
            parts: ["partId", "partId2"],
        };
        const song2 = {
            id: "id_edit_3",
            name: "myNewSong",
            parts: ["onlyOnePartId"],
        };
        const partCanBeDeleted = {
            id: "partId",
            name: "name",
            chords: ["chord1"],
        };
        const partCannotBeDeleted = {
            id: "onlyOnePartId",
            name: "name",
            chords: ["chord2"],
        };
        const state = rootReducer({}, { type: null });
        const newState = rootReducer(state, songsActionCreators.addSong(song1));
        const newState2 = rootReducer(newState, songsActionCreators.addSong(song2));

        const newState3 = rootReducer(newState2, actionCreators.startEditingNewSong(song1));
        expect(canPartBeDeleted(newState3, partCanBeDeleted)).toBe(true);
        expect(canPartBeDeleted(newState3, partCannotBeDeleted)).toBe(false);

        const newState4 = rootReducer(newState3, actionCreators.startEditingNewSong(song2));
        expect(canPartBeDeleted(newState4, partCannotBeDeleted)).toBe(false);
        expect(canPartBeDeleted(newState4, partCanBeDeleted)).toBe(false);
    });

});
