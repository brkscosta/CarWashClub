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
  let [isDataValidated, setIsDataValidated] = useState(false);

  const passwordCheck = () => {
    if (password === '') {
      return <Text>{''}</Text>;
    }
    if (!password.match(/([0-9])+$/)) {
      return (
        <>
          <PasswordStrength>Deve conter um número</PasswordStrength>
        </>
      );
    }
    if (password.length < 8) {
      return (
        <PasswordStrength>A password tem de ter 8 caracteres.</PasswordStrength>
      );
    }
    if (!password.match(/(?=.*[A-Z])/)) {
      return (
        <>
          <PasswordStrength>Deve conter letra maiuscula</PasswordStrength>
        </>
      );
    }
  };

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
        'Campo primeiro e segundo nome',
        'Por favor preencha o primeiro e segundo nome'
      );
    } else if (!password) {
      return alert(
        'Campo password não preenchido',
        'Por favor preencha a sua password'
      );
    } else if (rgpd === false) {
      return alert(
        'RGPD não preenchido',
        'Por favor permita o tratamento dos seus dados'
      );
    } else {
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
    }
  };

  return (
    <>
      <MainContainer>
        <Scroll>
          <Header>
            <TextHeaderContainer>
              <TextHeader fontSize="24">Bem-Vindo</TextHeader>
              <TextHeader fontSize="20">Registe-se para continuar</TextHeader>
            </TextHeaderContainer>
          </Header>
          <InputContainer height={100}>
            <Input
              fontStyle="BoldItalic"
              required={true}
              placeholder="Primeiro Nome"
              onChangeText={(firstNameParam) => setFirstName(firstNameParam)}
            />
            {!firstName.match(/^[a-zA-Z]+$/) && firstName.length > 2 && (
              <PasswordStrength>Este campo só aceita letras</PasswordStrength>
            )}
            <Input
              fontStyle="BoldItalic"
              required={true}
              placeholder="Último Nome"
              onChangeText={(lastNameParam) => setLastName(lastNameParam)}
            />
            {!lastName.match(/^[a-zA-Z]+$/) && lastName.length > 2 && (
              <PasswordStrength>Este campo só aceita letras</PasswordStrength>
            )}
            <Input
              fontStyle="BoldItalic"
              required={true}
              placeholder="Email"
              onChangeText={(emailParam) => setEmail(emailParam)}
            />
            <Input
              fontStyle="BoldItalic"
              required={true}
              secureTextEntry={true}
              textContentType="password"
              placeholder="password"
              onChangeText={(passwordParam) => setPassword(passwordParam)}
            />
            {passwordCheck()}
            <CheckboxContainer>
              <CheckBox
                center={true}
                checked={rgpd}
                title="Aceito os tratamento dos meu dados ao fazer o registo"
                onPress={() => (rgpd ? setRgpd(false) : setRgpd(true))}
              />
            </CheckboxContainer>
          </InputContainer>
          <FooterContainer paddingTop={4} marginTop={95}>
            {isDataValidated && (
              <Button
                title="Registar"
                onPress={handleSignUp}
                fontSize={22}
                borderRadius={10}
                colorTheme="#41aea9"
                width={350}
              />
            )}
          </FooterContainer>
        </Scroll>
      </MainContainer>
    </>
  );
};

export default Register;
