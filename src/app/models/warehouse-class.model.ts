import { CompanyClass } from "./company-class.model";
import { Deserializable } from "./deserializable.model";

export class WarehouseClass implements Deserializable {
    id: number;
    name: string | undefined;
    company: CompanyClass | undefined;

    constructor() {
        this.id = -1;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.company = new CompanyClass().deserialize(input.company);
        return this;
    }    
}
