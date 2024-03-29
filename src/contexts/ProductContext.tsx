import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

import { IProduct } from '../types/ProductTypes';

import { ProductService } from '../services/ProductService';

interface ProductContextType {
    products: IProduct[];
    fetchProducts: () => Promise<void>;
    updateProducts: (newProducts: IProduct[]) => void;
    updateProduct: (updatedProduct: IProduct) => void;
    hasLocalUpdate: boolean;
    setHasLocalUpdate: (hasUpdate: boolean) => void;
}

const ProductContext = createContext<ProductContextType>({} as ProductContextType);

interface ProductProviderProps {
    children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [hasLocalUpdate, setHasLocalUpdate] = useState<boolean>(false);

    const fetchProducts = useCallback(async () => {
        try {
            let fetchedProducts = await ProductService.getProducts();
            fetchedProducts = fetchedProducts.map(product => ({
                ...product,
                originalPrice: product.price,
                originalQuantity: product.quantity
            }));
            setProducts(fetchedProducts);
            ProductService.storeLocalProducts(fetchedProducts);
        } catch (error) {
            console.error('Erro ao buscar os produtos', error);
        }
    }, []);

    const updateProducts = useCallback((newProducts: IProduct[]) => {
        setProducts(newProducts);
        ProductService.storeLocalProducts(newProducts);
    }, []);

    const updateProduct = useCallback((updatedProduct: IProduct) => {
        const newProducts: IProduct[] = products.map(product => {
            if (product.id === updatedProduct.id) {
                return updatedProduct;
            }
            return product;
        });
        setProducts(newProducts);
        ProductService.storeLocalProducts(newProducts);
    }, [products]);

    return (
        <ProductContext.Provider value={{ products, fetchProducts, updateProducts, updateProduct, setHasLocalUpdate, hasLocalUpdate }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
