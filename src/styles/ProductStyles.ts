import styled from 'styled-components/native';

export const ProductItemContainer = styled.View`
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  elevation: 1;
  margin: 8px 5px 0px 5px;
  flex-direction: column;
`;

export const ProductRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

export const ProductDetailGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProductDescription = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const ProductDetails = styled.Text`
  color: #666;
  font-size: 14px;
  margin-left: 5px;
`;

export const ProductPrice = styled.Text`
  color: #007bff;
  font-size: 16px;
  font-weight: bold;
`;

export const ProductDetailLabel = styled.Text`
  font-weight: bold;
  color: #333;
  font-size: 13px;
`;