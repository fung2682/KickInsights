import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { fetchAllTables, fetchHomeTables, fetchAwayTables } from "../FootApi/fetchTable.js";
import { fetchClubs } from "../FootApi/fetchClub.js";
import { fetchLastNext3 } from "../FootApi/fetchLastNext3.js";

const TempScreen = () => {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    fetchAllTables();
                    fetchHomeTables();
                    fetchAwayTables();
                }}
                style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10,
                }}
            >
                <Text>fetch & save league tables to firestore (3)</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    fetchClubs();
                }}
                style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10,
                }}
            >
                <Text>fetch & save club details to firestore (20)</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    fetchLastNext3();
                }}
                style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10,
                }}
            >
                <Text>fetch & save lastNext 3 to firestore (20)</Text>
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