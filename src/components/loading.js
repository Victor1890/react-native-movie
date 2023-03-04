import { View, Text, StyleSheet } from 'react-native'

const Loading = ()=> {
    return (
        <View style={styles.container}>
            <Text>Loading Demo 🚀</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        width: "100%",
        height: "100%"
    }
})

export default Loading