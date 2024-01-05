import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ClubPlayers from "../components/club/club_details/ClubPlayers";
import { clubColor } from "../clubColor";

const ClubDetails_Players = ({ club }) => {
    const playerColor = clubColor[club.club.name_code]

    const renderPlayers = () => {
        return club.club.players.map((player, index) => {
            return <ClubPlayers key={index} player={player} color={`${playerColor}`}/>
        });
    }

    return (
        <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
            indicatorStyle="white"
            scrollIndicatorInsets={{ right: 1 }}
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
        marginTop: 8,
        marginBottom: 8,
    },
});

export default ClubDetails_Players;