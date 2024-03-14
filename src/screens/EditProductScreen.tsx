import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { IProduct } from '../types/ProductTypes';
import { ButtonContainer, ButtonText } from '../styles/CommonStyles';
import { LoadingContainer } from '../styles/DataShowStyles';
import { ModalContainer, FormContainer, StyledInput, Title, Label, Text } from '../styles/EditProductStyles';
import { ProductService } from '../services/ProductService';
import { checkConnection } from '../services/ConnectionService';
import { useProducts } from '../contexts/ProductContext';

interface EditProductScreenProps {
  product: IProduct;
  onClose: () => void;
}

const EditProductScreen: React.FC<EditProductScreenProps> = ({ product, onClose }) => {
  const [currentProduct, setCurrentProduct] = useState<IProduct>(product);
  const [price, setPrice] = useState(product.price.toString());
  const [quantity, setQuantity] = useState(product.quantity.toString());
  const [loading, setLoading] = useState(true);

  const { updateProduct } = useProducts();

  useEffect(() => {
    const loadProductData = async () => {
      setLoading(true);
      const isOnline = await checkConnection();
      if (isOnline) {
        try {
          const updatedProduct = await ProductService.getProductById(product.id);
          if (updatedProduct.id !== product.id) {
            throw new Error();
          };
          setCurrentProduct(updatedProduct);
          setPrice(updatedProduct.price.toString());
          setQuantity(updatedProduct.quantity.toString());
        } catch (error) {
          Alert.alert(
            'Erro',
            'Não foi possível carregar os dados atualizados do produto.',
            [
              {
                text: 'OK',
                onPress: () => onClose()
              }
            ]);
        }
      }
      setLoading(false);
    };

    loadProductData();
  }, [product.id]);

  const handleSave = async () => {
    const isOnline = await checkConnection();
    if (isOnline) {
      try {
        const updatedProduct = { ...currentProduct, price: parseFloat(price), quantity: parseFloat(quantity) };
        await ProductService.updateProduct(updatedProduct);
        updateProduct(updatedProduct);
        Alert.alert(
          'Sucesso',
          'Produto atualizado com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => onClose()
            }
          ]);

      } catch (error) {
        Alert.alert('Erro', 'Não foi possível atualizar o produto.');
      }
    } else {
      const updatedProduct = { ...currentProduct, originalPrice: currentProduct.price, originalQuantity: currentProduct.quantity, price: parseFloat(price), quantity: parseFloat(quantity) };
      updateProduct(updatedProduct);
    }
  };

  if (loading) {
    return (
      <ModalContainer>
        <FormContainer>
          <LoadingContainer>
            <ActivityIndicator testID="loading-indicator" size="large" color="#007bff" />
          </LoadingContainer>
        </FormContainer>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer>
      <FormContainer>
        <Title>{currentProduct.description}</Title>
        <Label>Código:</Label>
        <Text>{currentProduct.sequence}</Text>
        <Label>Código de barras:</Label>
        <Text>{currentProduct.barCode}</Text>
        <Label>Unidade de medida:</Label>
        <Text>{currentProduct.unitOfMeasure.name} ({currentProduct.unitOfMeasure.acronym})</Text>
        <Label>Preço:</Label>
        <StyledInput
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="Preço"
        />
        <Label>Quantidade:</Label>
        <StyledInput
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholder="Quantidade"
        />
        <ButtonContainer onPress={handleSave}>
          <ButtonText>Salvar</ButtonText>
        </ButtonContainer>
        <ButtonContainer onPress={onClose} bgColor="#ccc">
          <ButtonText>Cancelar</ButtonText>
        </ButtonContainer>
      </FormContainer>
    </ModalContainer>
  );
};

export default EditProductScreen;