import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, View } from './styles';
import { Icon } from 'react-native-elements';

/**
 * @param {{fontVariant: string}} props
 */
export const Input = (props) => {
  console.log(props);
  return (
    <>
      <TextInput
        placeholder={props.placeholder}
        fontStyle={props.fontStyle}
        secureTextEntry={props.secureTextEntry}
      />
    </>
  );
};
