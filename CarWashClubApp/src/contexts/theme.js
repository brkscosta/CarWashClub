import React, { useState, useEffect } from 'react';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import AsyncStorage from '@react-native-community/async-storage';

const ThemeContext = React.createContext();

const ThemeStore = ({ children }) => {
  const [theme, setTheme] = useState(light);

  useEffect(() => {
    async function getTheme() {
      let storedTheme = await AsyncStorage.getItem('@CarWashClub:theme');

      if (storedTheme) {
        await AsyncStorage.setItem('@CarWashClub:theme', JSON.stringify(light));
        setTheme(JSON.parse(storedTheme));
      }
    }
    getTheme();
  }, []);

  const toggleTheme = async () => {
    console.log(theme);
    setTheme(theme.title === 'light' ? dark : light);
    await AsyncStorage.setItem(
      '@CarWashClub:theme',
      theme.title === 'light' ? JSON.stringify(dark) : JSON.stringify(light)
    );
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeStore, ThemeContext };
