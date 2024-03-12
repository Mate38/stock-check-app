import styled from 'styled-components/native';
import { Container as SharedContainer } from './CommonStyles';

export const Container = styled(SharedContainer)`
  justify-content: flex-start;
  padding-top: 25%;
  background-color: #f2f2f2;
`;

export const StatusIndicator = styled.Text<{ online: boolean | null }>`
  color: ${(props: { online: boolean | null })  => (props.online ? '#28a745' : '#dc3545')};
  font-size: 18px;
  font-weight: bold;
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
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
