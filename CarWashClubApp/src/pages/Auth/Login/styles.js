import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';

export const MainContainer = styled.View`
  flex: 1;
  background-color: #ffff;
  height: ${hp('70%')};
  width: ${wp('100%')};
`;

export const ContainerLogo = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: baseline;
  background-color: #40a8c4;
  height: 35%;
  width: 100%;
  position: absolute;
`;

export const ContainerData = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  height: 65%;
  background-color: #ffff;
  margin-top: 50%;
  position: relative;
`;

export const StyledText = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: palevioletred;
`;

export const InputTextContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: -100px;
  height: ${hp('30%')};
  margin-bottom: 25px;
`;

export const InputText = styled.TextInput`
  width: ${wp('90%')};
  height: ${hp('7%')};
  font-size: 16px;
  border-radius: 3px;
  margin-top: 20px;
  align-items: center;
  display: flex;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  border: 1px solid #40a8c4;
`;

export const MiniTextSpan = styled.Text`
  font-size: 15px;
  margin-top: 20px;
  font-weight: bold;
`;

export const ContainerRegisterText = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

export const ContainerMinTextSpan = styled.View`
  flex-direction: row;
`;

export const ButtonLoginContainer = styled.View`
  display: flex;
  width: ${wp('90%')};
  margin-top: 20px;
`;

export const ContainerForgotPassword = styled.View`
  margin-left: 55%;
`;
export const MinTextRecPw = styled.Text`
  color: #40a8c4;
  text-decoration: underline;
  font-weight: bold;
`;
