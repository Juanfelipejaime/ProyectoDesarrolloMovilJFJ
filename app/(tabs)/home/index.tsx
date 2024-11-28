import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Api
  useEffect(() => {
    fetch('https://api.rawg.io/api/games?key=your api key&page_size=15')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then((data) => {
        setGames(data.results); // Guardar la lista de juegos
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator style={styles.loader} />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <LinearGradient colors={['#372C49', '#5E4688']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Juegos</Text>
        <FlatList
          data={games}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.background_image }} style={styles.gameImage} />
              <View style={styles.textContainer}>
                <Text style={styles.gameTitle}>{item.name}</Text>
                <Text style={styles.gameText}>Rating: {item.rating}</Text>
                <Text style={styles.gameText}>Lanzamiento: {item.released}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff10',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  gameImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  gameText: {
    color: 'white',
  },
});

export default Home;
