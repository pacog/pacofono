const FPS = 24; // f/s
const microsecondsInterval = 1000000 * (1 / FPS);

let lastProcessedFrameMicroseconds: number = null;

export const notifyFrame = (frameInfo: any, callback: (frameInfo: any) => void): void => {
    if (shouldProcessFrame(frameInfo.timestamp)) {
        lastProcessedFrameMicroseconds = frameInfo.timestamp;
        callback(frameInfo);
    }
};

function shouldProcessFrame(currentFrameMicroseconds: number) {
    if (!lastProcessedFrameMicroseconds) {
        return true;
    }
    const diff = currentFrameMicroseconds - lastProcessedFrameMicroseconds;
    if (diff >= microsecondsInterval) {
        return true;
    }

    return false;
}
