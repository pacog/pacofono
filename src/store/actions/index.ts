import { IMusicModeActions } from "./musicMode";
import { ISongsActions } from "./songs";
import { IModalsActions } from "./modals";
import { ISongEditorActions } from "./songEditor";
import { ICurrentSongsActions } from "./currentSong";
import { ISongSelectorActions } from "./songSelector";

export type RootAction =
    | IMusicModeActions[keyof IMusicModeActions]
    | ISongsActions[keyof ISongsActions]
    | IModalsActions[keyof IModalsActions]
    | ISongEditorActions[keyof ISongEditorActions]
    | ICurrentSongsActions[keyof ICurrentSongsActions]
    | ISongSelectorActions[keyof ISongSelectorActions];
