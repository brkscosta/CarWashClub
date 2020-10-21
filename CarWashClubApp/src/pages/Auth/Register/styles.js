import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styled from 'styled-components/native';

export const MainContainer = styled.View`
  flex: 1;
  width: ${wp('100%')};
  height: ${hp('100%')};
  background-color: #fff;
`;

export const InputText = styled.TextInput`
  display: flex;
  width: ${wp('95%')};
  height: ${hp('7%')};
  font-size: 16px;
  border-radius: 3px;
  margin-top: 20px;
  border-radius: 10px;
  font-size: 16px;
  flex-direction: row;
  justify-content: center;
  border: 1px solid #40a8c4;
`;

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

export const ButonContainer = styled.View`
  width: ${wp('95%')};
  margin-top: 100%;
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
`;

export const PasswordStrength = styled.Text`
  color: red;
  margin-left: 10px;
  margin-right: 10px;
  text-align: justify;
`;

export const CheckboxContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-right: 30%;
  margin-top: 10px;
`;
