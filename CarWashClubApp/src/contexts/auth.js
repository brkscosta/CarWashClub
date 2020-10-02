import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import * as auth from "../services/auth";
import api from "../services/api";
import SplashScreen from "react-native-splash-screen";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      let storageUser = await AsyncStorage.getItem("@CarWashClub:user");
      let storageToken = await AsyncStorage.getItem("@CarWashClub:token");

      if (storageUser && storageToken) {
        api.defaults.headers["Authorization"] = `Bearer ${storageToken}`;
        setUser(JSON.parse(storageUser));
        setLoading(false);
        SplashScreen.hide();
      }
    }
    loadStorageData();
  }, []);

  async function signIn() {
    let response = await auth.signIn();

    setUser(response.user);

    api.defaults.headers["Authorization"] = `Bearer ${response.token}`;

    //TODO: Trocar asyncstorage por localStorage
    await AsyncStorage.setItem(
      "@CarWashClub:user",
      JSON.stringify(response.user)
    );
    await AsyncStorage.setItem("@CarWashClub:token", response.token);
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
