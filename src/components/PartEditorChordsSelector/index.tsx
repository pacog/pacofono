import * as React from "react";
import { IChord, ISongPart } from "types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./style.scss";

interface IPartEditorChordsSelectorProps {
    part: ISongPart;
    chords: IChord[];
    selectedChord: IChord;
    onSelectChord: (chord: IChord) => void;
    onMoveChord: (chordId: string, partId: string, desiredIndex: number) => void;
}

const PartEditorChordsSelector: React.SFC<IPartEditorChordsSelectorProps> = (props: IPartEditorChordsSelectorProps) => (
    <div className="chords-selector">
        <div className="p-label mt-m">Chords</div>
        <DragDropContext
            onDragEnd={(dragResult) => {
                if (dragResult.destination) {
                    props.onMoveChord(dragResult.draggableId, props.part.id, dragResult.destination.index);
                }
            }}
        >
            <Droppable
                droppableId="droppableChords"
                direction="horizontal">
                {(provided, snapshot) => (
                    <div
                        className="chords-selector-list"
                        ref={provided.innerRef}
                    >
                        {props.chords && props.chords.map( (chord, index) => (
                            <Draggable key={chord.id} draggableId={chord.id} index={index}>
                                {(providedInner, snapshotInner) => (
                                    <div
                                        ref={providedInner.innerRef}
                                        {...providedInner.draggableProps}
                                        {...providedInner.dragHandleProps}
                                        className={
                                            "chords-selector-chord " +
                                            ((props.selectedChord === chord) ? "chords-selector-chord-selected" : "")
                                        }
                                        onClick={
                                           () => { props.onSelectChord(chord); }
                                        }
                                        >
                                        <div className="chords-selector-chord-bg"></div>
                                        <div className="chords-selector-chord-bar"></div>
                                        <div className="chords-selector-chord-name">
                                            { chord.name || getNameForChordWithoutName(index) }
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>

    </div>
);


function getNameForChordWithoutName(chordIndex: number) {
    return `Chord ${chordIndex + 1}`;
}

export default PartEditorChordsSelector;
