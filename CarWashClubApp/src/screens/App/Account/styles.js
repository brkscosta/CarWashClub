import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: ${wp('75%')};
  width: ${hp('53%')};
  margin-top: 20px;
  align-self: center;
`;
