//#region Imports
import React, { useState } from 'react';
import { StyleSheet, Image, TouchableHighlight } from 'react-native';
import { imoLogo } from '../../../assets/images/';
import { validateEmail, alert } from '../../../services/utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  ContainerRegisterText,
  ContainerForgotPassword,
  LoginContainer,
  ImageContainer,
} from './styles';

import {
  MainContainer,
  Scroll,
  Button,
  InputContainer,
  Header,
  FooterContainer,
  TextView,
} from '../../../components';
import { Input, Icon } from 'react-native-elements';
import { useAuth } from '../../../contexts/auth';
//#endregion

const Login = ({ navigation }) => {
  let { signIn } = useAuth();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSignIn = async () => {
    if (validateEmail(email)) {
      signIn(email, password);
    } else {
      alert('Email não válido', 'Por favor corrija o seu email');
    }
  };

  const onPassPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <MainContainer>
      <Header backgroundColor={'#41aea9'}>
        <ImageContainer>
          <Image source={imoLogo} style={styles.imoLogo} />
        </ImageContainer>
      </Header>
      <InputContainer>
        <Scroll>
          <LoginContainer>
            <Input
              inputStyle={{ fontFamily: 'Roboto-Regular' }}
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={{
                width: wp('100%'),
              }}
              placeholder="email@email.com"
              textContentType="emailAddress"
              rightIcon={
                <Icon name="mail" size={26} type="ionicon" color="#41aea9" />
              }
              onChangeText={(emailParam) => setEmail(emailParam)}
            />
            <Input
              inputStyle={{ fontFamily: 'Roboto-Medium' }}
              containerStyle={{
                width: wp('100%'),
              }}
              placeholder="password"
              rightIcon={
                secureTextEntry ? (
                  <Icon
                    name="eye"
                    size={26}
                    type="ionicon"
                    onPress={onPassPress}
                    color="#41aea9"
                  />
                ) : (
                  <Icon
                    brand={true}
                    name="eye-off"
                    size={26}
                    type="ionicon"
                    onPress={onPassPress}
                    color="#e0e045"
                  />
                )
              }
              onChangeText={(emailParam) => setPassword(emailParam)}
              secureTextEntry={secureTextEntry}
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
              colorTheme="#41aea9"
              marginTop={25}
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
        </Scroll>
      </InputContainer>
      <FooterContainer />
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
