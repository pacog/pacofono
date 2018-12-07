import { IControllableParam, IControllerFrame } from "types";

const getControllableParamValue = (param: IControllableParam, frame: IControllerFrame): number => {
    if (!frame) {
        return param.defaultValue;
    }
    return param.defaultValue;
};

export default getControllableParamValue;
