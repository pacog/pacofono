import { INoteWithWeight } from "types";

export const normalizeNoteWeights = (unnormalizedNotes: INoteWithWeight[]): INoteWithWeight[] => {
    const totalWeight = unnormalizedNotes.reduce((accumulator, currentValue): number => {
        return accumulator + currentValue.weight;
    }, 0);
    if (totalWeight > 1) {
        const weightMultiplier = 1 / totalWeight;
        return unnormalizedNotes.map((note) => {
            return {
                ...note,
                weight: note.weight * weightMultiplier,
            };
        });
    }
    return unnormalizedNotes;
};
