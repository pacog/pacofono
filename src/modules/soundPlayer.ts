import { ISound } from "types";
import { INoteWithWeight, IControllerFrame } from "types";
import createSynth from "modules/polySynth/polySynthFactory";
import VolumeNode from "modules/soundNodes/volumeNode";
import ControlledSoundNode from "modules/soundNodes/ControlledSoundNode";
import { getRawParamsFromConfig } from "modules/synthParamsProcessor";

export class SoundPlayer {

    private soundSource: ControlledSoundNode;
    private masterOut: VolumeNode;
    private numberOfVoices: number;

    constructor(output: VolumeNode) {
        this.masterOut = output;
        this.soundSource = new ControlledSoundNode(null, null);
    }

    public setVolume(volume: number): void {
        // TODO: should control the volume of the output, not each the sources
        this.soundSource.setVolume(volume);
    }

    public startPlayingNotes(notes: INoteWithWeight[], velocity: number = 0.5): void {
        this.soundSource.startPlayingNotes(notes, velocity);
    }

    public updateFrequenciesBeingPlayed(notes: INoteWithWeight[]): void {
        this.soundSource.updateFrequenciesBeingPlayed(notes);
    }

    public stopPlaying(): void {
        this.soundSource.stopPlaying();
    }

    public updateConfig(config: ISound): void {
        if (this.soundSourceNeedsToBeRecreated(this.soundSource, config)) {
            this.createSynth(config);
        } else {
            this.soundSource.updateWithParams(getRawParamsFromConfig(config));
        }
    }

    public notifyControllerFrame(frame: IControllerFrame): void {
        this.setVolume(frame.yRatio);
    }

    public setNumberOfVoices(numberOfVoices: number): void {
        this.numberOfVoices = numberOfVoices;
        this.soundSource.setNumberOfVoices(numberOfVoices);
    }

    public destroy(): void {
        this.soundSource.destroy();
    }

    private createSynth(config: ISound): void {
        let polySynth = null;
        if (config) {
            polySynth = createSynth(config.synthType, getRawParamsFromConfig(config), this.masterOut);
        }
        this.soundSource = new ControlledSoundNode(polySynth, config);
        if (this.numberOfVoices) {
            this.soundSource.setNumberOfVoices(this.numberOfVoices);
        }
    }

    private soundSourceNeedsToBeRecreated(soundSource: ControlledSoundNode, config: ISound): boolean {
        return soundSource.shouldBeRecreatedToUseConfig(config);
    }

}
