import { Image, Text, View } from "react-native";
import { images } from "../../../constants";
import movieProvider from "../../../provider/movie.provider";
import { styles } from "./style";

const CastCard = ({ originalName, image, characterName }) => {
  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: movieProvider.getPoster(image) } : images.NO_IMAGE}
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


export default CastCard;