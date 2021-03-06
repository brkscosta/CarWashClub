import React from 'react';
import { Alert } from 'react-native';
import { TextView } from '../components';

export const alert = (alertTitle, alertText) => {
  Alert.alert(
    alertTitle,
    alertText,
    [
      {
        text: 'OK',
        onPress: () => {
          return;
        },
      },
    ],
    { cancelable: false }
  );
};

export const validateEmail = (emailParam) => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return expression.test(String(emailParam).toLowerCase());
};

export const passwordValidation = (passwordParam) => {
  const expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
  return expression.test(String(passwordParam).toLowerCase());
};

export const passwordCheck = (password) => {
  if (password === '') {
    return <TextView>{''}</TextView>;
  }
  if (!password.match(/([0-9])+$/)) {
    return <TextView>Deve conter um número</TextView>;
  }
  if (password.length < 8) {
    return <TextView>A password tem de ter 8 caracteres.</TextView>;
  }
  if (!password.match(/(?=.*[A-Z])/)) {
    return <TextView>Deve conter letra maiuscula</TextView>;
  }
};
