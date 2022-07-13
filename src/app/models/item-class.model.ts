import { SectionClass } from "./section-class.model";

export class ItemClass {
    index: number;
    name: string | undefined;
    altId: string | undefined;
    description: string | undefined;
    count: number | undefined;
    // section: SectionClass | undefined;

    constructor() {
        this.index = -1;
        this.count = 0;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        // this.section = new SectionClass().deserialize(input.warehouse);
        return this;
    }  
}
