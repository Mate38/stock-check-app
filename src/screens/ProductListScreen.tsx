import React, { useEffect, useState, useLayoutEffect } from 'react';
import { FlatList, ActivityIndicator, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoadingContainer, ErrorContainer, ErrorText } from '../styles/DataShowStyles';
import { ProductItemContainer, ProductRow, ProductDescription, ProductDetails, ProductPrice, ProductDetailLabel, ProductDetailGroup, ScreenContainer, ButtonsRow } from '../styles/ProductStyles';
import FilterProductListScreen from './FilterProductListScreen';
import { AntDesign } from '@expo/vector-icons';
import { useProducts } from '../contexts/ProductContext';
import { checkConnection } from '../services/ConnectionService';
import { ProductService } from '../services/ProductService';

const ProductListScreen = () => {
  const { products, fetchProducts, updateProducts } = useProducts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const navigation = useNavigation();

  const loadProducts = async () => {
    setLoading(true);
    const isOnline = await checkConnection();
    if (isOnline) {
        try {
            await fetchProducts();
        } catch (error) {
            setError('Erro ao buscar os produtos');
        }
    } else {
        try {
            const localProducts = await ProductService.getLocalProducts();
            if (localProducts) {
              updateProducts(localProducts);
            }
        } catch (error) {
            setError('Erro ao buscar os produtos localmente');
        }
    }
    setLoading(false);
  };

  const filterProducts = (description: string, barCode: string) => {
    setLoading(true);
    try {
      const filteredProducts = products.filter(product => {
        const matchDescription = description ? product.description.includes(description) : true;
        const matchBarCode = barCode ? product.barCode.includes(barCode) : true;
        return matchDescription && matchBarCode;
      });
      updateProducts(filteredProducts);
    } catch (error) {
      setError('Erro ao filtrar os produtos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ButtonsRow>
          <AntDesign 
            name="reload1" 
            size={26} 
            onPress={loadProducts} 
            style={{ marginRight: 20 }}
          />
          <AntDesign
            name="filter"
            size={26}
            onPress={() => setIsFilterModalVisible(true)}
            style={{ marginRight: 15 }}
          />
        </ButtonsRow>
      ),
    });
  }, [navigation]);

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
    <ScreenContainer>
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <FilterProductListScreen onClose={() => setIsFilterModalVisible(false)} filterProducts={filterProducts} />
      </Modal>
    </ScreenContainer>
  );
};

export default ProductListScreen;
