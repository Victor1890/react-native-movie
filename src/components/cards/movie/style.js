import { StyleSheet } from "react-native";
import { colors, fonts } from "../../../constants";

export const styles = StyleSheet.create({
    container: {
        height: 340,
        width: 230,
        borderRadius: 12,
        elevation: 5,
        marginVertical: 2,
      },
      movieTitle: {
        fontFamily: colors.EXTRA_BOLD,
        color: colors.gray,
        paddingVertical: 2,
        marginTop: 5,
        width: 230,
      },
      movieSubTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      movieSubTitle: {
        fontSize: 12,
        fontFamily: fonts.REGULAR,
      },
      rowAndCenter: {
        flexDirection: "row",
        alignItems: "center",
      },
      imdbContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: colors.yellow,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 12,
        paddingVertical: 3,
      },
      imdbImage: {
        height: 20,
        width: 50,
        borderBottomLeftRadius: 5,
      },
      imdbRating: {
        marginRight: 5,
        color: colors.heart,
        fontFamily: fonts.EXTRA_BOLD,
      },
})