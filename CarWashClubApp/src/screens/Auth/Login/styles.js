import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const ContainerLogo = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: baseline;
  background-color: #40a8c4;
  height: 35%;
  width: 100%;
  position: absolute;
`;

export const ImageContainer = styled.View`
  margin-left: 30%;
  margin-right: 30%;
  margin-bottom: 5%;
`;

export const LoginContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: ${wp('10%')};
  align-items: center;
`;

export const ContainerRegisterText = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-top: 20px;
`;

export const ContainerForgotPassword = styled.View`
  margin-left: 55%;
`;
