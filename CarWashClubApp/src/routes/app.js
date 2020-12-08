import React from 'react';
import MainScreeen from '../screens/Main';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

const AppRoutes = () => {
  return (
    <>
      <AppStack.Navigator>
        <AppStack.Screen name="MainScreeen" component={MainScreeen} />
      </AppStack.Navigator>
    </>
  );
};

export default AppRoutes;
