import styled from 'styled-components/native';
import { Container as SharedContainer } from './CommonStyles';

export const Container = styled(SharedContainer)`
  justify-content: flex-start;
  padding: 20px;
  background-color: #f2f2f2;
`;

export const InfoSection = styled.View`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  elevation: 2;
  margin-bottom: 10px;
  min-width: 90%;
`;

export const TitleInfo = styled.Text`
  color: #333;
  font-weight: bold;
  font-size: 14px;
`;

export const ContentInfo = styled.Text`
  color: #333;
  font-size: 16px;
  margin-bottom: 6px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ErrorContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #ffdddd;
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
`;

export const ErrorText = styled.Text`
  color: #d00;
  text-align: center;
  font-size: 16px;
`;
