import { INoteWithWeight, ISound, RawSynthParams } from "types";
import GenericSoundNode from "./GenericSoundNode";

export default class EmptySoundNode extends GenericSoundNode {
    public setVolume(volume: number): void {
        // no op
    }

    public startPlayingNotes(notes: INoteWithWeight[], velocity: number): void {
        // no op
    }

    public updateFrequenciesBeingPlayed(notes: INoteWithWeight[]): void {
        // no op
    }

    public stopPlaying(): void {
        // no op
    }

    public setNumberOfVoices(numberOfVoices: number): void {
        // no op
    }

    public shouldBeRecreatedToUseConfig(config: ISound): boolean {
        if (config) {
            return true;
        }
        return false;
    }

    public updateWithParams(newParams: RawSynthParams): void {
        // no op
    }

    public destroy(): void {
        // no op
    }
}
