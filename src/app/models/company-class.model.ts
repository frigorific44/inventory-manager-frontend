import { Deserializable } from "./deserializable.model";

export class CompanyClass implements Deserializable {
    id: number;
    name: string | undefined;

    constructor() {
        this.id = -1;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }    
}
