import { ADD_SONG,
    DELETE_SONG,
    CHANGE_SONG_NAME,
    CHANGE_PART_INDEX,
    actionCreators,
} from "store/actions/songs";

const TEST_SONG = {
    id: "blach",
    name: "bloch",
    parts: ["partId"],
};

describe("Song store actions", () => {

    it("should have an add song action", () => {
        expect(actionCreators.addSong(TEST_SONG)).toEqual({
            type: ADD_SONG,
            song: TEST_SONG,
        });
    });

    it("should have a delete song action", () => {
        expect(actionCreators.deleteSong(TEST_SONG)).toEqual({
            type: DELETE_SONG,
            song: TEST_SONG,
        });
    });

    it("should have a change song name action", () => {
        const newName = "new name";
        expect(actionCreators.changeSongName(TEST_SONG, newName)).toEqual({
            type: CHANGE_SONG_NAME,
            song: TEST_SONG,
            newName,
        });
    });

    it("should have a change part index action", () => {
        const songId = "song_2";
        const partId = "part_34";
        const desiredIndex = 3;
        expect(actionCreators.changePartIndex(songId, partId, desiredIndex)).toEqual({
            type: CHANGE_PART_INDEX,
            songId,
            partId,
            desiredIndex,
        });
    });

});
