import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts } from "../../../constants";

const { width } = Dimensions.get('screen')
const setWith = (value) => (value / 100) * width;

export const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: colors.white,
        paddingVertical: 8,
        elevation: 3,
        marginVertical: 2,
        width: setWith(25)
    },
    text: {
        fontSize: 13,
        color: colors.active,
        fontFamily: fonts.BOLD
    }
})
