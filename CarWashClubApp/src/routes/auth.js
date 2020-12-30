import React, { useEffect } from 'react';
import { StatusBar, Text } from 'react-native';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import ResetPassword from '../screens/Auth/ResetPassword';
import RequestToChangePassword from '../screens/Auth/RequestToChangePassword';
import { createStackNavigator } from '@react-navigation/stack';
import Orientation from 'react-native-orientation';
import { useAuth } from '../contexts/auth';

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  useAuth();
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        showHideTransition="slide"
        animated={true}
        backgroundColor="#0071ba"
      />
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
          safeAreaInsets: { top: 4 },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#0071ba',
          },
        }}
      >
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
        <AuthStack.Screen
          name="RequestToChangePassword"
          component={RequestToChangePassword}
        />
        <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
      </AuthStack.Navigator>
    </>
  );
};

export default AuthRoutes;
