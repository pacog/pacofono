import { IMusicModeActions } from "./musicMode";
import { ISongsActions } from "./songs";
import { IModalsActions } from "./modals";
import { ISongEditorActions } from "./songEditor";

export type RootAction =
    | IMusicModeActions[keyof IMusicModeActions]
    | ISongsActions[keyof ISongsActions]
    | IModalsActions[keyof IModalsActions]
    | ISongEditorActions[keyof ISongEditorActions];
