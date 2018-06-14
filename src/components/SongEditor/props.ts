import { ISong, ISongPart } from "types";

export default interface ISongEditorProps {
    song: ISong;
    parts: ISongPart[];
    selectedPart: ISongPart;
    isNewSong: boolean;
    isShowingConfirmRestoreDefaults: boolean;
    isShowingConfirmDeleteSong: boolean;
    onSaveSong: () => void;
    onAddPart: (song: ISong) => void;
    onSelectPart: (part: ISongPart) => void;
    onClose: (song: ISong) => void;
    onSongNameChanged: (song: ISong, newValue: string) => void;
    onRestoreDefaults: () => void;
    onRestoreDefaultsConfirm: () => void;
    onCancelRestoreDefaults: () => void;
    onDeleteSong: () => void;
    onCancelDeleteSong: () => void;
    onDeleteSongConfirm: () => void;
    onMovePart: (songId: string, partId: string, desiredIndex: number) => void;
}
