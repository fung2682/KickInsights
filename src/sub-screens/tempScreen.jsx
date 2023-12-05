import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { fetchTables } from "../API/fetchTable.js";
import { fetchClubs } from "../API/fetchClub.js";
import { fetchLastNext3 } from "../API/fetchLastNext3.js";
import { fetchClubStats } from "../API/fetchClubStats.js";

const TempScreen = () => {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    fetchTables();
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
                <Text>fetch & save lastNext 3 to firestore (40)</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    fetchClubStats();
                }}
                style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10,
                }}
            >
                <Text>fetch & save club stats to firestore (0)</Text>
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