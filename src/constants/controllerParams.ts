import { ControllerParams } from "types";

const params = new Map<ControllerParams, string>();

params.set(ControllerParams.none, "None");
params.set(ControllerParams.xRatio, "X");
params.set(ControllerParams.yRatio, "Y");
params.set(ControllerParams.zRatio, "Z");

export default params;
