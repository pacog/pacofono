import { Volume, Analyser } from "tone";
import { mainVolumeChangeObservable, muteVolumeChangeObservable } from "store/storeChanges";
import { percentageToDecibels } from "utils/decibels";

export const masterOutput = new Volume(0);
export const masterAnalyser = new Analyser("fft", 32);
masterAnalyser.set("smoothing", 0.2);
masterOutput.connect(masterAnalyser);
masterOutput.toMaster();

mainVolumeChangeObservable.subscribe((newVolume) => {
    if (newVolume !== null) {
        masterOutput.set("volume", percentageToDecibels(newVolume));
    }
});

muteVolumeChangeObservable.subscribe((newMuted) => {
    if (newMuted !== null) {
        masterOutput.set("mute", newMuted);
    }
});
