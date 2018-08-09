export const percentageToDecibels = (percentage: number): number => {
    return 20 * Math.log10(percentage);
};
