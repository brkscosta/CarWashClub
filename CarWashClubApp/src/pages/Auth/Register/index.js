import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

import {
  Scroll,
  TextHeaderContainer,
  TextHeader,
  PasswordStrength,
  CheckboxContainer,
} from './styles';

import {
  Header,
  MainContainer,
  Input,
  Button,
  FooterContainer,
  InputContainer,
} from '../../../components';
import { Icon, CheckBox } from 'react-native-elements';
import { api } from '../../../services/api';

import {
  validateEmail,
  alert,
  passwordValidation,
} from '../../../services/utils';

const Register = ({ route, navigation }) => {
  useEffect(() => {
    const { isHeaderActive } = route.params;
    navigation.setOptions({
      headerShown: isHeaderActive,
      title: 'Registo',
      headerStyle: { backgroundColor: '#41aea9' },
      headerTintColor: '#fff',
      headerTitleStyle: {
        textAlign: 'center',
        marginTop: 10,
        marginRight: 50,
      },
      headerLeft: (props) => (
        <Icon
          iconStyle={{
            marginLeft: 10,
            marginTop: 10,
            color: '#FFF',
          }}
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

  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [rgpd, setRgpd] = useState(false);
  let [isSelected, setSelection] = React.useState(false);

  let handleSignUp = async () => {
    let userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      rgpd: rgpd,
    };

    if (!validateEmail(email)) {
      return alert('Erro Email', 'Email não tem o formato certo');
    } else if (!firstName || !lastName) {
      return alert(
        'Campos não preenchidos',
        'Por favor preencha o primeiro e segundo nome'
      );
    } else if (!password) {
      return alert(
        'Campos não preenchidos',
        'Por favor preencha a sua password'
      );
    }

    try {
      await api.post('/auth/register', userData);
      alert(
        'Conta Criada',
        'Sua conta foi criada com sucesso, pode fazer login'
      );
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (error) {
      let { errorType } = error.response.data;
      if (errorType === 'userAlredyTaken') {
        return alert('Email já associada', 'Tente recuperar a sua password!');
      }
    }
  };

  return (
    <>
      <MainContainer>
        <Scroll>
          <Header>
            <TextHeaderContainer>
              <TextHeader fontSize="24">Bem-Vindo</TextHeader>
              <TextHeader fontSize="20" style={styles.signUpFont}>
                Registe-se para continuar
              </TextHeader>
            </TextHeaderContainer>
          </Header>
          <InputContainer height={100}>
            <Input
              required={true}
              placeholder="Primeiro Nome"
              onChangeText={(firstNameParam) => setFirstName(firstNameParam)}
              fontStyle="LightItalic"
            />
            <Input
              required={true}
              placeholder="Último Nome"
              onChangeText={(lastNameParam) => setLastName(lastNameParam)}
              fontStyle="LightItalic"
            />
            <Input
              fontStyle="LightItalic"
              required={true}
              placeholder="Email"
              onChangeText={(emailParam) => setEmail(emailParam)}
            />
            <Input
              fontStyle="LightItalic"
              required={true}
              placeholder="Password"
              secureTextEntry={true}
              textContentType="password"
              onChangeText={(passwordParam) => setPassword(passwordParam)}
            />
            {!passwordValidation(password) ? (
              <>
                <PasswordStrength>
                  A password não cumpre os requisitos mínimos de segurança: Tem
                  de ter 8 a 15 caracteres, 1 caracter maiuscúlo e minúsculo, 1
                  dígito, 1 caracter especial.
                </PasswordStrength>
              </>
            ) : (
              <Text> {''}</Text>
            )}
            <CheckboxContainer>
              <CheckBox
                containerStyle={{}}
                center={true}
                checked={isSelected}
                title="Aceito os tratamento dos meu dados ao fazer o registo"
                onPress={() =>
                  isSelected ? setSelection(false) : setSelection(true)
                }
              />
            </CheckboxContainer>
          </InputContainer>
          <FooterContainer
            paddingTop={4}
            paddingBottom={8}
            marginTop={97}
            marginLeft={10}
          >
            <Button
              title="Registar"
              onPress={handleSignUp}
              fontSize={22}
              borderRadius={10}
            />
          </FooterContainer>
        </Scroll>
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({
  rgpd: {
    marginTop: 8,
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
});

export default Register;
