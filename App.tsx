// App.tsx
import React, { useEffect, useState } from 'react';
import { View, StatusBar, ActivityIndicator, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DashboardScreen from './src/screens/DashboardScreen';
import LoginScreen from './src/screens/LoginScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      SplashScreen.hide();

      await new Promise(resolve => setTimeout(resolve, 2000));
      const loggedIn = await AsyncStorage.getItem('is_logged_in');
      setLoggedIn(loggedIn === 'true');

      setIsLoading(false);
    };

    initialize();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      {isLoggedIn ? <DashboardScreen /> : <LoginScreen />}
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
