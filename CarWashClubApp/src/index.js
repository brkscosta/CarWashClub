import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';

const App = () => {
  const config = {
    screens: {
      Login: 'Login',
      ResetPassword: 'ResetPassword',
      Register: 'Register',
      RequestToChangePassword: 'RequestToChangePassword',
    },
  };

  const linking = {
    enable: true,
    prefixes: ['http://', 'carwashclub://'],
    config,
  };

  return (
    <>
      <NavigationContainer linking={linking}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
