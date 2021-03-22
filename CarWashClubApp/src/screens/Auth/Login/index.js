//#region Imports
import React, { useState, useContext } from 'react';
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
import { ThemeContext } from '../../../contexts/theme';
//#endregion

const Login = ({ navigation }) => {
  let { signIn } = useAuth();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [secureTextEntry, setSecureTextEntry] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme);

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
      <Header
        backgroundColor={
          theme.title === 'light' ? theme.colors.primary : theme.colors.primary
        }
      >
        <ImageContainer>
          <Image source={imoLogo} style={styles.imoLogo} />
        </ImageContainer>
      </Header>
      <InputContainer backgroundColor="#FFF">
        <Scroll>
          <LoginContainer>
            <Input
              inputStyle={{ fontFamily: 'Roboto-Medium' }}
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={{
                width: wp('100%'),
              }}
              placeholder="email@email.com"
              textContentType="emailAddress"
              rightIcon={
                <Icon
                  name="mail"
                  size={26}
                  type="ionicon"
                  color={theme.colors.iconColor}
                />
              }
              onChangeText={(emailParam) => setEmail(emailParam)}
              errorMessage={
                !validateEmail(email) &&
                email.length > 0 && (
                  <TextView color="red" fontSize={15}>
                    Formato de email incorreto
                  </TextView>
                )
              }
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
                    color={theme.colors.iconColor}
                  />
                ) : (
                  <Icon
                    brand={true}
                    name="eye-off"
                    size={26}
                    type="ionicon"
                    onPress={onPassPress}
                    color={theme.colors.iconColor}
                  />
                )
              }
              onChangeText={(emailParam) => setPassword(emailParam)}
              secureTextEntry={secureTextEntry}
            />

            <ContainerForgotPassword>
              <TouchableHighlight
                underlayColor="#FFF"
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
              marginTop={25}
              colorTheme="#0071ba"
            />
            <ContainerRegisterText>
              <TouchableHighlight
                underlayColor="#FFFF"
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
  imoLogo: {
    width: 150,
    height: 80,
    backgroundColor: '#0071ba',
  },
});

export default Login;
