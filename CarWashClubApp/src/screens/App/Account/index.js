import React from 'react';
import {
  View,
  StatusBar,
  TouchableHighlight,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useAuth } from '../../../contexts/auth';
import { Container } from './styles';
import { Header, MainContainer, Button, TextView } from '../../../components';
import { Icon } from 'react-native-elements';

const Account = (user) => {
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <MainContainer backgroundColor="#ffff">
        <View style={styles.headerContainer}>
          <Header
            backgroundColor="#e8ffff"
            height="40%"
            style={styles.shadow}
            width="50%"
          >
            <TouchableHighlight
              underlayColor={'#FFF'}
              style={[styles.profileImgContainer]}
              onPress={() => alert('You Clicked')}
            >
              <Image
                source={{
                  uri:
                    'https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png',
                }}
                style={styles.profileImg}
              />
            </TouchableHighlight>
            <TextView fontSize={23} fontStyle="Bold">
              {user.firstName} {user.lastName}
            </TextView>
            <TextView fontStyle="Thin">{user?.email}</TextView>
            <Button
              onPress={handleLogout}
              title="Sair"
              colorTheme="#e91e63"
              width={20}
              marginTop={10}
            />
          </Header>
        </View>
        <Container>
          <View>
            <TextView color="#b7b5b5">
              ___________________________________________________
            </TextView>
            <View style={styles.containerClicks}>
              <Icon
                brand={true}
                name="person"
                size={26}
                type="ionicon"
                containerStyle={styles.icon}
              />
              <Button
                title="Informações Pessoais"
                width={50}
                colorTheme="#ffff"
                onPress={() => alert('yau')}
              />
            </View>
            <TextView color="#b7b5b5">
              ___________________________________________________
            </TextView>
            <View style={styles.containerClicks}>
              <Icon
                brand={true}
                name="car-sport"
                size={26}
                type="ionicon"
                containerStyle={styles.icon}
              />

              <Button
                title="Meus Carros"
                onPress={() => alert('yau')}
                width={30}
              />
            </View>
            <TextView color="#b7b5b5">
              ___________________________________________________
            </TextView>
            <View style={styles.containerClicks}>
              <Icon
                brand={true}
                name="receipt"
                size={26}
                type="ionicon"
                containerStyle={styles.icon}
              />
              <Button
                title="Termos e Condições"
                onPress={() => alert('yau')}
                width={45}
              />
            </View>
            <TextView color="#b7b5b5">
              ___________________________________________________
            </TextView>
            <View style={styles.containerClicks}>
              <Icon
                brand={true}
                name="lock-closed"
                size={26}
                type="ionicon"
                containerStyle={styles.icon}
              />
              <Button
                title="Privacidade"
                onPress={() => alert('yau')}
                width={30}
              />
            </View>
            <TextView color="#b7b5b5">
              ___________________________________________________
            </TextView>
          </View>
        </Container>
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({
  profileImgContainer: {
    height: 100,
    width: 100,
  },
  profileImg: {
    height: 100,
    width: 100,
    borderRadius: 40,
  },
  shadow: {
    alignItems: 'center',
    shadowColor: 'rgb(65, 174, 169)',
    shadowOffset: {
      width: 6,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  containerClicks: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  icon: {
    position: 'relative',
    top: 15,
  },
});

export default Account;
