export const percentageToDecibels = (percentage: number): number => {
    return 20 * Math.log10(percentage);
};

export const decibelsToPercentage = (decibels: number): number => {
    return Math.pow(10, decibels / 20);
};
