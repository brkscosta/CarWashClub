import styled from 'styled-components/native';

export const TextView = styled.Text`
  color: ${(props) => props.color || '#40a8c4'};
  text-decoration: ${(props) => props.decoration || ''};
  margin-top: 15px;
  font-size: ${(props) => props.fontSize || 16}px;
  justify-content: center;
  font-family: ${(props) =>
    `'Roboto-${props.fontStyle}'` || 'Roboto-LightItalic'};
`;
