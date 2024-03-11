import styled from 'styled-components/native';
import { Container as SharedContainer, Title as SharedTitle } from './CommonStyles';

export const Container = styled(SharedContainer)`
  padding: 20px;
  background-color: #f2f2f2;
`;

export const Title = styled(SharedTitle)`
  margin-bottom: 20px;
  color: #007bff;
`;

export const Info = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

export const InfoSection = styled.View`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  elevation: 3;
`;
