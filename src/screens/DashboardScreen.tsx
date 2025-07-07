import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, StatusBar, Image, TextInput,
  TouchableOpacity, FlatList, ActivityIndicator, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserById } from '../db/Database';
import { Routes } from '../constants/routes';
import { fetchShows } from '../api/apiService';
import CardTVShow from './CardTVShow';
import { SearchResult } from '../models/SearchResult';

const DashboardScreen = ({ navigation }: any) => {
  const [userName, setUserName] = useState('Loading...');
  const [searchText, setSearchText] = useState('iron');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const userId = await AsyncStorage.getItem('user_id');
    if (userId) {
      const user = await getUserById(parseInt(userId));
      setUserName(user?.name || 'App Name');
    }
    handleSearch(searchText);
  };

  const handleSearch = async (text: string) => {
    setLoading(true);
    const results = await fetchShows(text);
    setSearchResults(results);
    setLoading(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('is_logged_in');
    await AsyncStorage.removeItem('user_id');
    navigation.replace(Routes.Login);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <Image
          source={require('../../assets/tiny_logo.png')}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{userName}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={() => handleSearch(searchText)}
        />
        <TouchableOpacity onPress={() => handleSearch(searchText)} style={styles.searchBtn}>
          <Text style={{ color: '#fff' }}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <CardTVShow index={index} show={item.show} />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  userName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logout: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  searchSection: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 4,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
  },
  searchBtn: {
    backgroundColor: '#007AFF',
    marginLeft: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 5,
  },
  list: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
  },
});
