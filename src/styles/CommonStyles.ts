import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;

export const FormContainer = styled.View`
  flex: 1;
  width: 100%;
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

export const ButtonContainer = styled.TouchableOpacity<{ bgColor?: string }>`
  width: 100%;
  background-color: ${(props: any) => props.bgColor || '#007bff'};
  padding: 15px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  font-weight: 600;
`;

export const Text = styled.Text`
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
`;

