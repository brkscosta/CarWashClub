import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styled from 'styled-components/native';

export const MainContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor || '#FFF'};
  height: ${hp('70%')};
  width: ${wp('100%')};
`;

export const InputContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: ${wp('100%')};
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  background-color: ${(props) => props.backgroundColor || '#FFF'};
  margin-top: 30%;
  position: absolute;
`;

export const Header = styled.View`
  width: ${(props) => hp(props.width) || wp('100%')};
  height: ${(props) => hp(props.height) || hp('20%')};
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || '#40a8c4'};
`;

export const FooterContainer = styled.View`
  position: absolute;
  bottom: 1;
  width: ${wp('100%')};
  align-items: center;
`;
