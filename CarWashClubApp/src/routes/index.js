import React, { useEffect, useState, Suspense } from 'react';
import AppRoutes from './app';
import AuthRoutes from './auth';
import { useAuth } from '../contexts/auth';
import SplashScreen from 'react-native-splash-screen';

const Routes = () => {
  let { signed, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hide();
    }
  }, [loading]);

  React.lazy(async () => {
    import('./auth');
  });
  React.lazy(async () => {
    import('./app');
  });
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
