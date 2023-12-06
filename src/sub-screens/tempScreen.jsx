import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { fetchTables } from "../API/fetchTable.js";
import { fetchClubs } from "../API/fetchClub.js";
import { fetchLastNext3 } from "../API/fetchLastNext3.js";
import { fetchClubStats } from "../API/fetchClubStats.js";

const TempScreen = () => {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {fetchTables()}} style={styles.temp_button}
            >
                <Text>{`[league tables] (hourly?)\n (3) fetches FootApi & save to firestore`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {fetchClubs()}} style={styles.temp_button}
            >
                <Text>{`[club details] (no need)\n (20) fetches FootApi & save to firestore`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {fetchLastNext3()}} style={styles.temp_button}
            >
                <Text>{`[lastNext 3]\n (40) (hourly?) fetches FootApi & save to firestore`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {fetchClubStats()}} style={styles.temp_button}
            >
                <Text>{`[club stats] (hourly?)\n (10 mins) fetch FBREF & save to firestore`}</Text>
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
    temp_button: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        width: "80%",
        marginBottom: 10,
    }
});

export default TempScreen;