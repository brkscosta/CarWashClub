import React, { useEffect } from 'react';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import ResetPassword from '../screens/Auth/ResetPassword';
import RequestToChangePassword from '../screens/Auth/RequestToChangePassword';
import { createStackNavigator } from '@react-navigation/stack';
import Orientation from 'react-native-orientation';

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);
  return (
    <>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
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
