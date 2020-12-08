import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Scroll = styled.ScrollView`
  width: ${wp('100%')};
  height: ${hp('100%')};
  margin-bottom: 10px;
`;
