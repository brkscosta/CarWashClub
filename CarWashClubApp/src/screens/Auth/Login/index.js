import React, { useState } from 'react';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import { imoLogo } from '../../../assets/images/';
import { validateEmail, alert } from '../../../services/utils';

import {
  ContainerRegisterText,
  ContainerForgotPassword,
  LoginContainer,
  ImageContainer,
} from './styles';

import {
  MainContainer,
  Input,
  Button,
  InputContainer,
  Header,
  FooterContainer,
  TextView,
} from '../../../components';

import { useAuth } from '../../../contexts/auth';

const Login = ({ navigation }) => {
  let { signIn } = useAuth();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  async function handleSignIn() {
    if (validateEmail(email)) {
      signIn(email, password);
    } else {
      alert('Email não válido', 'Por favor corrija o seu email');
    }
  }

  return (
    <MainContainer>
      <Header backgroundColor={'#41aea9'}>
        <ImageContainer>
          <Image source={imoLogo} style={styles.imoLogo} />
        </ImageContainer>
      </Header>
      <InputContainer height={55}>
        <LoginContainer>
          <Input
            fontStyle="BoldItalic"
            type="font-awesome"
            placeholder="example@example.com"
            onChangeText={(emailParam) => setEmail(emailParam)}
          />
          <Input
            fontStyle="BoldItalic"
            type="font-awesome"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(passParam) => setPassword(passParam)}
          />
          <ContainerForgotPassword>
            <TouchableHighlight
              underlayColor={'#FFF'}
              onPress={() =>
                navigation.navigate('RequestToChangePassword', {
                  isHeaderActive: true,
                })
              }
            >
              <TextView>Recuperar Password</TextView>
            </TouchableHighlight>
          </ContainerForgotPassword>
          <Button
            title="Entrar"
            onPress={handleSignIn}
            fontSize={22}
            borderRadius={10}
            colorTheme="#41aea9"
            marginTop={25}
            width={330}
          />
          <ContainerRegisterText>
            <TouchableHighlight
              underlayColor={'#FFF'}
              onPress={() =>
                navigation.navigate('Register', { isHeaderActive: true })
              }
            >
              <TextView>Não tem conta? Registar</TextView>
            </TouchableHighlight>
          </ContainerRegisterText>
        </LoginContainer>
      </InputContainer>
      <FooterContainer
        paddingTop={18}
        paddingBottom={15}
        marginTop={100}
        marginLeft={10}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  imoLogo: {
    width: 160,
    height: 80,
  },
  registerSpan: {
    color: '#40a8c4',
  },
});

export default Login;
