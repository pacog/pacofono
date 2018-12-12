import { IControllableParam, IControllerFrame, ControllerParams } from "types";

const getControllableParamValue = (param: IControllableParam, frame: IControllerFrame): number => {
    if (!frame) {
        return param.defaultValue;
    }
    if (param.controllerParam === ControllerParams.none) {
        return param.defaultValue;
    }

    return 1;
};

export default getControllableParamValue;
