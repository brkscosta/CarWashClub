import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { useAuth } from '../../../contexts/auth';
// import { Container } from './styles';

const Account = () => {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };

  return (
    <View>
      <StatusBar backgroundColor="#40a8c4" />
      <Text>Bem vindo {user?.firstName}</Text>
      <Button title="Sign Out" onPress={handleLogout} />
    </View>
  );
};

export default Account;
