export const percentageToDecibels = (percentage: number): number => {
    return 10 * Math.log10(percentage);
};
