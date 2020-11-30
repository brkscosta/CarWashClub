import styled from 'styled-components/native';

const themes = {
  primary: '#0A6AB6',
};

export const View = styled.View`
  background-color: ${(props) =>
    props.colorTheme === 'primary' || !props.colorTheme
      ? themes.primary
      : (themes.primary = props.colorTheme)};
  border-radius: ${(props) => props.borderRadius || 3}px;
  height: ${(props) => props.height || 40};
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.marginTop || 10}px;
`;

export const Text = styled.Text`
  font-size: ${(props) => props.fontSize || 19};
  color: ${(props) => props.color || 'black'};
  font-family: 'Roboto-Light';
`;
