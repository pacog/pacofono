import { IControllerFrame, IPoint3D } from "types";
import { vectorToPointObject, getRatioWithinValues } from "./utils";

const EMPTY_FRAME: IControllerFrame = {
    timestamp: null,
    xRatio: null,
    yRatio: null,
    zRatio: null,
    isPlaying: false,
};

let lastUsedHand: string = null;

export const parseFrame = (frame: any): IControllerFrame => {
    let frameInfoWithHands = {};
    if (frame && frame.hands.length) {
        frameInfoWithHands = getFrameInfoWithHands(frame);
    }
    return {
        ...EMPTY_FRAME,
        timestamp: frame ? frame.timestamp : undefined,
        ...frameInfoWithHands,
    };
};

function getFrameInfoWithHands(frame: any): IControllerFrame {
    const hand = getHandToUse(frame);
    lastUsedHand = hand.id;

    const normalizedPosition = getHandNormalizedPosition(frame, hand);

    return {
        timestamp: frame.timestamp,
        isPlaying: true,
        xRatio: normalizedPosition.x,
        yRatio: normalizedPosition.y,
        zRatio: normalizedPosition.z,
    };
}

function getHandToUse(frame: any): any {
    if (lastUsedHand && frame.handsMap[lastUsedHand]) {
        return frame.handsMap[lastUsedHand];
    }
    return frame.hands[0];
}

function getHandNormalizedPosition(frame: any, hand: any): IPoint3D {
    const position = getPositionFromHand(hand);
    const minX = frame.interactionBox.center[0] - (frame.interactionBox.width / 2);
    const maxX = minX + frame.interactionBox.width ;
    const minY = frame.interactionBox.center[1] - (frame.interactionBox.height / 2);
    const maxY = minY + frame.interactionBox.height ;
    const minZ = frame.interactionBox.center[2] - (frame.interactionBox.depth / 2);
    const maxZ = minZ + frame.interactionBox.depth ;
    return {
        x: getRatioWithinValues(position.x, minX, maxX),
        y: getRatioWithinValues(position.y, minY, maxY),
        z: getRatioWithinValues(position.z, minZ, maxZ),
    };
}

function getPositionFromHand(hand: any): IPoint3D {
    let arrayPositionToUse;
    if (hand.middleFinger && hand.middleFinger.valid) {
        arrayPositionToUse = hand.middleFinger.tipPosition;
    } else if (hand.indexFinger && hand.indexFinger.valid) {
        arrayPositionToUse = hand.indexFinger.tipPosition;
    } else {
        arrayPositionToUse = hand.palmPosition;
    }
    return vectorToPointObject(arrayPositionToUse);
}
