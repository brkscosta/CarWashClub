import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/auth';
import { ThemeStore, ThemeContext } from './contexts/theme';
import { ThemeProvider } from 'styled-components';
import Routes from './routes';

const Theme = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

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
      <ThemeStore>
        <Theme>
          <NavigationContainer linking={linking}>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </NavigationContainer>
        </Theme>
      </ThemeStore>
    </>
  );
};

export default App;
