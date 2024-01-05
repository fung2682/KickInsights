import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";
import PlayerInfo from "../components/player/PlayerInfo";
import { clubColor } from "../clubColor";
import { getData } from "../firebase/firestore";
import PlayerStats from "../components/player/PlayerStats";
import { clubLogo } from "../clubLogo";

const PlayerDetails = ({playerData}) => {

    const player_info = playerData.route.params.player;
    const statColor = clubColor[player_info.club_name_code];
    const position = player_info.position;

    const [playerStats, setPlayerStats] = useState({});
    const [playerImage, setPlayerImage] = useState("");

    const fetchData = async () => {
        const player = await getData("players", player_info.Footapi_name);
        setPlayerStats(player.stats);
        setPlayerImage(player.image);
    }

    useEffect(() => {
        fetchData();
    }, []);

    // console.log(playerStats);

    return ( 
        <ImageBackground 
            style={styles.container} 
            source={clubLogo[player_info.club_name_code]}
            imageStyle={styles.image}
            opacity={0.2}
        >
            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={true}
                indicatorStyle="white"
                scrollIndicatorInsets={{ right: 1 }}
            >
                <View style={styles.statsContainer}>
                    <PlayerInfo player={player_info} image={playerImage}/>
                    <View style={{height: 3, width: "100%"}}/>
                    { position== 'GK' && <PlayerStats color={statColor} area={playerStats.goalkeeping} title="Goalkeeping"/> }
                    { position== 'GK' && <PlayerStats color={statColor} area={playerStats.goalkeeping_advanced} title="Advanced Goalkeeping"/> }
                    <PlayerStats color={statColor} area={playerStats.shooting} title="Shooting"/>
                    <PlayerStats color={statColor} area={playerStats.passing} title="Passing"/>
                    <PlayerStats color={statColor} area={playerStats.pass_types} title="Pass Types"/>
                    <PlayerStats color={statColor} area={playerStats.goal_and_shot_creation} title="Goal and Shot Creation"/>
                    <PlayerStats color={statColor} area={playerStats.defensive_actions} title="Defensive Actions"/>
                    <PlayerStats color={statColor} area={playerStats.possession} title="Possession"/>
                    <PlayerStats color={statColor} area={playerStats.misc} title="Miscellaneous"/>
                </View>
            </ScrollView>
        </ImageBackground>
     );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
      },
    scrollContainer: {
        flex: 1,
    },
    statsContainer: {
        flex: 1,
        alignItems: "center",
        marginTop: 8,
        marginBottom: 8,
    },
    image: {
        top: 500,
        resizeMode: "contain",
        height: "20%",
      },
});

export default PlayerDetails;