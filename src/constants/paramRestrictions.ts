import { IParamRestriction } from "types";

const PARAM_RESTRICTIONS = new Map<string, IParamRestriction>();
const DEFAULT_PARAM_RESTRICTION: IParamRestriction = {
    min: 0,
    max: 1,
};

PARAM_RESTRICTIONS.set("harmonicity", { min: 0.1, max: 24, step: 0.1 });
PARAM_RESTRICTIONS.set("envelopeAttack", { min: 0, max: 2 });
PARAM_RESTRICTIONS.set("envelopeDecay", { min: 0, max: 2 });
PARAM_RESTRICTIONS.set("envelopeSustain", { min: 0, max: 1 });
PARAM_RESTRICTIONS.set("envelopeRelease", { min: 0.1, max: 2 });
PARAM_RESTRICTIONS.set("vibratoAmount", { min: 0, max: 10 });
PARAM_RESTRICTIONS.set("vibratoRate", { min: 0, max: 100 });
PARAM_RESTRICTIONS.set("volume", { min: -100, max: 0 });
PARAM_RESTRICTIONS.set("voice0.volume", { min: -100, max: 0 });
PARAM_RESTRICTIONS.set("voice1.volume", { min: -100, max: 0 });

const getParamRestrictions = (paramName: string): IParamRestriction => {
    return PARAM_RESTRICTIONS.get(paramName) || DEFAULT_PARAM_RESTRICTION;
};

export default getParamRestrictions;
