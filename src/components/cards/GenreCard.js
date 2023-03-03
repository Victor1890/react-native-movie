import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { colors, fonts } from '../../constants';

const { width } = Dimensions.get('screen')
export const setWith = (value) => (value / 100) * width;

export const GenreCard = ({ title, active, onPress }) => {

    return (
        <TouchableOpacity 
            style={{...style.container, backgroundColor: active ? colors.active :colors.white }} 
            activeOpacity={.5}
            onPress={() => onPress(title)}
        >
            <Text style={{...style.text, color: active ? colors.white :colors.black}}>{title}</Text>
        </TouchableOpacity>
    )

}

const style = StyleSheet.create({
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

export default GenreCard;