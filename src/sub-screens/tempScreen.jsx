import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { addData, getData } from "../firebase/firestore";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { fetchAllTables } from "../API/FootApi.js";

const TempScreen = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    fetchAllTables();
                }}
                style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10,
                }}
            >
                <Text>fetch and save table(all) to firestore</Text>
            </TouchableOpacity>
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