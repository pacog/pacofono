class Observable<T> {

    private subscribers: Array<(newValue: T) => void>;

    constructor() {
        this.subscribers = [];
    }

    public notify(newValue: T) {
        this.subscribers.forEach((subscriber) => subscriber(newValue));
    }

    public subscribe(callback: (newValue: T) => void): () => void {
        const unsubscriber = () => {
            this.subscribers = this.subscribers.filter((subscriberCallback) => subscriberCallback !== callback);
        };
        this.subscribers.push(callback);
        return unsubscriber;
    }

    public destroy(): void {
        this.subscribers = [];
    }

}

export default Observable;
