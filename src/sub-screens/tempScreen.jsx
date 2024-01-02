import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { fetchTables } from "../API/fetchTable.js";
import { fetchClubs } from "../API/fetchClub.js";
import { fetchLastNext3 } from "../API/fetchLastNext3.js";
import { fetchClubStats } from "../API/fetchClubStats.js";
import { fetchPlayerImage } from "../API/fetchPlayerImages.js";

const TempScreen = () => {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {fetchTables()}} style={styles.temp_button}
            >
                <Text>{`[league tables] (hourly?)\n (3) FootApi -> Firestore`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {fetchPlayerImage()}} style={styles.temp_button}
            >
                <Text>{`[player images] (only fetch new ones)\n (~1 min) FootApi -> Firebase Storage`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {fetchClubs()}} style={styles.temp_button}
            >
                <Text>{`[club details] (no need)\n (10 mins, 20) FootApi + Storage -> Firestore`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {fetchLastNext3()}} style={styles.temp_button}
            >
                <Text>{`[lastNext 3] (hourly?)\n (40) (hourly?) FootApi -> Firestore`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {fetchClubStats()}} style={styles.temp_button}
            >
                <Text>{`[club stats] (hourly?)\n (15 mins) FBREF -> Firestore`}</Text>
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