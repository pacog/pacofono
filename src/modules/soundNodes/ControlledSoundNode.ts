import {
    ISound,
    INoteWithWeight,
    RawSynthParams,
    IControllerFrame,
    isControllableParam,
    isNormalParam,
    IControllableParam,
    SynthParams,
} from "types";
import GenericSoundNode from "./GenericSoundNode";
import EmptySoundNode from "./EmptySoundNode";
import { getControllableParamValue } from "modules/getControllableParamValue";
import { getRawParamsFromConfig } from "modules/synthParamsProcessor";

export default class ControlledSoundNode extends GenericSoundNode {

    private node: GenericSoundNode;
    private config: ISound;
    private lastControllableParams: IControllableParam[];

    constructor(node: GenericSoundNode, config: ISound) {
        super();
        this.node = node;
        this.config = config;

        if (!this.node) {
            this.node = new EmptySoundNode();
        }
    }

    public setVolume(volume: number): void {
        this.node.setVolume(volume);
    }

    public startPlayingNotes(notes: INoteWithWeight[], velocity: number): void {
        this.node.startPlayingNotes(notes, velocity);
    }

    public updateFrequenciesBeingPlayed(notes: INoteWithWeight[]): void {
        this.node.updateFrequenciesBeingPlayed(notes);
    }

    public stopPlaying(): void {
        this.node.stopPlaying();
    }

    public setNumberOfVoices(numberOfVoices: number): void {
        this.node.setNumberOfVoices(numberOfVoices);
    }

    public shouldBeRecreatedToUseConfig(config: ISound): boolean {
        return this.node.shouldBeRecreatedToUseConfig(config);
    }

    public updateConfig(config: ISound): void {
        this.config = config;
        this.lastControllableParams = null;
        this.updateWithParams(getRawParamsFromConfig(config));
    }

    public updateWithParams(newParams: RawSynthParams): void {
        this.node.updateWithParams(newParams);
    }

    public notifyControllerFrame(frame: IControllerFrame): void {
        if (!this.lastControllableParams) {
            this.lastControllableParams = this.getControllableParams();
        }

        const paramsToSet: RawSynthParams = this.lastControllableParams
            .reduce((accumulator, currentParam): RawSynthParams => {
                return {
                    [currentParam.name]: getControllableParamValue(currentParam, frame),
                    ...accumulator,
                };
            }, {});

        this.updateWithParams(paramsToSet);
    }

    public destroy(): void {
        this.node.destroy();
    }

    private getControllableParams(): IControllableParam[] {
        return getControllableParams(this.config.params);
    }
}

function getControllableParams(params: SynthParams): IControllableParam[] {
    return Object.keys(params)
        .map((paramName) => (params as any)[paramName])
        .reduce((accumulator, eachParam) => {
            if (isControllableParam(eachParam)) {
                return accumulator.concat([eachParam]);
            }
            if (isNormalParam(eachParam)) {
                return accumulator;
            }
            return accumulator.concat(getControllableParams(eachParam));
        }, []);
}
