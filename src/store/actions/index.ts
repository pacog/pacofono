import { IMusicModeActions } from "./musicMode";
import { ISongsActions } from "./songs";
import { IPartsActions } from "./parts";
import { IModalsActions } from "./modals";
import { ISongEditorActions } from "./songEditor";
import { ICurrentSongActions } from "./currentSong";
import { ICurrentSongPartActions } from "./currentSongPart";
import { ISongSelectorActions } from "./songSelector";

export type RootAction =
    | IMusicModeActions[keyof IMusicModeActions]
    | ISongsActions[keyof ISongsActions]
    | IPartsActions[keyof IPartsActions]
    | IModalsActions[keyof IModalsActions]
    | ISongEditorActions[keyof ISongEditorActions]
    | ICurrentSongActions[keyof ICurrentSongActions]
    | ICurrentSongPartActions[keyof ICurrentSongPartActions]
    | ISongSelectorActions[keyof ISongSelectorActions];
