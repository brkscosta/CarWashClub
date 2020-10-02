import React from "react";
import AppRoutes from "./app";
import AuthRoutes from "./auth";
import { useAuth } from "../contexts/auth";
import SplashScreen from "react-native-splash-screen";

const Routes = () => {
  let { signed, loading } = useAuth();

  if (loading && !signed) {
    SplashScreen.hide();
  }
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
