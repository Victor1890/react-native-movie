import { useEffect, useCallback, useState } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Fonts from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from "./src/screens/home.screen";
import MovieScreen from "./src/screens/movie.screen";
import Loading from './src/components/loading';

const Stack = createNativeStackNavigator()

export default () => {

  const [appIsReady, setAppIsReady] = useState(false);

  const onLayoutRootView = useCallback( async () => {
    if(appIsReady) await SplashScreen.hideAsync()
  }, [JSON.stringify(appIsReady)])

  useEffect(() => {
    const prepare = async () => {
      
     try {
      await Fonts.loadAsync({
        Regular: require("./assets/fonts/NunitoSans-Regular.ttf"),
        Bold: require("./assets/fonts/NunitoSans-Bold.ttf"),
        Black: require("./assets/fonts/NunitoSans-Black.ttf"),
        ExtraBold: require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
        ExtraLight: require("./assets/fonts/NunitoSans-ExtraLight.ttf"),
        Light: require("./assets/fonts/NunitoSans-Light.ttf"),
        SemiBold: require("./assets/fonts/NunitoSans-SemiBold.ttf"),
      })

      await SplashScreen.preventAutoHideAsync();

      await new Promise(resolve => setTimeout(resolve, 2000));

     } catch (error) {
        console.warn("await Fonts.loadAsync", error)
     } finally {
      setAppIsReady(true)
     }

    }
    prepare()
    onLayoutRootView()
  }, [])

  if(!appIsReady) return <Loading/>

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="movie" component={MovieScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
