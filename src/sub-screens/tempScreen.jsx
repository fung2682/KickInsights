import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { fetchTables } from "../API/fetchTable.js";
import { fetchClubs } from "../API/fetchClub.js";
import { fetchLastNext3 } from "../API/fetchLastNext3.js";
import { fetchClubStats } from "../API/fetchClubStats.js";
import { fetchPlayerImage } from "../API/fetchPlayerImages.js";
import { fetchPlayers } from "../API/fetchPlayer.js";
import { fetchPlayerStats } from "../API/fetchPlayerStats.js";
import { fetchMatches } from "../API/fetchMatch.js";

const TempScreen = () => {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {fetchTables()}} style={styles.temp_button}
            >
                <Text>{`[league tables] (hourly?)\n (3) FootApi -> Firestore`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={ async () => {
                    await fetchClubs();
                    await fetchPlayerImage();
                    await fetchClubs();
                }} 
                style={styles.temp_button}
            >
                <Text>{`[club details] (no need)`}</Text>
                <Text>{`(10 mins, 40) FootApi + Storage -> Firestore`}</Text>
                <Text>{`[player images] (only fetch new ones)\n (~1 min) FootApi -> Firebase Storage`}</Text>
                <Text>{`1. get all players\n2.download all players' images to storage`}</Text>
                <Text>{`3.update new players with images`}</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                onPress={() => {fetchPlayerImage()}} style={styles.temp_button}
            >
                <Text>{`[player images] (only fetch new ones)\n (~1 min) FootApi -> Firebase Storage`}</Text>
            </TouchableOpacity> */}
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
            <TouchableOpacity
                onPress={() => {fetchPlayers()}} style={styles.temp_button}
            >
                <Text>{`[player list + info] (hourly?)\n (10 mins, 40) FootApi + Storage -> Firestore`}</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                onPress={() => {fetchPlayerStats('18bb7c10')}} style={styles.temp_button}
            >
                <Text>{`[player stats] (called by above)\n FBREF -> Firestore`}</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                onPress={() => {fetchMatches()}} style={styles.temp_button}
            >
                <Text>{`FBREF -> Firestore`}</Text>
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