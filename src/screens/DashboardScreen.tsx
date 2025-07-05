import React from 'react';
import { View, StatusBar, Alert, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = ({ navigation }: any) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('is_logged_in');
      await AsyncStorage.removeItem('user_id');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Logout Failed', 'An error occurred while logging out.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Text style={styles.text}>Welcome to Dashboard!</Text>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff3b30',
    borderRadius: 5
  }
});
