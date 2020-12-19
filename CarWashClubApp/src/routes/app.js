import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Account, Promotions, Vouchers } from '../screens/App';
import { useAuth } from '../contexts/auth';

const Tab = createMaterialBottomTabNavigator();

const AppRoutes = () => {
  useAuth();

  return (
    <>
      <Tab.Navigator
        initialRoute="Promotions"
        activeColor="#e91e63"
        inactiveColor="#41ae"
        barStyle={{
          backgroundColor: '#41aea9',
        }}
        shifting={true}
        backBehavior="history"
      >
        <Tab.Screen
          name="Vouchers"
          component={Vouchers}
          options={{
            tabBarColor: '#e8ffff',
            tabBarLabel: 'Vouchers',
            tabBarIcon: ({ color }) => (
              <Icon name="wallet" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Promotions"
          component={Promotions}
          options={{
            tabBarColor: '#41aea9',
            tabBarLabel: 'Promoções',
            tabBarIcon: ({ color }) => (
              <Icon name="pricetags" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarColor: '#a6f6f1',
            tabBarLabel: 'Conta',
            tabBarIcon: ({ color }) => (
              <Icon name="person" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default AppRoutes;
