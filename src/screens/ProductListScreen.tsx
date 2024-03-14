import React, { useState, useLayoutEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';

import { 
  FlatList, 
  ActivityIndicator, 
  Modal, 
  TouchableOpacity, 
  View, 
  Text, 
  Button 
} from 'react-native';

import { 
  LoadingContainer, 
  ErrorContainer, 
  ErrorText 
} from '../styles/DataShowStyles';
import { 
  ProductItemContainer, 
  ProductRow, 
  ProductDescription, 
  ProductDetails, 
  ProductPrice, 
  ProductDetailLabel,
  ProductDetailGroup, 
  ScreenContainer, 
  ButtonsRow 
} from '../styles/ProductStyles';

import { IProduct } from '../types/ProductTypes';

import { useProducts } from '../contexts/ProductContext';
import { useConnection } from '../contexts/ConnectionContext';
import { ProductService } from '../services/ProductService';

import FilterProductListScreen from './FilterProductListScreen';
import EditProductScreen from './EditProductScreen';


const ProductListScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct>({} as IProduct);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScannerVisible, setScannerVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const { products, fetchProducts, updateProducts } = useProducts();
  const { isConnected } = useConnection();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      loadProducts();
    }, [])
  );

  useLayoutEffect(() => {
    (async () => {
      checkPermissions();
    })();
  }, []);

  const checkPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const loadProducts = async () => {
    setError(null);
    setLoading(true);
    if (isConnected) {
      try {
        await fetchProducts();
      } catch (error) {
        setError('Erro ao buscar os produtos');
      }
    } else {
      try {
        const localProducts = await ProductService.getLocalProducts();
        if (localProducts) {
          setFilteredProducts(localProducts);
          setIsFiltering(false);
        }
      } catch (error) {
        setError('Erro ao buscar os produtos localmente');
      }
    }
    setLoading(false);
  };

  const handleFilter = (description: string, barCode: string) => {
    setIsFiltering(true);
    const result = products.filter(product =>
      product.description.includes(description) && product.barCode.includes(barCode)
    );
    setFilteredProducts(result);
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ButtonsRow>
          <TouchableOpacity onPress={() => loadProducts()}>
            <AntDesign
              name="reload1"
              size={26}
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setScannerVisible(true)}>
            <AntDesign
              name="barcode"
              size={27}
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFilterModalVisible(true)}>
            <AntDesign
              name="filter"
              size={26}
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        </ButtonsRow>
      ),
    });
  }, [navigation, loadProducts]);

  const openEditModal = (product: IProduct) => {
    setSelectedProduct(product);
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    loadProducts()
    setIsEditModalVisible(false);
  }

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScannerVisible(false);
    filterProducts('', data);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Sem acesso a câmera</Text>;
  }

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

  const displayProducts = isFiltering ? filteredProducts : products;

  return (
    <ScreenContainer>
      <FlatList
        data={displayProducts}
        keyExtractor={item => item.uuid}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openEditModal(item)}>
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
                  <ProductDetails>{item.quantity} {item.unitOfMeasure.acronym}</ProductDetails>
                </ProductDetailGroup>
              </ProductRow>
              <ProductRow>
                <ProductDetailGroup>
                  <ProductDetailLabel>Cód. barras:</ProductDetailLabel>
                  <ProductDetails>{item.barCode}</ProductDetails>
                </ProductDetailGroup>
              </ProductRow>
            </ProductItemContainer>
          </TouchableOpacity>
        )}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <FilterProductListScreen onClose={() => setIsFilterModalVisible(false)} filterProducts={handleFilter} />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => closeEditModal()}
      >
        <EditProductScreen product={selectedProduct} onClose={() => closeEditModal()} />
      </Modal>
      <Modal
        visible={isScannerVisible}
        onRequestClose={() => setScannerVisible(false)}>
        <Camera
          style={{ flex: 1 }}
          onBarCodeScanned={isScannerVisible ? handleBarCodeScanned : undefined}>
          <View style={{ flex: 1 }}>
            <Button title="Fechar" onPress={() => setScannerVisible(false)} />
          </View>
        </Camera>
      </Modal>
    </ScreenContainer>
  );
};

export default ProductListScreen;
