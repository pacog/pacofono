import * as React from "react";
import { IChord, IPointRatio, IPoint } from "types";
import supportsTouch from "utils/supportsTouch";
import "./style.scss";

interface IPointerInputManagerProps {
    chords: IChord[];
    onPointStart: (where: IPointRatio) => void;
    onPointerMove: (position: IPointRatio) => void;
    onPointEnd: () => void;
}

const PointerInputManager: React.SFC<IPointerInputManagerProps> = (props: IPointerInputManagerProps) => (
    <div className="pointer-input-manager"
        onMouseDown={
            (event) => {
                if (supportsTouch) {
                    return;
                }
                const where = getRatioFromBoxAndCoordinates(
                    event.currentTarget.getBoundingClientRect() as DOMRect,
                    { x: event.clientX, y: event.clientY },
                );
                props.onPointStart(where);
            }
        }
        onMouseMove={
            (event) => {
                if (supportsTouch) {
                    return;
                }
                const where = getRatioFromBoxAndCoordinates(
                    event.currentTarget.getBoundingClientRect() as DOMRect,
                    { x: event.clientX, y: event.clientY },
                );
                props.onPointerMove(where);
            }
        }
        onMouseUp={
            () => {
                if (supportsTouch) {
                    return;
                }
                props.onPointEnd();
            }
        }
        onTouchStart={
            (event) => {
                const where = getRatioFromBoxAndCoordinates(
                    event.currentTarget.getBoundingClientRect() as DOMRect,
                    { x: event.touches[0].clientX, y: event.touches[0].clientY },
                );
                props.onPointStart(where);
            }
        }
        onTouchMove={
            (event) => {
                const where = getRatioFromBoxAndCoordinates(
                    event.currentTarget.getBoundingClientRect() as DOMRect,
                    { x: event.touches[0].clientX, y: event.touches[0].clientY },
                );
                props.onPointerMove(where);
            }
        }
        onTouchEnd={
            () => {
                props.onPointEnd();
            }
        }
        onTouchCancel={
            () => {
                props.onPointEnd();
            }
        }>
        {
            props.chords &&
            props.chords.map( (chord) => (
                <div key={chord.id}
                    className="pointer-input-manager-chord">
                    <span className="pointer-input-manager-chord-name">{ chord.name }</span>
                </div>
            ))
        }
        {
            !props.chords &&
            <div>No chords :( please add or select a song</div>
        }
    </div>
);

function getRatioFromBoxAndCoordinates(box: DOMRect, point: IPoint): IPointRatio {
    return {
        x: (point.x - box.x) / box.width,
        y: 1 - (point.y - box.y) / box.height,
    };
}

export default PointerInputManager;
