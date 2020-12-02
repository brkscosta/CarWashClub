import React from 'react';
import { TextInput } from './styles';

/**
 * @param {{fontVariant: string}} props
 */
export const Input = (props) => {
  return (
    <>
      <TextInput
        {...props}
        placeholder={props.placeholder}
        fontStyle={props.fontStyle}
        secureTextEntry={props.secureTextEntry}
      />
    </>
  );
};
