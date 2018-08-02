export const getNoteBetween = (freq1: number, freq2: number, distance: number): number => {
    const log2Freq1 = Math.log2(freq1);
    const log2Freq2 = Math.log2(freq2);
    const log2Result = log2Freq1 + ((log2Freq2 - log2Freq1) * distance);
    return Math.pow(2, log2Result);
};
