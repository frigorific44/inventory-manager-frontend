export interface Item {
    id: number;
    name?: string;
    alt?: string;
    description?: string;
    count?: number;
    parentId: number;
}

export interface IndexedItem {
    item: Item;
    index: number;
}
