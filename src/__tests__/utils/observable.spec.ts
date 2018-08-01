import Observable from "utils/observable";

describe("Observable", () => {

    it("should be able to subscribe and receive values", () => {
        const callback = { onValueChange: (input: number) => {
            input = input + 5;
        } };
        const spy = jest.spyOn(callback, "onValueChange");
        const obs = new Observable<number>();
        obs.notify(5);
        expect(spy).not.toHaveBeenCalled();
        obs.subscribe(callback.onValueChange);
        expect(spy).not.toHaveBeenCalled();
        obs.notify(7);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(7);
    });

    it("should be able to do more than one subscriber", () => {
        const callback1 = { onValueChange: (input: number) => {
            input = input + 5;
        } };
        const callback2 = { onValueChange: (input: number) => {
            input = input + 5;
        } };
        const spy1 = jest.spyOn(callback1, "onValueChange");
        const spy2 = jest.spyOn(callback2, "onValueChange");
        const obs = new Observable<number>();
        obs.subscribe(callback1.onValueChange);
        obs.subscribe(callback2.onValueChange);
        obs.notify(8);
        expect(spy1).toHaveBeenCalled();
        expect(spy1).toHaveBeenCalledWith(8);
        expect(spy2).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalledWith(8);
    });

    it("should be able to unsubscribe", () => {
        const callback = { onValueChange: (input: number) => {
            input = input + 5;
        } };
        const spy = jest.spyOn(callback, "onValueChange");
        const obs = new Observable<number>();
        const unsubscriber = obs.subscribe(callback.onValueChange);
        unsubscriber();
        obs.notify(7);
        expect(spy).not.toHaveBeenCalled();
    });

    it("should be able to destroy the observable", () => {
        const callback = { onValueChange: (input: number) => {
            input = input + 5;
        } };
        const spy = jest.spyOn(callback, "onValueChange");
        const obs = new Observable<number>();
        obs.subscribe(callback.onValueChange);
        obs.destroy();
        obs.notify(7);
        expect(spy).not.toHaveBeenCalled();
    });

    it("should be able to create a notifyOnSubscribe observable", () => {
        const callback = { onValueChange: (input: number) => {
            input = input + 5;
        } };
        const spy = jest.spyOn(callback, "onValueChange");
        const obs = new Observable<number>({ notifyOnSubscribe: true });
        obs.notify(9);
        obs.subscribe(callback.onValueChange);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(9);
    });

});
