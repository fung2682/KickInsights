import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import PlayerInfo from "../components/player/PlayerInfo";
import { clubColor } from "../clubColor";
import { getData } from "../firebase/firestore";

const PlayerDetails = ({playerData}) => {

    const player_info = playerData.route.params.player;

    // const [player, setPlayer] = useState({});

    // const fetchData = async () => {
    //     setPlayer(await getData("players", Footapi_name));
    // }

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // console.log(player);

    return ( 
        <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
            indicatorStyle="white"
            scrollIndicatorInsets={{ right: 3 }}
        >
            <View style={styles.container}>
                <PlayerInfo player={player_info}/>
            </View>
        </ScrollView>
     );
}

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

export default PlayerDetails;