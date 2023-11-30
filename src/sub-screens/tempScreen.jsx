import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { addData, getData } from "../firebase/firestore";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { fetchAllTables } from "../API/FootApi.js";

const TempScreen = () => {
    return (
        <View style={styles.container}>
            <Text>temp</Text>
            <TouchableOpacity           // test function to add data to firestore
                onPress={() => {
                    addData("test1", { title: "test_title" });
                }}
                style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10,
                }}
            >
                <Text>add data</Text>
            </TouchableOpacity>
            <TouchableOpacity       // test function to read data from firestore
                onPress={() => {
                    // getData("test1", "Table");
                    fetchAllTables();
                }}
                style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10,
                }}
            >
                <Text>read data</Text>
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