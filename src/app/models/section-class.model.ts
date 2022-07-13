import { WarehouseClass } from "./warehouse-class.model";

export class SectionClass {
    id: number;
    name: string | undefined;
    description: string | undefined;
    capacity: number | undefined;
    // warehouse: WarehouseClass | undefined;

    constructor() {
        this.id = -1;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        // this.warehouse = new WarehouseClass().deserialize(input.warehouse);
        return this;
    }  
}
