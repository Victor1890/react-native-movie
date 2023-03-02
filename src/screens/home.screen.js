import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import { color } from '../constants'

export default () => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" translucent={false} backgroundColor={color.basic_background}/>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <Text style={styles.headerSubTitle}>View all</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.basic_background
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  headerTitle: {
    fontSize: 28
  },
  headerSubTitle: {
    fontSize: 13,
    color: color.active
  }
});
