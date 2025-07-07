import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppSplashScreen from '../screens/AppSplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import DashboardScreen from '../screens/DashboardScreen';
import { Routes } from '../constants/routes';

export type RootStackParamList = {
  [Routes.Splash]: undefined;
  [Routes.Login]: undefined;
  [Routes.Registration]: undefined;
  [Routes.Dashboard]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.Splash} component={AppSplashScreen} />
      <Stack.Screen name={Routes.Login} component={LoginScreen} />
      <Stack.Screen name={Routes.Registration} component={RegistrationScreen} />
      <Stack.Screen name={Routes.Dashboard} component={DashboardScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
