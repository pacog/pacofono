interface IObservableOptions {
    notifyOnSubscribe?: boolean;
}

class Observable<T> {

    private subscribers: Array<(newValue: T) => void>;
    private currentValue: T = null;
    private options: IObservableOptions = {};

    constructor(options: IObservableOptions = {}) {
        this.options = options;
        this.subscribers = [];
    }

    public notify(newValue: T) {
        this.currentValue = newValue;
        this.subscribers.forEach((subscriber) => subscriber(newValue));
    }

    public subscribe(callback: (newValue: T) => void): () => void {
        const unsubscriber = () => {
            this.subscribers = this.subscribers.filter((subscriberCallback) => subscriberCallback !== callback);
        };
        this.subscribers.push(callback);
        if (this.options.notifyOnSubscribe) {
            callback(this.currentValue);
        }
        return unsubscriber;
    }

    public destroy(): void {
        this.subscribers = [];
    }

}

export default Observable;
