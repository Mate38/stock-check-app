import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const Input = styled.TextInput`
  width: 80%;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

export const ButtonContainer = styled.TouchableOpacity`
  width: 80%;
  background-color: #007bff;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
