import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

// import { Container } from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  MainContainer,
  Header,
  Button,
  InputContainer,
  FooterContainer,
  TextView,
} from '../../../components';
import { Input, Icon } from 'react-native-elements';
import { api } from '../../../services/api';
import { alert, passwordCheck, validateEmail } from '../../../services/utils';

const ResetPassword = ({ route, navigation }) => {
  let [token, setToken] = useState('');
  let [password, setPassword] = useState('');
  let [email, setEmail] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  let [secureTextEntry, setSecureTextEntry] = useState(true);

  const onPassPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleChangeConfirmPassword = async () => {
    try {
      let data = {
        email: email,
        password: password,
        token: token,
      };
      let response = await api.post('/auth/reset_password', data);
      if (response.status === 200) {
        alert('Alteração concluída!', 'Por favor volte a fazer login.');
        setTimeout(() => {
          return navigation.navigate('Login');
        }, 1000);
      }
    } catch (error) {
      let { message } = error.response.data;
      if (message.id === 1) {
        return alert(
          'Utilizador não encontrado!',
          'Por favor confirme que colodou o token correto.'
        );
      } else if (message.id === 9) {
        return alert(
          'Token Inválido!',
          'Esse token provavelmente já expirou, por favor repita novamente os mesmos passos.'
        );
      } else if (message.id === 8) {
        return alert(
          'Token Incorreto!',
          'Verifique se digitou o token como está no email.'
        );
      } else if (message.id === 10) {
        return alert(
          'Erro Servidor :c',
          'Erro interno interno no servidor, por favor tente mais tarde'
        );
      }
    }
  };

  return (
    <>
      <MainContainer>
        <Header backgroundColor="#0071ba">
          <View style={styles.headerContainer}>
            <TextView fontSize={25} fontStyle="Light">
              Preencha os campos abaixo para renovar a sua palavra-passe
            </TextView>
          </View>
        </Header>
        <InputContainer>
          <Input
            inputStyle={{ fontFamily: 'Roboto-Medium' }}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="email@email.com"
            containerStyle={{
              width: wp('100%'),
            }}
            rightIcon={<Icon name="mail" size={26} type="ionicon" />}
            onChangeText={(emailParam) => {
              setEmail(emailParam);
            }}
            errorMessage={
              !validateEmail(email) &&
              email.length > 0 && (
                <TextView color="red" fontSize={15}>
                  Formato de email não suportado
                </TextView>
              )
            }
          />
          <Input
            inputStyle={{ fontFamily: 'Roboto-Medium' }}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="token"
            containerStyle={{
              width: wp('100%'),
            }}
            rightIcon={<Icon name="key" size={26} type="ionicon" />}
            onChangeText={(tokenParam) => {
              setToken(tokenParam);
            }}
            errorMessage={
              token.length > 12 && (
                <TextView color="red" fontSize={15}>
                  O token não contém mais que 12 caracteres
                </TextView>
              )
            }
          />
          <Input
            inputStyle={{ fontFamily: 'Roboto-Medium' }}
            autoCorrect={false}
            autoCapitalize="none"
            containerStyle={{
              width: wp('100%'),
            }}
            placeholder="password"
            rightIcon={
              secureTextEntry ? (
                <Icon
                  name="lock-closed"
                  size={26}
                  type="ionicon"
                  onPress={onPassPress}
                />
              ) : (
                <Icon
                  brand={true}
                  name="eye-off"
                  size={26}
                  type="ionicon"
                  onPress={onPassPress}
                />
              )
            }
            onChangeText={(passwordParam) => setPassword(passwordParam)}
            secureTextEntry={secureTextEntry}
            errorMessage={passwordCheck(password)}
          />
          <Input
            inputStyle={{ fontFamily: 'Roboto-Medium' }}
            autoCorrect={false}
            autoCapitalize="none"
            containerStyle={{
              width: wp('100%'),
              fontFamily: 'Roboto-Medium',
            }}
            placeholder="confirme a password"
            rightIcon={
              secureTextEntry ? (
                <Icon
                  name="eye"
                  size={26}
                  type="ionicon"
                  onPress={onPassPress}
                />
              ) : (
                <Icon
                  brand={true}
                  name="eye-off"
                  size={26}
                  type="ionicon"
                  onPress={onPassPress}
                />
              )
            }
            onChangeText={(passwordParam) => setConfirmPassword(passwordParam)}
            secureTextEntry={secureTextEntry}
            errorMessage={
              password !== confirmPassword &&
              confirmPassword.length > 0 && (
                <TextView color="red">As passwords não são iguais!</TextView>
              )
            }
          />
        </InputContainer>
        <FooterContainer>
          {token.length === 0 ||
          email.length === 0 ||
          password.length === 0 ||
          confirmPassword.length === 0 ||
          confirmPassword !== password ? (
            <View />
          ) : (
            <Button
              title="Mudar Password"
              onPress={handleChangeConfirmPassword}
              fontSize={22}
              colorTheme="#0071ba"
            />
          )}
        </FooterContainer>
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    bottom: 10,
    width: 'auto',
    left: 25,
  },
});

export default ResetPassword;
