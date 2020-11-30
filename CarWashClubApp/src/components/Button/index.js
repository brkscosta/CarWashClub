import React from 'react';
import { TouchableHighlight } from 'react-native';

import { View, Text } from './styles';

/**
 *
 * @param {{onPress: event, borderRadius: Number, colorTheme: string, fontSize: Number, text: string}} props
 */
export const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor={'#FFF'}>
      <View
        borderRadius={props.borderRadius}
        colorTheme={props.colorTheme}
        marginTop={props.marginTop}
      >
        <Text fontSize={props.fontSize}>{props.title}</Text>
      </View>
    </TouchableHighlight>
  );
};
