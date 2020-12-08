import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styled from 'styled-components/native';

export const TextHeader = styled.Text`
  display: flex;
  font-size: ${(props) => props.fontSize || 16};
  font-family: 'Roboto-Light';
  color: #262121;
  align-self: center;
`;

export const TextHeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  width: ${wp('75%')};
  height: ${wp('15%')};
`;

export const TextEmailError = styled.Text`
  color: red;
  margin-left: 10px;
  margin-right: 10px;
  text-align: justify;
  font-family: 'Roboto-Regular';
`;
