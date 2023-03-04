import { Text, TouchableOpacity } from "react-native";
import { colors } from '../../../constants';
import { style } from "./style";

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

export default GenreCard;