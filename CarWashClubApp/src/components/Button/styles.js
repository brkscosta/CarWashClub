import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const View = styled.View`
  background-color: ${(props) =>
    props.colorTheme ? props.colorTheme : '#0071ba'};
  border-radius: ${(props) => props.borderRadius || 10}px;
  height: ${(props) => props.height || 40}px;
  width: ${(props) => wp(props.width) || wp(95)};
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.marginTop || 5}px;
`;

export const Text = styled.Text`
  font-size: ${(props) => props.fontSize || 19};
  color: ${(props) => props.color || 'black'};
  font-family: 'Roboto-Light';
`;
