import React from "react";
import { View, Button, StyleSheet } from "react-native";

import {
  ContainerWelcome,
  StyledText,
  InputText,
  ContainerData,
  MiniTextSpan,
} from "./styles";

import { useAuth } from "../../../contexts/auth";

const Login = ({ navigation }) => {
  let { signIn } = useAuth();

  async function handleSignIn() {
    signIn();
  }

  return (
    <>
      <ContainerWelcome>
        <StyledText>
          Bem Vindo. Por favor faça Login ou faça o seu registo
        </StyledText>
      </ContainerWelcome>
      <ContainerData>
        <StyledText>LOGIN</StyledText>
        <InputText placeholder="email"></InputText>
        <InputText placeholder="password"></InputText>
        <MiniTextSpan>Não tem conta?</MiniTextSpan>
        <Button title="Login" onPress={handleSignIn} />
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </ContainerData>
    </>
  );
};

export default Login;
