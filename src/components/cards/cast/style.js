import { StyleSheet } from 'react-native'
import { colors, fonts } from '../../../constants';

export const styles = StyleSheet.create({
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