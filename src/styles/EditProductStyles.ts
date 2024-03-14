import styled from 'styled-components/native';
import { Title as SharedTitle, Text as SharedText, Label as SharedLabel, FormContainer as SharedFormContainer } from './CommonStyles';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
`;

export const FormContainer = styled(SharedFormContainer)`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

export const StyledInput = styled.TextInput`
  height: 50px;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  width: 100%;
`;

export const ButtonWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const Title = styled(SharedTitle)`
  align-self: center;
  margin-bottom: 30px;
  margin-top: 20px;
`;

export const Label = styled(SharedLabel)`
  font-size: 14px;
`;

export const Text = styled(SharedText)`
  font-size: 16px;
  margin-bottom: 15px;
`;