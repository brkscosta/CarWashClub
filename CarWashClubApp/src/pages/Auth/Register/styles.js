import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  width: ${wp('100%')};
  height: ${hp('20%')};
  justify-content: center;
  flex-direction: column;
  align-items: baseline;
  background-color: #40a8c4;
`;

export const InputContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: ${wp('100%')};
  height: ${hp('100%')};
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  background-color: #fff;
  margin-top: 30%;
  position: absolute;
`;

export const ButtonContainer = styled.View`
  width: ${wp('95%')};
  margin-top: ${wp('100%')};
  margin-left: 2%;
`;

export const Scroll = styled.ScrollView`
  width: ${wp('100%')};
  height: ${hp('100%')};
  margin-bottom: 10px;
`;

export const TextHeaderContainer = styled.View`
  width: ${wp('60%')};
  height: ${hp('10%')};
  margin-left: 25%;
  margin-right: 25%;
`;

export const TextHeader = styled.Text`
  font-size: ${(props) => props.fontSize};
  font-family: 'Roboto-Light';
`;

export const PasswordStrength = styled.Text`
  color: red;
  margin-left: 10px;
  margin-right: 10px;
  text-align: justify;
  font-family: 'Roboto-Regular';
`;

export const CheckboxContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;
