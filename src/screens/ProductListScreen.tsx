import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { ProductService } from '../services/ProductService';
import { IProduct } from '../types/ProductTypes';
import { LoadingContainer, ErrorContainer, ErrorText } from '../styles/DataShowStyles';
import { ProductItemContainer, ProductRow, ProductDescription, ProductDetails, ProductPrice, ProductDetailLabel, ProductDetailGroup } from '../styles/ProductStyles';

const ProductListScreen = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await ProductService.getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        setError('Erro ao buscar os produtos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator testID="loading-indicator" size="large" color="#007bff" />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText testID="error-text">{error}</ErrorText>
      </ErrorContainer>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.uuid}
      renderItem={({ item }) => (
        <ProductItemContainer>
          <ProductRow>
            <ProductDescription>{item.description}</ProductDescription>
            <ProductPrice>R$ {item.price.toFixed(2)}</ProductPrice>
          </ProductRow>
          <ProductRow>
            <ProductDetailGroup>
              <ProductDetailLabel>Cód.:</ProductDetailLabel>
              <ProductDetails>{item.sequence}</ProductDetails>
            </ProductDetailGroup>
            <ProductDetailGroup>
              <ProductDetailLabel>Qtd.:</ProductDetailLabel>
              <ProductDetails>{item.quantity}</ProductDetails>
            </ProductDetailGroup>
          </ProductRow>
          <ProductRow>
            <ProductDetailGroup>
              <ProductDetailLabel>Cód. barras:</ProductDetailLabel>
              <ProductDetails>{item.barCode}</ProductDetails>
            </ProductDetailGroup>
          </ProductRow>
        </ProductItemContainer>
      )}
    />
  );
};

export default ProductListScreen;
