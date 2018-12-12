import {
    ISound,
    INoteWithWeight,
    RawSynthParams,
    IControllerFrame,
    isControllableParam,
    IControllableParam,
} from "types";
import GenericSoundNode from "./GenericSoundNode";
import EmptySoundNode from "./EmptySoundNode";
import getControllableParamValue from "modules/getControllableParamValue";

export default class ControlledSoundNode extends GenericSoundNode {

    private node: GenericSoundNode;
    private config: ISound;

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

    public updateWithParams(newParams: RawSynthParams): void {
        this.node.updateWithParams(newParams);
    }

    public notifyControllerFrame(frame: IControllerFrame): void {
        const controllableParams: IControllableParam[] = Object.keys(this.config.params)
            .map((paramName) => (this.config.params as any)[paramName])
            .filter((paramWithName) => isControllableParam(paramWithName));

        const paramsToSet: RawSynthParams = controllableParams.reduce((accumulator, currentParam): RawSynthParams => {
            return {
                [currentParam.name]: getControllableParamValue(currentParam, frame),
                ...accumulator,
            };
        }, {});
        console.log("gettingFrame", paramsToSet);
    }

    public destroy(): void {
        this.node.destroy();
    }

}
