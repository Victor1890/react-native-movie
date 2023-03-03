import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen')

export const setWith = (value) => (value / 100) * width;
export const setHeight = (value) => (value / 100) * height;