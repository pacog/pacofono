import { Volume } from "tone";
import { mainVolumeChangeObservable, muteVolumeChangeObservable } from "store/storeChanges";
import { percentageToDecibels } from "utils/decibels";

const masterOutput = new Volume(0);
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

export default masterOutput;
