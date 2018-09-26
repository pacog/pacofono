import { Volume } from "tone";
import GenericNode from "./genericNode";

export default class VolumeNode extends GenericNode {
    private volumeNode: any;

    constructor() {
        super();
        this.volumeNode = new Volume(0);
    }

    public connect(node: any): void {
        this.volumeNode.connect(node);
    }

    public toMaster(): void {
        this.volumeNode.toMaster();
    }

    public set(propertyName: string, value: number | boolean): void {
        this.volumeNode.set(propertyName, value);
    }

    public getNode(): any {
        return this.volumeNode;
    }
}
