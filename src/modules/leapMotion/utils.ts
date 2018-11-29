import { Vector3D, IPoint3D } from "types";

export const vectorToPointObject = (vector: Vector3D): IPoint3D => {
    return {
        x: vector[0],
        y: vector[1],
        z: vector[2],
    };
};

export const getRatioWithinValues = (value: number, min: number, max: number) => {
    const result = (value - min) / (max - min);
    return Math.max(Math.min(result, 1), 0);
};
