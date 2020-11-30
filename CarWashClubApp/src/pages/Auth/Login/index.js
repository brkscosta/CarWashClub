import React, { useState } from 'react';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import { imoLogo } from '../../../assets/images/';
import { validateEmail, alert } from '../../../services/utils';

import {
  MiniTextSpan,
  ContainerMinTextSpan,
  ContainerRegisterText,
  ContainerForgotPassword,
  MinTextRecPw,
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
            name="eye"
            type="font-awesome"
            placeholder="example@example.com"
            onChangeText={(emailParam) => setEmail(emailParam)}
            fontStyle="LightItalic"
          />
          <Input
            name="eye"
            type="font-awesome"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(passParam) => setPassword(passParam)}
            fontStyle="LightItalic"
          />
          <ContainerForgotPassword>
            <TouchableHighlight
              underlayColor={'#FFF'}
              onPress={() => navigation.navigate('ResetPassword')}
            >
              <MinTextRecPw>Recuperar Password</MinTextRecPw>
            </TouchableHighlight>
          </ContainerForgotPassword>
          <ContainerRegisterText>
            <ContainerMinTextSpan>
              <TouchableHighlight
                underlayColor={'#FFF'}
                onPress={() =>
                  navigation.navigate('Register', { isHeaderActive: true })
                }
              >
                <MiniTextSpan style={styles.registerSpan}>
                  Não tem conta? Registar
                </MiniTextSpan>
              </TouchableHighlight>
            </ContainerMinTextSpan>
          </ContainerRegisterText>
          <Button
            title="Entrar"
            onPress={handleSignIn}
            fontSize={22}
            borderRadius={10}
            colorTheme="#41aea9"
            marginTop={25}
          />
        </LoginContainer>
      </InputContainer>
      <FooterContainer
        paddingTop={25}
        paddingBottom={25}
        marginTop={90}
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
