import React, { createContext, useState, useContext, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

import { IProduct } from '../types/ProductTypes';

import { useProducts } from './ProductContext';
import { ProductService } from '../services/ProductService';


const ConnectionContext = createContext({
  isConnected: false,
  synchronizeData: () => { }
});

export const useConnection = () => useContext(ConnectionContext);

export const ConnectionProvider = ({ children }: { children: React.ReactNode }) => {
  const { products, hasLocalUpdate } = useProducts();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected && state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isConnected) {
      synchronizeData();
    }
  }, [isConnected, products]);

  const loadProductData = async (product: IProduct) => {
    try {
      const updatedProduct = await ProductService.getProductById(product.id);
      if (updatedProduct && updatedProduct.id === product.id) {
        return updatedProduct;
      }
      throw new Error('Product data mismatch');
    } catch (error) {
      console.error('Error loading updated product data:', error);
      return null;
    }
  };


  const synchronizeData = async () => {
    if (hasLocalUpdate) {
      const localProducts = await ProductService.getLocalProducts();
      for (const localProduct of localProducts) {
        if ('hasLocalUpdate' in localProduct && localProduct.hasLocalUpdate) {
          try {
            const updatedProduct = await loadProductData(localProduct);
            if (updatedProduct) {
              updatedProduct.price = localProduct.price;
              updatedProduct.quantity = localProduct.quantity;
              await ProductService.updateProduct(updatedProduct);
            }
          } catch (error) {
            console.error('Falha ao sincronizar dados:', error);
          }
        }
      }
    }
  };

  return (
    <ConnectionContext.Provider value={{ isConnected, synchronizeData }}>
      {children}
    </ConnectionContext.Provider>
  );

};