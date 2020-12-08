import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { useAuth } from '../../contexts/auth';

//TODO Next part of the project, build the main screen

const MainScreeen = () => {
  const { user, signOut } = useAuth();

  function handleLogout() {
    signOut();
  }

  return (
    <>
      <StatusBar backgroundColor="#40a8c4" />
      <View>
        <Text>Bem vindo {user?.firstName}</Text>
        <Button title="Sign Out" onPress={handleLogout} />
      </View>
    </>
  );
};

export default MainScreeen;
