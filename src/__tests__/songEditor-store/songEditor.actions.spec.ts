import {
    START_EDITING_NEW_SONG,
    STOP_EDITING,
    START_EDITING_EXISTING_SONG,
    SHOW_CONFIRM_RESTORE_DEFAULTS,
    SHOW_CONFIRM_DELETE_SONG,
    SELECT_SONG_PART_TO_EDIT,
    SHOW_CONFIRM_DELETE_PART,
    actionCreators,
} from "store/actions/songEditor";

describe("songEditor store actions", () => {

    it("should have a start editing new song action", () => {
        const songToEdit = {
            id: "111",
            name: "myNewSong",
            parts: ["partId"],
        };
        expect(actionCreators.startEditingNewSong(songToEdit))
            .toEqual({
                type: START_EDITING_NEW_SONG,
                song: songToEdit,
            });
    });

    it("should have a stop editing action", () => {
        expect(actionCreators.stopEditing())
            .toEqual({
                type: STOP_EDITING,
            });
    });

    it("should have a start editing existing song action", () => {
        const originalSong = {
            id: "111",
            name: "myNewSong",
            parts: ["partId"],
        };
        const songToEdit = {
            id: "112",
            name: "myNewCopiedSong",
            parts: ["partId"],
        };
        expect(actionCreators.startEditingExistingSong(songToEdit, originalSong))
            .toEqual({
                type: START_EDITING_EXISTING_SONG,
                originalSong,
                song: songToEdit,
            });
    });

    it("should have a show confirm restore defaults action", () => {
        expect(actionCreators.showConfirmRestoreDefaults(true))
            .toEqual({
                type: SHOW_CONFIRM_RESTORE_DEFAULTS,
                shouldShow: true,
            });
        expect(actionCreators.showConfirmRestoreDefaults(false))
            .toEqual({
                type: SHOW_CONFIRM_RESTORE_DEFAULTS,
                shouldShow: false,
            });
    });

    it("should have a show confirm delete song action", () => {
        expect(actionCreators.showConfirmDeleteSong(true))
            .toEqual({
                type: SHOW_CONFIRM_DELETE_SONG,
                shouldShow: true,
            });
        expect(actionCreators.showConfirmDeleteSong(false))
            .toEqual({
                type: SHOW_CONFIRM_DELETE_SONG,
                shouldShow: false,
            });
    });

    it("should have a select song part to edit action", () => {
        expect(actionCreators.selectSongPartToEdit("part_id_12"))
            .toEqual({
                type: SELECT_SONG_PART_TO_EDIT,
                partId: "part_id_12",
            });
        expect(actionCreators.selectSongPartToEdit(null))
            .toEqual({
                type: SELECT_SONG_PART_TO_EDIT,
                partId: null,
            });
    });

    it("should have a show confirm delete part action", () => {
        expect(actionCreators.showConfirmDeletePart(true))
            .toEqual({
                type: SHOW_CONFIRM_DELETE_PART,
                shouldShow: true,
            });
        expect(actionCreators.showConfirmDeletePart(false))
            .toEqual({
                type: SHOW_CONFIRM_DELETE_PART,
                shouldShow: false,
            });
    });
});
