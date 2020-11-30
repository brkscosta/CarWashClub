import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';

export const TextInput = styled.TextInput`
  display: flex;
  flex-direction: row;
  width: ${wp('95%')};
  height: ${hp('7%')};
  border-radius: 3px;
  margin-top: 20px;
  border-radius: 10px;
  font-size: 16px;
  justify-content: center;
  border: 1px solid #40a8c4;
  font-family: ${(props) =>
    `'Roboto-${props.fontStyle}'` || 'Roboto-LightItalic'};
`;
