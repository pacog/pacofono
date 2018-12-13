export const clamp = (value: number, min: number = 0, max: number = 1): number => {
    return Math.max(Math.min(value, max), min);
};
export type Range = [number, number];
interface IProjectValueToRangeParams {
    value: number;
    originRange: Range;
    destinationRange: Range;
}

export const projectValueToRange = ({ value, originRange, destinationRange }: IProjectValueToRangeParams): number => {
    const ratioInOrigin = (value - originRange[0]) / (originRange[1] - originRange[0]);
    return destinationRange[0] + ratioInOrigin * (destinationRange[1] - destinationRange[0]);
};

interface ISnapToClosestStepParams {
    value: number;
    stepSize: number;
    rangeBegin: number;
}

export const snapToClosestStep = ({ value, stepSize, rangeBegin }: ISnapToClosestStepParams): number => {
    const prevStep = (Math.floor((value - rangeBegin) / stepSize) * stepSize) + rangeBegin;
    const nextStep = prevStep + stepSize;
    if ((value - prevStep) > (nextStep - value)) {
        return nextStep;
    }
    return prevStep;
};
