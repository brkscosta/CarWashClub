import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { useAuth } from '../../../contexts/auth';
// import { Container } from './styles';

const Promotions = () => {
  const { user } = useAuth();

  return (
    <View>
      <StatusBar backgroundColor="#40a8c4" />
      <Text>Bem vindo {user?.firstName}</Text>
    </View>
  );
};

export default Promotions;
