import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View, Text, FlatList } from 'react-native';

import { colors, fonts } from '../constants'
import GenreCard from '../components/cards/GenreCard';
import MovieCard from '../components/cards/MovieCard';
import ItemSeparator from '../components/ItemSeparator';
import tmbdProvider from '../provider/TMDB/tmbd.provider.js';

export default ({ navigation }) => {

  const [activeGenre, setActiveGenre] = useState('All')
  const [nowPlayingMovies, setNowPlayingMovies] = useState({})
  const [upcomingMovies, setUpcomingMovies] = useState([{ id: 10110, name: "All" }])
  const [genres, setGenres] = useState([{ id: 10110, name: "All" }])

  useEffect(() => {
    tmbdProvider.getNowPlayingMovies().then(res => {
      setNowPlayingMovies(res?.data?.results)
    }).catch(error => {
      console.error("tmbdProvider.getNowPlayingMovies: ", error)
    });

    tmbdProvider.getUpcomingMovies().then(res => {
      setUpcomingMovies(res?.data?.results)
    }).catch(error => {
      console.error("tmbdProvider.getUpcomingMovies #1: ", error)
    })

    tmbdProvider.getAllGenres().then(res => {
      setGenres([ ...genres, ...res?.data?.genres])
    }).catch(error => {
      console.error("tmbdProvider.getUpcomingMovies #2: ", error)
    })
  }, [])

  return (
    <ScrollView style={styles.container}>
      <StatusBar 
        style="auto"
        translucent={false}
        backgroundColor={colors.basic_background}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <Text style={styles.headerSubTitle}>View all</Text>
      </View>
      <View style={styles.genreListContainer}>
        <FlatList
          data={genres}
          horizontal
          showHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          ItemSeparatorComponent={<ItemSeparator width={20}/>}
          ListHeaderComponent={() => <ItemSeparator width={20}/>}
          ListFooterComponent={() => <ItemSeparator width={20}/>}
          renderItem={({item}) => <GenreCard title={item.name} active={item.name === activeGenre} onPress={setActiveGenre}/>}
          onPress={setActiveGenre}
        />
      </View>
      <View>
        <FlatList
          data={nowPlayingMovies}
          horizontal

          showHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          ItemSeparatorComponent={<ItemSeparator width={20}/>}
          ListHeaderComponent={() => <ItemSeparator width={20}/>}
          ListFooterComponent={() => <ItemSeparator width={20}/>}
          renderItem={({ item }) => (
            <MovieCard 
              title={item.title}
              poster={item.poster_path}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              heartLess={false}
              onPress={() => navigation.navigate("movie", { movieId: `${item.id}` })}
            />
          )}
          onPress={(name) => setActiveGenre(name)}
        />
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Coming Soon</Text>
        <Text style={styles.headerSubTitle}>View all</Text>
      </View>
      <View>
        <FlatList
          data={upcomingMovies}
          horizontal
          showHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          ItemSeparatorComponent={<ItemSeparator width={20}/>}
          ListHeaderComponent={() => <ItemSeparator width={20}/>}
          ListFooterComponent={() => <ItemSeparator width={20}/>}
          renderItem={({ item }) => (
            <MovieCard 
              title={item.title}
              poster={item.poster_path}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              size={.6}
              heartLess={false}
              onPress={() => navigation.navigate("movie", { movieId: `${item.id}` })}
            />
          )}
          onPress={(name) => setActiveGenre(name)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.basic_background
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: fonts.REGULAR
  },
  headerSubTitle: {
    fontSize: 13,
    color: colors.active,
    fontFamily: fonts.BOLD
  },
  genreListContainer: {
    paddingVertical: 10
  }
});
