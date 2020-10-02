import React from "react";
import { View, Text, Button, StatusBar } from "react-native";
import { useAuth } from "../../contexts/auth";

const MainScreeen = () => {
  const { user, signOut } = useAuth();

  function handleLogout() {
    signOut();
  }

  return (
    <>
      <StatusBar />
      <View>
        <Text>Bem vindo {user?.name}</Text>
        <Button title="Sign Out" onPress={handleLogout}></Button>
      </View>
    </>
  );
};

export default MainScreeen;
