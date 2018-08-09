import { IMusicModeActions } from "./musicMode";
import { ISongsActions } from "./songs";
import { IPartsActions } from "./parts";
import { IChordsActions } from "./chords";
import { IModalsActions } from "./modals";
import { ISongEditorActions } from "./songEditor";
import { ICurrentSongActions } from "./currentSong";
import { ICurrentSongPartActions } from "./currentSongPart";
import { ISongSelectorActions } from "./songSelector";
import { IMainVolumeActions } from "./mainVolume";

export type RootAction =
    | IMusicModeActions[keyof IMusicModeActions]
    | ISongsActions[keyof ISongsActions]
    | IPartsActions[keyof IPartsActions]
    | IChordsActions[keyof IChordsActions]
    | IModalsActions[keyof IModalsActions]
    | ISongEditorActions[keyof ISongEditorActions]
    | ICurrentSongActions[keyof ICurrentSongActions]
    | ICurrentSongPartActions[keyof ICurrentSongPartActions]
    | ISongSelectorActions[keyof ISongSelectorActions]
    | IMainVolumeActions[keyof IMainVolumeActions];
