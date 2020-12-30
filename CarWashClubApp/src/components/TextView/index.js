import styled from 'styled-components/native';

export const TextView = styled.Text`
  color: ${(props) => props.color || '#262121'};
  text-decoration: ${(props) => props.decoration || ''};
  font-size: ${(props) => props.fontSize || 16}px;

  font-family: ${(props) =>
    `'Roboto-${props.fontStyle}'` || 'Roboto-LightItalic'};
`;
