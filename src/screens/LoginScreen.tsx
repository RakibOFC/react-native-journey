// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    if (!username || !password) {
      Alert.alert('Validation', 'Please enter username and password.');
      return;
    }

    const user = await getUser(username, password); // simulate db
    if (user) {
      await AsyncStorage.setItem('is_logged_in', 'true');
      await AsyncStorage.setItem('user_id', user.id.toString());

      navigation.replace('Dashboard'); // or set state if no navigator
    } else {
      Alert.alert('Login Failed', 'Invalid username or password.');
    }
  };

  const getUser = async (username: string, password: string) => {
    // Fake DB check — replace with real SQLite or DB logic
    if (username === 'test' && password === '1234') {
      return { id: 1, username };
    }
    return null;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../assets/tiny_logo.png')}
          style={styles.logo}
        />
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Registration')}
          style={styles.registerLink}
        >
          <Text style={styles.registerText}>
            Don’t have an account? Register here.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 25,
    alignItems: 'center',
  },
  registerText: {
    color: '#007AFF',
  },
});
