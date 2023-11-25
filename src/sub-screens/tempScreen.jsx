import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TempScreen = () => {
    return (
        <View style={styles.container}>
            <Text>temp</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3a3a3a",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default TempScreen;