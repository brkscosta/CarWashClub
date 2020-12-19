import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { api, setClientToken } from '../services/api';
import { alert } from '../services/utils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      let storageUser = await AsyncStorage.getItem('@CarWashClub:user');
      let storageToken = await AsyncStorage.getItem('@CarWashClub:token');

      if (storageUser && storageToken) {
        setClientToken(storageToken);
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn(email, password) {
    let data = {
      email: email,
      password: password,
    };

    try {
      let response = await api.post('/auth/authenticate', data);

      setUser(response);

      setClientToken(response.token);

      await AsyncStorage.setItem(
        '@CarWashClub:user',
        JSON.stringify(response.data.user)
      );
      await AsyncStorage.setItem('@CarWashClub:token', response.data.token);
      await AsyncStorage.setItem('@CarWashClub:alredyLoggedIn', true);
    } catch (err) {
      console.log(err.message);
      let { errorType } = err.response.data;
      if (errorType === 'missingPwOREm') {
        return alert('Password ou Email vazios', 'Preencha o email e password');
      }
      if (errorType === 'invalidPw') {
        return alert('Password Inválida', 'A sua password não está correta');
      }
      if (errorType === 'userNotFound') {
        return alert(
          'Utilizador não registado',
          'Este utilizador não está registado'
        );
      }
    }
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  let context = useContext(AuthContext);

  return context;
}
