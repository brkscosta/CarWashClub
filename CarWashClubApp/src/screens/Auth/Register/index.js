//#region Imports
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  TextHeaderContainer,
  TextHeader,
  PasswordStrength,
  CheckboxContainer,
  RegisterInput,
  InputContainerRegister,
} from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Scroll,
  Header,
  MainContainer,
  Button,
  FooterContainer,
} from '../../../components';
import { Icon, CheckBox, Input } from 'react-native-elements';
import { api } from '../../../services/api';
import { validateEmail, alert, passwordCheck } from '../../../services/utils';

//#endregion

const Register = ({ route, navigation }) => {
  useEffect(() => {
    const { isHeaderActive } = route.params;
    navigation.setOptions({
      headerShown: isHeaderActive,
      title: 'Registo',
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

  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [rgpd, setRgpd] = useState(false);
  let [secureTextEntry, setSecureTextEntry] = useState(true);

  const onPassPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const isDataValidated = () => {
    return !email && !password && !firstName && !lastName && !rgpd;
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
        let { message } = error.response.data;
        if (message.id === 2) {
          return alert('Email já associada', 'Tente recuperar a sua password!');
        }
      }
    }
  };

  return (
    <>
      <MainContainer>
        <Header height={10}>
          <TextHeaderContainer>
            <TextHeader fontSize="24" adjustsFontSizeToFit={true}>
              Bem-Vindo
            </TextHeader>
            <TextHeader fontSize="20">Registe-se para continuar</TextHeader>
          </TextHeaderContainer>
        </Header>
        <Scroll>
          <InputContainerRegister>
            <Input
              rightIcon={
                <Icon name="person" size={26} type="ionicon" color="#41aea9" />
              }
              required={true}
              placeholder="Primeiro Nome"
              onChangeText={(firstNameParam) => setFirstName(firstNameParam)}
            />
            {!firstName.match(/^[A-Za-z\u00C0-\u017F\s]+$/) &&
              firstName.length > 2 && (
                <PasswordStrength>Este campo só aceita letras</PasswordStrength>
              )}
            <Input
              rightIcon={
                <Icon name="person" size={26} type="ionicon" color="#41aea9" />
              }
              required={true}
              placeholder="Último Nome"
              onChangeText={(lastNameParam) => setLastName(lastNameParam)}
            />
            {!lastName.match(/^[[A-Za-z\u00C0-\u017F\s]+$/) &&
              lastName.length > 2 && (
                <PasswordStrength>Este campo só aceita letras</PasswordStrength>
              )}
            <Input
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
              <PasswordStrength>
                Formato de email não suportado
              </PasswordStrength>
            )}
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
            {passwordCheck(password)}
            <CheckboxContainer>
              <CheckBox
                center={true}
                checked={rgpd}
                title="Aceito os tratamento dos meu dados ao fazer o registo"
                onPress={() => (rgpd ? setRgpd(false) : setRgpd(true))}
                containerStyle={{
                  borderStyle: 'dashed',
                }}
              />
            </CheckboxContainer>
          </InputContainerRegister>
        </Scroll>
        <FooterContainer>
          {isDataValidated && (
            <Button
              title="Registar"
              onPress={handleSignUp}
              fontSize={22}
              colorTheme="#41aea9"
            />
          )}
        </FooterContainer>
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
    marginTop: 10,
    color: '#FFF',
  },
});

export default Register;
