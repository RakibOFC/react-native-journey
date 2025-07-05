import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Welcome to Dashboard!</Text>
  </View>
);

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold' },
});
