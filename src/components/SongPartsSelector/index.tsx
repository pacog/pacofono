import * as React from "react";
import { ISongPart } from "types";
import PButton from "components/PButton";
import { getNameForPartWithoutName } from "constants/defaultNewSongPart";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./style.scss";

interface ISongPartsSelectorProps {
    parts: ISongPart[];
    selectedPart: ISongPart;
    onAddPart: () => void;
    onSelectPart: (part: ISongPart) => void;
    onMovePart: (partId: string, desiredIndex: number) => void;
}

const SongPartsSelector: React.SFC<ISongPartsSelectorProps> = (props: ISongPartsSelectorProps) => (
    <React.Fragment>
        <div className="mt-m"></div>
        <DragDropContext
            onDragEnd={(dragResult) => {
                if (dragResult.destination) {
                    props.onMovePart(dragResult.draggableId, dragResult.destination.index);
                }
            }}
        >
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                    >
                        {props.parts.map( (part, index) => (
                            <Draggable key={part.id} draggableId={part.id} index={index}>
                                {(providedInner, snapshotInner) => (
                                    <div
                                        ref={providedInner.innerRef}
                                        {...providedInner.draggableProps}
                                        {...providedInner.dragHandleProps}
                                        className={
                                            "song-parts-selector-part " +
                                            ((props.selectedPart === part) ? "song-parts-selector-part-selected" : "")
                                        }
                                        onClick={() => { props.onSelectPart(part); }}>
                                        { part.name || getNameForPartWithoutName() }
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        <div className="line-center">
            <PButton
                className="mt-m"
                secondary={true}
                onClick={props.onAddPart}>
                Add part</PButton>
        </div>
    </React.Fragment>
);

export default SongPartsSelector;
