import { IParamRestriction } from "types";

const PARAM_RESTRICTIONS = new Map<string, IParamRestriction>();
const DEFAULT_PARAM_RESTRICTION: IParamRestriction = {
    min: 0,
    max: 1,
};

PARAM_RESTRICTIONS.set("harmonicity", { min: 0.1, max: 24, step: 0.1 });

const getParamRestrictions = (paramName: string): IParamRestriction => {
    return PARAM_RESTRICTIONS.get(paramName) || DEFAULT_PARAM_RESTRICTION;
};

export default getParamRestrictions;
