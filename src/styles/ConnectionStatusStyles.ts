import styled from 'styled-components/native';
import { Container as SharedContainer, Title as SharedTitle } from './CommonStyles';

export const Container = styled(SharedContainer)``;

export const Title = styled(SharedTitle)`
  margin-bottom: 20px;
`;

export const StatusIndicator = styled.Text<{ online: boolean | null }>`
  color: ${(props: { online: boolean | null })  => (props.online ? '#28a745' : '#dc3545')};
  font-size: 18px;
  font-weight: bold;
`;
