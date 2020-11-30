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

export const InputContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: ${wp('100%')};
  height: ${(props) => props.height || 100}%;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  background-color: #fff;
  margin-top: 30%;
  position: absolute;
`;

export const Header = styled.View`
  width: ${wp('100%')};
  height: ${hp('20%')};
  justify-content: center;
  flex-direction: column;
  align-items: baseline;
  background-color: ${(props) => props.backgroundColor || '#40a8c4'};
`;

export const FooterContainer = styled.View`
  width: ${wp('95%')};
  height: ${wp('20%')};
  margin-top: ${(props) => props.marginTop}%;
  margin-left: ${(props) => props.marginLeft}px;
  padding-top: ${(props) => props.paddingTop}%;
  padding-bottom: ${(props) => props.paddingBottom}%;
`;
