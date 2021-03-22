import React from 'react';
import { TouchableHighlight } from 'react-native';

import { View, Text } from './styles';

/**
 *
 * @param {{onPress: event, borderRadius: Number, colorTheme: string, fontSize: Number, text: string}} props
 */
export const Button = (props) => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      underlayColor={'#FFF'}
      {...props}
    >
      <View
        borderRadius={props.borderRadius}
        colorTheme={props.colorTheme}
        marginTop={props.marginTop}
        width={props.width}
        {...props}
      >
        <Text fontSize={props.fontSize} color={props.fontColor}>
          {props.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};
