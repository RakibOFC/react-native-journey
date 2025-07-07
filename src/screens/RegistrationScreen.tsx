import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { insertUser, initDB, getUserByUsername } from '../db/Database';

const RegistrationScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    initDB();
  }, []);

  const onRegister = async () => {
    if (!name || !username || !password || !phone) {
      Alert.alert('Validation', 'Please fill in all fields.');
      return;
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      Alert.alert('Registration Failed', 'User already exists.');
      return;
    }

    try {
      await insertUser(name, username, password, phone);
      Alert.alert('Success', 'Registration Successful!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (e) {
      Alert.alert('Error', 'Registration failed.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../assets/tiny_logo.png')}
          style={styles.logo}
        />
        <TextInput
          placeholder="Name"
          placeholderTextColor='#999'
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Username"
          placeholderTextColor='#999'
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor='#999'
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Phone"
          placeholderTextColor='#999'
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />
        <TouchableOpacity style={styles.button} onPress={onRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    color: '#000',
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
});
