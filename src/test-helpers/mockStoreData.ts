const CHORD_1 = {
    id: "chord_1",
    name: "chord 1",
    notes: ["B", "C"],
};

const CHORD_2 = {
    id: "chord_2",
    name: "chord 2",
    notes: ["D", "F#"],
};

const PART_1 = {
    id: "part_1",
    name: "bloch",
    chords: [CHORD_1.id],
};

const PART_2 = {
    id: "part_2",
    name: "blach",
    chords: [CHORD_2.id],
};

const SONG_1 = {
    id: "song_1",
    name: "derp",
    parts: [PART_1.id, PART_2.id],
};

export const data = {
    SONG_1,
    PART_1,
    PART_2,
    CHORD_1,
    CHORD_2,
};

export const getMockStore = () => {
    return {
        songs: {
            [SONG_1.id]: SONG_1,
        },
        parts: {
            [PART_1.id]: PART_1,
            [PART_2.id]: PART_2,
        },
        chords: {
            [CHORD_1.id]: CHORD_1,
            [CHORD_2.id]: CHORD_2,
        },
    };
};
