//#endregion Imports
import React, { useState, useEffect } from 'react';
import { TextHeader, TextHeaderContainer } from './styles';
import { StyleSheet } from 'react-native';
import {
  Scroll,
  Header,
  MainContainer,
  Button,
  FooterContainer,
  TextView,
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
      title: (
        <TextView fontStyle="Thin" fontSize="25" color="#FFF">
          Recuperar Password
        </TextView>
      ),
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
      let { message } = error.response.data;
      if (message.id === 10) {
        return alert(
          'Error ao recuperar password',
          'indentificamos um erro interno ao mudar a sua password'
        );
      } else if (message.id === 6) {
        return alert(
          'Não foi possível enviar o email',
          'Infelizmente não foi possível enviar o email. Tente mais tarde'
        );
      }
    }
  };

  return (
    <MainContainer>
      <Header backgroundColor="#0071ba">
        <TextHeaderContainer>
          <TextHeader fontSize={22}>
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
            rightIcon={<Icon name="mail" size={26} type="ionicon" />}
            required={true}
            placeholder="example@example.com"
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
            autoCapitalize="none"
            autoCorrect={false}
            rightIcon={<Icon name="mail" size={26} type="ionicon" />}
            required={true}
            placeholder="example@example.com"
            onChangeText={(emailParam) => setConfirmEmail(emailParam)}
            errorMessage={
              email !== confirmEmail &&
              confirmEmail.length > 0 && (
                <TextView color="red" fontSize={15}>
                  Os email's não são iguais
                </TextView>
              )
            }
          />
        </InputContainer>
      </Scroll>
      <FooterContainer>
        <Button
          title="Recuperar Password"
          onPress={handleChangePassword}
          fontSize={22}
          colorTheme="#0071ba"
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
