//#endregion Imports
import React, { useState, useEffect } from 'react';
import { TextHeader, TextHeaderContainer, TextEmailError } from './styles';
import { StyleSheet } from 'react-native';
import {
  Scroll,
  Header,
  MainContainer,
  Button,
  FooterContainer,
} from '../../../components';
import { api } from '../../../services/api';
import { validateEmail, alert } from '../../../services/utils';
import { Icon, Input } from 'react-native-elements';
import { InputContainer } from './styles';
//#endregion

const RequestToChangePassword = ({ route, navigation }) => {
  let [email, setEmail] = useState('');
  let [confirmEmail, setConfirmEmail] = useState('');

  useEffect(() => {
    const { isHeaderActive } = route.params;
    navigation.setOptions({
      headerShown: isHeaderActive,
      title: 'Recuperar Password',
      headerTintColor: '#fff',
      headerLeft: (props) => (
        <Icon
          iconStyle={styles.icon}
          name="chevron-circle-left"
          type="font-awesome"
          {...props}
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      ),
    });
  }, [route, navigation]);

  const handleChangePassword = async () => {
    let userData = {
      email: email,
    };
    try {
      let response = await api.post('/auth/forgot_password', userData);
      if (response.status === 200) {
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2200);
        return alert(
          'Email de recuperação enviado!',
          'Notificação enviada com sucesso. Por favor abra o seu email e siga os passos'
        );
      }
    } catch (error) {
      if (error.errorType === 'errorForgot') {
        return alert(
          'Error ao recuperar password',
          'indentificamos um erro interno ao mudar a sua password'
        );
      } else if (error.errorType === 'cantSendNotification') {
        return alert(
          'Não foi possível enviar o email',
          'Infelizmente não foi possível enviar o email. Tente mais tarde'
        );
      }
    }
  };

  return (
    <MainContainer>
      <Header>
        <TextHeaderContainer>
          <TextHeader fontSize={18}>
            Ponha os dados abaixo para recuperar a sua password
          </TextHeader>
        </TextHeaderContainer>
      </Header>
      <Scroll>
        <InputContainer>
          <Input
            inputStyle={{ fontFamily: 'Roboto-Medium' }}
            autoCapitalize="none"
            autoCorrect={false}
            rightIcon={
              <Icon name="mail" size={26} type="ionicon" color="#41aea9" />
            }
            required={true}
            placeholder="example@example.com"
            onChangeText={(emailParam) => setEmail(emailParam)}
          />
          {!validateEmail(email) && email.length > 0 && (
            <TextEmailError>Este email não é válido</TextEmailError>
          )}
          <Input
            inputStyle={{ fontFamily: 'Roboto-Medium' }}
            autoCapitalize="none"
            autoCorrect={false}
            rightIcon={
              <Icon name="mail" size={26} type="ionicon" color="#41aea9" />
            }
            required={true}
            placeholder="example@example.com"
            onChangeText={(emailParam) => setConfirmEmail(emailParam)}
          />
          {email !== confirmEmail && (
            <TextEmailError>Os email's não são iguais</TextEmailError>
          )}
        </InputContainer>
      </Scroll>
      <FooterContainer>
        <Button
          title="Recuperar Password"
          onPress={handleChangePassword}
          fontSize={22}
          colorTheme="#41aea9"
        />
      </FooterContainer>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
    marginTop: 10,
    color: '#FFF',
  },
});

export default RequestToChangePassword;
