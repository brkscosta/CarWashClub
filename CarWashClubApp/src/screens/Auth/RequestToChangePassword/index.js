/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { TextHeader, TextHeaderContainer, TextEmailError } from './styles';
import { StyleSheet } from 'react-native';
import {
  Scroll,
  Header,
  MainContainer,
  Input,
  Button,
  FooterContainer,
  InputContainer,
} from '../../../components';
import { api } from '../../../services/api';
import { validateEmail, alert } from '../../../services/utils';
import { Icon } from 'react-native-elements';

const RequestToChangePassword = ({ route, navigation }) => {
  let [email, setEmail] = useState('');
  let [confirmEmail, setConfirmEmail] = useState('');

  useEffect(() => {
    const { isHeaderActive } = route.params;
    navigation.setOptions({
      headerShown: isHeaderActive,
      title: 'Recuperar Password',
      headerStyle: { backgroundColor: '#41aea9' },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        marginTop: 10,
        marginRight: 50,
      },
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
      <Scroll>
        <Header>
          <TextHeaderContainer>
            <TextHeader fontSize={18}>
              Ponha os dados abaixo para recuperar a sua password
            </TextHeader>
          </TextHeaderContainer>
        </Header>
        <InputContainer>
          <Input
            fontStyle="BoldItalic"
            placeholder="email@example.com"
            onChangeText={(emailParam) => setEmail(emailParam)}
            required={true}
          />
          {!validateEmail(email) && email.length > 0 && (
            <TextEmailError>Este email não é válido</TextEmailError>
          )}
          <Input
            fontStyle="BoldItalic"
            required={true}
            placeholder="Confirmar email"
            onChangeText={(confirmEmailParam) =>
              setConfirmEmail(confirmEmailParam)
            }
          />
          {email !== confirmEmail && (
            <TextEmailError>Os email's não são iguais</TextEmailError>
          )}
        </InputContainer>
        <FooterContainer paddingTop={4} marginTop={40}>
          <Button
            title="Recuperar Password"
            onPress={handleChangePassword}
            fontSize={22}
            borderRadius={10}
            colorTheme="#41aea9"
            width={350}
          />
        </FooterContainer>
      </Scroll>
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
