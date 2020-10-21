import React, { useState } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import {
  MainContainer,
  InputText,
  HeaderContainer,
  InputContainer,
  ButonContainer,
  Scroll,
  TextHeaderContainer,
  TextHeader,
  PasswordStrength,
  CheckboxContainer,
} from './styles';

import { api } from '../../../services/api';
import {
  validateEmail,
  alert,
  passwordValidation,
} from '../../../services/utils';

const Register = ({ navigation }) => {
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
        return alert('Conta já associada', 'Tente recuperar password');
      }
    }
  };

  return (
    <>
      <MainContainer>
        <Scroll>
          <HeaderContainer>
            <TextHeaderContainer>
              <TextHeader fontSize="24" style={styles.signUpFont}>
                Bem-Vindo
              </TextHeader>
              <TextHeader fontSize="20" style={styles.signUpFont}>
                Registe-se para continuar
              </TextHeader>
            </TextHeaderContainer>
          </HeaderContainer>
          <InputContainer>
            <InputText
              required={true}
              placeholder="Primeiro Nome"
              onChangeText={(firstNameParam) => setFirstName(firstNameParam)}
            />
            <InputText
              placeholder="Último Nome"
              onChangeText={(lastNameParam) => setLastName(lastNameParam)}
            />
            <InputText
              placeholder="Email"
              type="email"
              onChangeText={(emailParam) => setEmail(emailParam)}
            />
            <InputText
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
              <Checkbox
                status={isSelected ? 'checked' : 'unchecked'}
                onPress={() => {
                  setSelection(!isSelected);
                }}
              />
              <Text style={styles.rgpd}>
                Aceito o tratamento dos meus dados
              </Text>
            </CheckboxContainer>
          </InputContainer>
          <ButonContainer>
            <Button title="Registar" onPress={handleSignUp} />
          </ButonContainer>
        </Scroll>
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({
  signUpFont: {
    fontFamily: 'Roboto',
  },
  textNone: {
    display: 'none',
  },
  textError: {
    fontSize: 13,
    color: 'red',
    textAlign: 'left',
  },
  textErrorContainer: {
    display: 'flex',
    marginRight: 180,
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  rgpd: {
    marginTop: 8,
    fontSize: 15,
  },
});

export default Register;
