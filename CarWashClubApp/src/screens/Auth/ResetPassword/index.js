import React, { useState } from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

import {
  MainContainer,
  Header,
  Scroll,
  Input,
  Button,
  InputContainer,
  FooterContainer,
  TextView,
} from '../../../components';
import { api } from '../../../services/api';
import { alert, passwordCheck } from '../../../services/utils';

const ResetPassword = ({ route, navigation }) => {
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');

  const handleChangeConfirmPassword = () => {
    return '';
  };

  return (
    <>
      <MainContainer>
        <Scroll>
          <Header>
            <TextView color="#FFF">Olá Mundo</TextView>
          </Header>
        </Scroll>
        <InputContainer>
          <Input
            placeholder="Password"
            onChangeText={(passwordParam) => setPassword(passwordParam)}
            required={true}
          />
          <Input
            placeholder="Confirmar password"
            onChangeText={(confirmPasswordParam) =>
              setConfirmPassword(confirmPasswordParam)
            }
            required={true}
          />
          {password !== confirmPassword && (
            <TextView color="red">As passwords não são iguais!</TextView>
          )}
          {passwordCheck(password)}
          <Button
            title="Confirmar"
            onPress={handleChangeConfirmPassword}
            fontSize={22}
            borderRadius={10}
            colorTheme="#41aea9"
            width={350}
          />
        </InputContainer>
      </MainContainer>
    </>
  );
};

export default ResetPassword;
