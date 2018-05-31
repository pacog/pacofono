import { ISong, ISongPart } from "types";

export default interface ISongEditorProps {
    song: ISong;
    parts: ISongPart[];
    isNewSong: boolean;
    isShowingConfirmRestoreDefaults: boolean;
    isShowingConfirmDeleteSong: boolean;
    onSaveSong: () => void;
    onAddPart: (song: ISong) => void;
    onClose: (song: ISong) => void;
    onSongNameChanged: (song: ISong, newValue: string) => void;
    onRestoreDefaults: () => void;
    onRestoreDefaultsConfirm: () => void;
    onCancelRestoreDefaults: () => void;
    onDeleteSong: () => void;
    onCancelDeleteSong: () => void;
    onDeleteSongConfirm: () => void;
}
