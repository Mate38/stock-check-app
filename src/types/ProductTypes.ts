export interface IProduct {
    id: number;
    uuid: string;
    sequence: number;
    description: string;
    price: number;
    quantity: number;
    barCode: string;
    unit: string;
    unitOfMeasure: IUnitOfMeasure;
}

export interface IUnitOfMeasure {
    name: string
    acronym: string
}
