import { Deserializable } from "./deserializable.model";

export class CompanyClass implements Deserializable {
    id: number;
    name: string;

    constructor() {
        this.id = -1;
        this.name = '';
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }    
}
