import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  Share,
} from "react-native";
import { colors, fonts } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from "@expo/vector-icons";
import ItemSeparator from '../components/ItemSeparator';
import { APPEND_TO_RESPONSE } from '../constants/url';
import CastCard from '../components/cards/cast/CastCard';
import MovieCard from '../components/cards/movie/MovieCard';
import movieProvider from '../provider/movie.provider';

const { height, width } = Dimensions.get("window");

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

export default ({ route, navigation }) => {

  const { movieId } = route.params;
  const [movie, setMovie] = useState({})
  const [isCastSelected, setIsCastSelected] = useState(true)

  useEffect(() => {
    movieProvider.getMovieById(
      movieId, 
      `${APPEND_TO_RESPONSE.VIDEOS},${APPEND_TO_RESPONSE.CREDITS},${APPEND_TO_RESPONSE.RECOMMENDATIONS},${APPEND_TO_RESPONSE.SIMILAR}`
    ).then(res => {
      setMovie(res?.data)
    }).catch(error => {
      console.error("movieProvider.getMovieById: ", error)
    })
  }, [movieId])

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.5)", "rgba(217, 217, 217, 0)"]}
        start={[0, 0.3]}
        style={styles.linearGradient}
      />
      <View style={styles.moviePosterImageContainer}>
        <Image
          style={styles.moviePosterImage}
          resizeMode="cover"
          source={{ uri: movieProvider.getPoster(movie?.backdrop_path) }}
        />
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={35} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            Share.share({ 
              message: `${movie?.title}\n\n${movie?.homepage}`,
              url: `${movie?.title}\n\n${movie?.homepage}`
            })
          }
        >
          <Text style={styles.headerText}>Share</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => Linking.openURL(movieProvider. getVideo(movie?.videos?.results[0].key))}
      >
        <Ionicons name="play-circle-outline" size={70} color={colors.white} />
      </TouchableOpacity>
      <ItemSeparator height={setHeight(37)} />
      <View style={styles.movieTitleContainer}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {movie?.original_title}
        </Text>
        <View style={styles.row}>
          <Ionicons name="heart" size={22} color={colors.HEART} />
          <Text style={styles.ratingText}>{movie?.vote_average}</Text>
        </View>
      </View>
      <Text style={styles.genreText}>
        {movie?.genres?.map((genre) => genre?.name)?.join(", ")} |{" "}
        {movie?.runtime} Min
      </Text>
      <Text style={styles.genreText}>
        {movieProvider. getLanguage(movie?.original_language)?.english_name}
      </Text>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overviewText}>{movie?.overview}</Text>
      </View>
      <View>
        <Text style={styles.castTitle}>Cast</Text>
        <View style={styles.castSubMenuContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(true)}
          >
            <Text
              style={{
                ...styles.castSubMenuText,
                color: isCastSelected ? colors.black : colors.light_gray,
              }}
            >
              Cast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(false)}
          >
            <Text
              style={{
                ...styles.castSubMenuText,
                color: isCastSelected ? colors.light_gray : colors.black,
              }}
            >
              Crew
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ marginVertical: 5 }}
          data={isCastSelected ? movie?.credits?.cast : movie?.credits?.crew}
          keyExtractor={(item) => item?.credit_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <CastCard
              originalName={item?.name}
              characterName={isCastSelected ? item?.character : item?.job}
              image={item?.profile_path}
            />
          )}
        />
      </View>
      <Text style={styles.extraListTitle}>Recommended Movies</Text>
      <FlatList
        data={movie?.recommendations?.results}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeparator width={20} />}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.6}
            onPress={() => navigation.navigate("movie", { movieId: item.id })}
          />
        )}
      />
      <Text style={styles.extraListTitle}>Similar Movies</Text>
      <FlatList
        data={movie?.similar?.results}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeparator width={20} />}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.6}
            onPress={() => navigation.navigate("movie", { movieId: item.id })}
          />
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.basic_background,
  },
  moviePosterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: "center",
    position: "absolute",
    left: setWidth((100 - 145) / 2),
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
  },
  moviePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    width: setWidth(145),
    height: setHeight(35),
  },
  linearGradient: {
    width: setWidth(100),
    height: setHeight(6),
    position: "absolute",
    top: 0,
    elevation: 9,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.BOLD,
  },
  playButton: {
    position: "absolute",
    top: 110,
    left: setWidth(50) - 70 / 2,
    elevation: 10,
  },
  movieTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  movieTitle: {
    color: colors.black,
    fontFamily: fonts.EXTRA_BOLD,
    fontSize: 18,
    width: setWidth(60),
  },
  ratingText: {
    marginLeft: 5,
    color: colors.black,
    fontFamily: fonts.EXTRA_BOLD,
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  genreText: {
    color: colors.light_gray,
    paddingHorizontal: 20,
    paddingTop: 5,
    fontFamily: fonts.BOLD,
    fontSize: 13,
  },
  overviewContainer: {
    backgroundColor: colors.extra_light_gray,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overviewTitle: {
    color: colors.black,
    fontFamily: fonts.BOLD,
    fontSize: 18,
  },
  overviewText: {
    color: colors.light_gray,
    paddingVertical: 5,
    fontFamily: fonts.BOLD,
    fontSize: 13,
    textAlign: "justify",
  },
  castTitle: {
    marginLeft: 20,
    color: colors.black,
    fontFamily: fonts.BOLD,
    fontSize: 18,
  },
  castSubMenuContainer: {
    marginLeft: 20,
    flexDirection: "row",
    marginVertical: 5,
  },
  castSubMenuText: {
    marginRight: 10,
    color: colors.black,
    fontFamily: fonts.BOLD,
    fontSize: 13,
  },
  extraListTitle: {
    marginLeft: 20,
    color: colors.black,
    fontFamily: fonts.BOLD,
    fontSize: 18,
    marginVertical: 8,
  },
});