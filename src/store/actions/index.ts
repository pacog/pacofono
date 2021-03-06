import { IMusicModeActions } from "./musicMode";
import { ISoundsActions } from "./sounds";
import { ISongsActions } from "./songs";
import { IPartsActions } from "./parts";
import { IChordsActions } from "./chords";
import { IModalsActions } from "./modals";
import { ISongEditorActions } from "./songEditor";
import { ICurrentSongActions } from "./currentSong";
import { ICurrentSongPartActions } from "./currentSongPart";
import { ISongSelectorActions } from "./songSelector";
import { IMainVolumeActions } from "./mainVolume";
import { IMainOptionsActions } from "./mainOptions";
import { ILeapMotionStateActions } from "./leapMotionState";

export type RootAction =
    | IMusicModeActions[keyof IMusicModeActions]
    | ISoundsActions[keyof ISoundsActions]
    | ISongsActions[keyof ISongsActions]
    | IPartsActions[keyof IPartsActions]
    | IChordsActions[keyof IChordsActions]
    | IModalsActions[keyof IModalsActions]
    | ISongEditorActions[keyof ISongEditorActions]
    | ICurrentSongActions[keyof ICurrentSongActions]
    | ICurrentSongPartActions[keyof ICurrentSongPartActions]
    | ISongSelectorActions[keyof ISongSelectorActions]
    | IMainVolumeActions[keyof IMainVolumeActions]
    | IMainOptionsActions[keyof IMainOptionsActions]
    | ILeapMotionStateActions[keyof ILeapMotionStateActions];
