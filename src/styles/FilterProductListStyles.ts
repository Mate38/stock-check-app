import styled from 'styled-components/native';
import { FormContainer as SharedFormContainer } from './CommonStyles';

export const FilterContainer = styled.View`
  flex: 1;
  background-color: white;
  width: 85%;
  padding: 20px;
  margin-left: auto;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

export const FormContainer = styled(SharedFormContainer)`
  margin-top: 5px;
`;

export const StyledInput = styled.TextInput`
  height: 50px;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 14px;
`;

export const ButtonWrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

