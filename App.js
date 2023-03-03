import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from 'expo-font'
import AppLoading from "expo-app-loading";

import HomeScreen from "./src/screens/home.screen";
import MovieScreen from "./src/screens/movie.screen";

const Stack = createNativeStackNavigator()

export default () => {

  const [fontLoaded] = useFonts({
    Regular: require("./assets/fonts/NunitoSans-Regular.ttf"),
    Bold: require("./assets/fonts/NunitoSans-Bold.ttf"),
    Black: require("./assets/fonts/NunitoSans-Black.ttf"),
    ExtraBold: require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
    ExtraLight: require("./assets/fonts/NunitoSans-ExtraLight.ttf"),
    Light: require("./assets/fonts/NunitoSans-Light.ttf"),
    SemiBold: require("./assets/fonts/NunitoSans-SemiBold.ttf"),
  })

  if(!fontLoaded) return <AppLoading/>

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="movie" component={MovieScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
