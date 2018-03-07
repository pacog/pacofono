import { IMusicModeActions } from "./musicMode";
import { ISongsActions } from "./songs";
import { IModalsActions } from "./modals";

export type RootAction =
    | IMusicModeActions[keyof IMusicModeActions]
    | ISongsActions[keyof ISongsActions]
    | IModalsActions[keyof IModalsActions];
