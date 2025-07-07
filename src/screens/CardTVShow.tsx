import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Show } from '../models/Show';

type CardTVShowProps = {
  index: number;
  show: Show;
};

const CardTVShow: React.FC<CardTVShowProps> = ({ index, show }) => {
  const genres = show.genres?.length > 0 ? show.genres.join(', ') : 'N/A';
  const runtimeText = show.runtime ? `${show.runtime} min` : 'N/A';
  const rating = show.rating?.average ?? 'N/A';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        // handle onTap
        console.log(`Tapped on: ${show.name}`);
      }}
    >
      <Image
        source={
          show.image?.medium
            ? { uri: show.image.medium }
            : require('../../assets/tiny_logo.png')
        }
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{show.name}</Text>
        <Text style={styles.subtitle}>{show.language ?? '-'}</Text>
        <Text style={styles.detail}>Genres: {genres}</Text>
        <Text style={styles.detail}>Runtime: {runtimeText}</Text>
        <Text style={styles.detail}>Premiered: {show.premiered ?? 'N/A'}</Text>
        <Text style={styles.detail}>Avg. Rating: {rating}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardTVShow;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 8,
    borderRadius: 20,
    elevation: 3,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    color: '#333',
    marginTop: 2,
  },
});
