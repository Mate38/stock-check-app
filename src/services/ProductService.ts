import apiClient from '../api/apiClient';

import { IProduct } from '../types/ProductTypes';
import { DatabaseService } from './DatabaseService';


const GET_PRODUCTS_ENDPOINT = '/rpc/v1/inventory.get-product';
const UPDATE_PRODUCT_ENDPOINT = '/rpc/v1/inventory.put-product';
const GET_PRODUCT_BY_ID_ENDPOINT = '/rpc/v1/inventory.get-product';

const PRODUCTS_JSON_ID = 'products';

const getProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await apiClient.post<IProduct[]>(GET_PRODUCTS_ENDPOINT);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (product: IProduct) => {
  const response = await apiClient.post<IProduct>(UPDATE_PRODUCT_ENDPOINT, product);
  return response.data;
};

const getProductById = async (id: number): Promise<IProduct> => {
  try {
    const response = await apiClient.post<IProduct[]>(GET_PRODUCT_BY_ID_ENDPOINT, { id: id });
    return response.data[0];
  } catch (error) {
    throw error;
  }
};

const getLocalProducts = async (): Promise<IProduct[]> => {
  const storedData = await DatabaseService.getJson<IProduct[]>(PRODUCTS_JSON_ID);
  if (storedData) {
      return storedData;
  }
  return [];
}

const storeLocalProducts = async (products: IProduct[]): Promise<void> => {
  await DatabaseService.storeJson(PRODUCTS_JSON_ID, products);
};

export const ProductService = {
  getProducts,
  updateProduct,
  getProductById,
  getLocalProducts,
  storeLocalProducts
};
