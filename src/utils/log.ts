const ACTIVE = true;

export const log = (...args: any[]): void => {
    if (ACTIVE) {
        console.log(...args);
    }
};
