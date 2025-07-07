import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Routes } from '../constants/routes';

type AppSplashNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const AppSplashScreen = () => {
  const navigation = useNavigation<AppSplashNavigationProp>();

  useEffect(() => {
    const init = async () => {
      SplashScreen.hide();
      await new Promise(res => setTimeout(res, 2000));
      const loggedIn = await AsyncStorage.getItem('is_logged_in');
      navigation.replace(loggedIn === 'true' ? Routes.Dashboard : Routes.Login);
    };

    init();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

export default AppSplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
