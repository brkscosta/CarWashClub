import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';

const App = () => {
  const config = {
    screens: {
      Login: 'login',
      ResetPassword: 'reset_password',
      Register: 'register',
      RequestToChangePassword: 'request_to_change_password',
      Account: 'account',
    },
  };

  const linking = {
    enable: true,
    prefixes: ['carwashclub://', 'http://carwashclub'],
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
