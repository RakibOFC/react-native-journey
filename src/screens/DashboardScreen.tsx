import React from 'react';
import { View, ActivityIndicator, StatusBar, Text, StyleSheet, TouchableOpacity, } from 'react-native';

const DashboardScreen = () => (
  <View style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
    <Text style={styles.text}>Welcome to Dashboard!</Text>
    
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={() => console.log('Button Pressed')}
    >
      <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Logout</Text>
    </TouchableOpacity>

  </View>
);

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
