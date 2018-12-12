import { INoteWithWeight, ISound, RawSynthParams } from "types";

export default abstract class GenericSoundNode {

    public abstract setVolume(volume: number): void;
    public abstract startPlayingNotes(notes: INoteWithWeight[], velocity: number): void;
    public abstract updateFrequenciesBeingPlayed(notes: INoteWithWeight[]): void;
    public abstract stopPlaying(): void;
    public abstract setNumberOfVoices(numberOfVoices: number): void;
    public abstract shouldBeRecreatedToUseConfig(config: ISound): boolean;
    public abstract updateConfig(config: ISound): void;
    public abstract updateWithParams(newParams: RawSynthParams): void;
    public abstract destroy(): void;
}
