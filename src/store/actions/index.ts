import { Actions as SongsActions } from './songs';

export type RootAction =
  | SongsActions[keyof SongsActions];
