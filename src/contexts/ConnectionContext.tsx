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
  const [isConnected, setIsConnected] = useState(false);
  const [shouldSynchronize, setShouldSynchronize] = useState(false);

  const { products, hasLocalUpdate, setHasLocalUpdate, fetchProducts } = useProducts();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected && state.isInternetReachable);
      if (state.isConnected && state.isInternetReachable) {
        setShouldSynchronize(true);
      }
    });

    return () => unsubscribe();
  }, []);

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

              /**
               * Como a política exata de tratamento de diferença para casos de alteração de preços não está documentada
               * e o objeto do produto não traz data de alteração do preço para poder checar qual das duas alterações foram realizadas por ultimo
               * decidi utilizar uma política de que caso o preço retornado esteja divergente do preço inicial que tinha antes de ser alterado mantém o preço do servidor
               * TODO: Notificar o usuário do APP que a alteração do preço não foi concluída pois já haviam alterações posteriores no servidor
               */
              if (updatedProduct.price === localProduct.originalPrice) {
                updatedProduct.price = localProduct.price;
              }

              /**
               * Já com a quantidade decidi por no caso de haver alterações somar essa alteração com a alteração realizada no app
               */
              if (updatedProduct.quantity === localProduct.originalQuantity) {
                updatedProduct.quantity = localProduct.quantity;
              } else {
                if (localProduct.originalQuantity) {
                  let dif = Math.abs(localProduct.originalQuantity - localProduct.quantity);
                  updatedProduct.quantity = updatedProduct.quantity + dif;
                }
              }
              await ProductService.updateProduct(updatedProduct);
              updatedProduct.hasLocalUpdate = false;
              setHasLocalUpdate(false);
            }
          } catch (error) {
            console.error('Falha ao sincronizar dados:', error);
          }
        }
      }
    }
    if (products.length > 0) {
      await fetchProducts();
    }
  };

  useEffect(() => {
    if (isConnected && shouldSynchronize) {
      synchronizeData().then(() => {
        setShouldSynchronize(false);
      });
    }
  }, [isConnected, shouldSynchronize, synchronizeData]);

  return (
    <ConnectionContext.Provider value={{ isConnected, synchronizeData }}>
      {children}
    </ConnectionContext.Provider>
  );

};