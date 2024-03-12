export interface IProduct {
    uuid: string;
    sequence: number;
    description: string;
    price: number;
    quantity: number;
    barCode: string;
}

export interface IProductResponse {
    data: IProduct[];
    count: number;
    total: number;
}
