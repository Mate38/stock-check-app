import apiClient from '../api/apiClient';
import { IProduct } from '../types/ProductTypes';
import { DatabaseService } from './DatabaseService';

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
    await DatabaseService.storeJson('products', products);
    return products;
  } catch (error) {
    throw error;
  }
};

const getLocalProducts = async (): Promise<IProduct[]> => {
  const storedData = await DatabaseService.getJson<IProduct[]>('products');
  if (storedData) {
      return storedData;
  }
  return [];
}

export const ProductService = {
  getProducts,
  getLocalProducts
}