import { View, StyleSheet, Text, Image } from "react-native";
import tmbdProvider from "../../provider/TMDB/tmbd.provider";
import { colors, fonts, images } from "../../constants";

const CastCard = ({ originalName, image, characterName }) => {
  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: tmbdProvider.getPoster(image) } : images.NO_IMAGE}
        resizeMode={image ? "cover" : "contain"}
        style={styles.image}
      />
      <Text style={styles.originalName} numberOfLines={2}>
        {originalName}
      </Text>
      <Text style={styles.characterName} numberOfLines={2}>
        {characterName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 120,
    width: 80,
    borderRadius: 10,
  },
  originalName: {
    width: 80,
    color: colors.black,
    fontFamily: fonts.BOLD,
    fontSize: 12,
  },
  characterName: {
    width: 80,
    color: colors.light_gray,
    fontFamily: fonts.BOLD,
    fontSize: 10,
  },
});

export default CastCard;