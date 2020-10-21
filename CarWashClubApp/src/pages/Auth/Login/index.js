import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  TouchableHighlight,
  Button,
  Text,
} from 'react-native';

import { imoLogo } from '../../../assets/index';
import { validateEmail, alert } from '../../../services/utils';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  ContainerLogo,
  InputText,
  ContainerData,
  MiniTextSpan,
  MainContainer,
  InputTextContainer,
  ContainerMinTextSpan,
  ContainerRegisterText,
  ButtonLoginContainer,
  ContainerForgotPassword,
  MinTextRecPw,
} from './styles';

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
    <>
      <MainContainer>
        <ContainerLogo>
          <Image source={imoLogo} style={styles.imoLogo} />
        </ContainerLogo>
        <ContainerData>
          <InputTextContainer>
            <InputText
              placeholder="email"
              textContentType="emailAddress"
              onChangeText={(emailParam) => setEmail(emailParam)}
            />
            <InputText
              placeholder="password"
              secureTextEntry={true}
              textContentType="password"
              onChangeText={(passParam) => setPassword(passParam)}
            />
            <ContainerForgotPassword>
              <TouchableHighlight
                onPress={() => navigation.navigate('ResetPassword')}
              >
                <MinTextRecPw>Recuperar Password</MinTextRecPw>
              </TouchableHighlight>
            </ContainerForgotPassword>
            <ContainerRegisterText>
              <ContainerMinTextSpan>
                <TouchableHighlight
                  onPress={() => navigation.navigate('Register')}
                >
                  <MiniTextSpan style={styles.registerSpan}>
                    Não tem conta? Registar
                  </MiniTextSpan>
                </TouchableHighlight>
              </ContainerMinTextSpan>
            </ContainerRegisterText>
          </InputTextContainer>
          <ButtonLoginContainer>
            <Button title="LOGIN" onPress={handleSignIn} />
          </ButtonLoginContainer>
        </ContainerData>
      </MainContainer>
    </>
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
    width: 180,
    height: 100,
    marginTop: 50,
  },
  btnRegister: {
    paddingTop: 15,
  },
  registerSpan: {
    color: '#40a8c4',
  },
});

export default Login;
