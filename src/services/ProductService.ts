import apiClient from '../api/apiClient';
import { IProduct } from '../types/ProductTypes';

const ENDPOINT = '/rpc/v1/inventory.get-product';

export const getProducts = async (): Promise<IProduct[]> => {
    try {
        const response = await apiClient.post(ENDPOINT);
        const products: IProduct[] = response.data.map((item: any) => ({
            uuid: item.uuid,
            sequence: item.sequence,
            description: item.description,
            price: item.price,
            quantity: item.quantity,
            barCode: item.barCode
        }));
        return products;
    } catch (error) {
        throw error;
    }
};

export const ProductService = {
    getProducts
}