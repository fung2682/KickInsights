import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ClubPlayers from "../components/ClubPlayers";
import { clubColor } from "../clubColor";

const ClubDetails_Players = ({ club }) => {
    const playerColor = clubColor[club.shortName]

    const renderPlayers = () => {
        return club.players.map((player, index) => {
            return <ClubPlayers key={index} player={player} color={`${playerColor}`}/>
        });
    }

    return (
        <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
            indicatorStyle="white"
            scrollIndicatorInsets={{ right: 3 }}
        >
            <View style={styles.container}>
                {renderPlayers()}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: "#000000",
    },
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        marginTop: 8,   // temporary
        marginBottom: 10,
    },
});

export default ClubDetails_Players;