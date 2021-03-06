import { actionCreators } from "store/actions/parts";
import { rootReducer } from "store/reducers/root";
import { partsReducer } from "store/reducers/parts";

const exampleSong = {
    name: "Song 12",
    id: "song_12",
    parts: ["other_part"],
};



describe("Parts store reducer", () => {

    it("should have an initial value", () => {
        const state = rootReducer({}, { type: null });
        expect(state.parts).toEqual({});
    });

    it("should be able to add a part", () => {
        const songId = "song_12";
        const partToAdd = {
            id: "newPartId",
            name: "myNewPart",
            chords: ["chord_27"],
        };
        const initialState = rootReducer({
            songs: {
                song_12: {...exampleSong},
            },
        }, { type: null });
        const stateAfter = rootReducer(
            initialState,
            actionCreators.addPart(partToAdd, songId),
        );
        const id = partToAdd.id;
        expect(stateAfter.parts[id]).toEqual(partToAdd);
        expect(stateAfter.songs.song_12.parts).toEqual(["other_part", "newPartId"]);
    });

    it("should be able to change the name of a part", () => {
        const songId = "song_12";
        const partToAdd = {
            id: "newId",
            name: "Chorus",
            chords: ["chord_123"],
        };
        const initialState = rootReducer({}, { type: null });
        const stateAfter = partsReducer(
            initialState.parts,
            actionCreators.addPart(partToAdd, songId),
        );
        const stateAfterRename = partsReducer(
            stateAfter,
            actionCreators.changePartName(partToAdd, "ChorusNew"),
        );
        const id = partToAdd.id;
        expect(stateAfterRename[id].name).toEqual("ChorusNew");
    });

    it("should be able to delete a part", () => {
        const songId = "song_12";
        const partToAdd = {
            id: "newPartId",
            name: "myNewPart",
            chords: ["chord_27"],
        };
        const initialState = rootReducer({
            songs: {
                song_12: {...exampleSong},
            },
        }, { type: null });
        const stateAfter = rootReducer(
            initialState,
            actionCreators.addPart(partToAdd, songId),
        );
        const stateAfter2 = rootReducer(
            stateAfter,
            actionCreators.deletePart(partToAdd, songId),
        );
        const id = partToAdd.id;
        expect(stateAfter2.parts[id]).toEqual(undefined);
        expect(stateAfter2.songs.song_12.parts).toEqual(["other_part"]);
    });

    it("should be able to change the index of a chord", () => {
        const song = {
            id: "song34",
            name: "mySong",
            parts: ["part12"],
        };
        const part = {
            id: "part12",
            name: "myNewPart",
            chords: ["chord_1", "chord_2", "chord_3"],
        };

        const initialState = rootReducer({}, { type: null });
        const stateAfter = partsReducer(
            initialState.parts,
            actionCreators.addPart(part, song.id),
        );

        const stateAfter2 = partsReducer(
            stateAfter,
            actionCreators.changeChordIndex("part12", "chord_2", 0),
        );
        expect(stateAfter2[part.id].chords).toEqual(["chord_2", "chord_1", "chord_3"]);

        const stateAfter3 = partsReducer(
            stateAfter2,
            actionCreators.changeChordIndex("part12", "chord_2", 2),
        );
        expect(stateAfter3[part.id].chords).toEqual(["chord_1", "chord_3", "chord_2"]);

        const stateAfter4 = partsReducer(
            stateAfter3,
            actionCreators.changeChordIndex("part12", "chord_2", 2),
        );
        expect(stateAfter4[part.id].chords).toEqual(["chord_1", "chord_3", "chord_2"]);

        const stateAfter5 = partsReducer(
            stateAfter4,
            actionCreators.changeChordIndex("part12", "chord_2", 1),
        );
        expect(stateAfter5[part.id].chords).toEqual(["chord_1", "chord_2", "chord_3"]);
    });
});
