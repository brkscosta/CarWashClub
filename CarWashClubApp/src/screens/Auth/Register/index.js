//#region Imports
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  TextHeaderContainer,
  TextHeader,
  CheckboxContainer,
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
  TextView,
} from '../../../components';
import { Icon, CheckBox, Input } from 'react-native-elements';
import { api } from '../../../services/api';
import {
  validateEmail,
  alert,
  passwordCheck,
  passwordValidation,
} from '../../../services/utils';
import { View } from 'react-native';

//#endregion

const Register = ({ route, navigation }) => {
  useEffect(() => {
    const { isHeaderActive } = route.params;
    navigation.setOptions({
      headerShown: isHeaderActive,
      title: (
        <TextView fontStyle="Thin" fontSize="30" color="#FFF">
          Registo
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
    if (
      email.length !== 0 &&
      password.length !== 0 &&
      firstName.length !== 0 &&
      lastName.length !== 0 &&
      rgpd &&
      !passwordCheck(password) &&
      validateEmail(email)
    ) {
      return (
        <Button
          title="Registar"
          onPress={handleSignUp}
          fontSize={22}
          colorTheme="#0071ba"
        />
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
        let { message } = error.response.data;
        if (message.id === 2) {
          return alert('Email já associado', 'Tente recuperar a sua password!');
        }
      }
    }
  };

  return (
    <>
      <MainContainer>
        <Header height={10} backgroundColor="#0071ba">
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
              inputStyle={{ fontFamily: 'Roboto-Medium' }}
              rightIcon={<Icon name="person" size={26} type="ionicon" />}
              required={true}
              placeholder="Primeiro Nome"
              onChangeText={(firstNameParam) => setFirstName(firstNameParam)}
              errorMessage={
                !firstName.match(/^[[A-Za-z\u00C0-\u017F\s]+$/) &&
                firstName.length > 2 && (
                  <TextView color="red" fontSize={15}>
                    Este campo só aceita letras
                  </TextView>
                )
              }
            />

            <Input
              inputStyle={{ fontFamily: 'Roboto-Medium' }}
              rightIcon={<Icon name="person" size={26} type="ionicon" />}
              required={true}
              placeholder="Último Nome"
              onChangeText={(lastNameParam) => setLastName(lastNameParam)}
              errorMessage={
                !lastName.match(/^[[A-Za-z\u00C0-\u017F\s]+$/) &&
                lastName.length > 2 && (
                  <TextView color="red" fontSize={15}>
                    Este campo só aceita letras
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
              onChangeText={(emailParam) => setPassword(emailParam)}
              secureTextEntry={secureTextEntry}
              errorMessage={passwordCheck(password)}
            />
            <CheckboxContainer>
              <CheckBox
                center={true}
                checked={rgpd}
                title={
                  <Text style={{ fontFamily: 'Roboto-Medium' }}>
                    Aceito os tratamento dos meu dados ao fazer o registo
                  </Text>
                }
                onPress={() => (rgpd ? setRgpd(false) : setRgpd(true))}
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }}
              />
            </CheckboxContainer>
          </InputContainerRegister>
        </Scroll>
        <FooterContainer>{isDataValidated()}</FooterContainer>
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
