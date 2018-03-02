import { IMusicModeActions } from "./musicMode";
import { ISongsActions } from "./songs";

export type RootAction =
    | IMusicModeActions[keyof IMusicModeActions]
    | ISongsActions[keyof ISongsActions];
