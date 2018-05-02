import { ISong } from "types";

export default interface ISongEditorProps {
    song: ISong;
    isNewSong: boolean;
    isShowingConfirmRestoreDefaults: boolean;
    isShowingConfirmDeleteSong: boolean;
    onSaveSong: () => void;
    onClose: (song: ISong) => void;
    onSongNameChanged: (song: ISong, newValue: string) => void;
    onRestoreDefaults: () => void;
    onRestoreDefaultsConfirm: () => void;
    onCancelRestoreDefaults: () => void;
    onDeleteSong: () => void;
    onCancelDeleteSong: () => void;
    onDeleteSongConfirm: () => void;
}
