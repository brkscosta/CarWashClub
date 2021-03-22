import React, { useEffect, useState, useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Account, Promotions, Vouchers, Map } from '../screens/App';
import { ScrollView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ThemeContext } from '../contexts/theme';

const Tab = createMaterialBottomTabNavigator();

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const AppRoutes = () => {
  let [user, setUser] = useState(null);
  let [refreshing, setRefreshing] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (!user) {
      onRefresh();
    } else {
      return;
    }
  }, [onRefresh, refreshing, user]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    let storageUser = await AsyncStorage.getItem('@CarWashClub:user');
    setUser(JSON.parse(storageUser));
    return wait(2000).then(() => setRefreshing(false));
  }, []);

  const Promo = (props) => <Promotions {...user} {...props} />;

  const UserAccount = (props) => <Account {...user} {...props} />;

  const GoogleMap = (props) => <Map {...props} />;

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        showHideTransition="slide"
        animated={true}
        backgroundColor={theme.colors.primary}
      />

      <Tab.Navigator
        initialRoute="Promotions"
        activeColor={theme.colors.text}
        inactiveColor="#FFF"
        barStyle={{
          backgroundColor: theme.colors.primary,
        }}
        shifting={true}
        backBehavior="history"
      >
        <Tab.Screen
          name="Vouchers"
          component={Vouchers}
          options={{
            tabBarLabel: 'Vouchers',
            tabBarIcon: ({ color }) => (
              <>
                <Icon name="wallet" color={color} size={26} />
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Promotions"
          component={Promo}
          options={{
            tabBarLabel: 'Promoções',
            tabBarIcon: ({ color }) => (
              <>
                <Icon name="pricetags" color={color} size={26} />
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={GoogleMap}
          options={{
            tabBarLabel: 'Mapa',
            tabBarIcon: ({ color }) => (
              <>
                <Icon name="map" color={color} size={26} />
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={UserAccount}
          options={{
            tabBarLabel: 'Conta',
            tabBarIcon: ({ color }) => (
              <>
                <Icon name="person" color={color} size={26} />
              </>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default AppRoutes;
