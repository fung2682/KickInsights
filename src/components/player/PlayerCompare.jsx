import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { getData } from "../../firebase/firestore";
import { clubLogo } from "../../clubLogo";
import { clubColor } from "../../clubColor";
import PlayerStats from "./PlayerStats";

const Clubs = ["ARS", "AVL", "BOU", "BRE", "BHA", "BUR", "CHE", "CRY", "EVE", "FUL", 
"LIV", "LUT", "MCI", "MUN", "NEW", "NFO", "SHU", "TOT", "WHU", "WOL"];

const PickNote = () => (
    <View style={styles.pickNote}>
        <Text style={styles.pickText}>{`Long-press a player in the player list to compare.`}</Text>
    </View>
);

const Box = ({display, pos}) => (
    <View 
        style={ pos=='top'? 
            [styles.Frame, {borderTopLeftRadius: 5, borderTopRightRadius: 5 ,marginTop: 0}]
            :
            [styles.Frame, {borderBottomLeftRadius: 5, borderBottomRightRadius: 5 ,marginBottom: 0}]
        }>
        {display}
    </View>
);

const Item = ({player, pos}) => {

    const {color, number, club_name_code, position, Footapi_name} = player;

    return (
        <View style={[styles.nametag, pos=='top'? {top: 10}:{bottom: 10}]}>
            {
                player.Footapi_name !== undefined &&
                <View 
                    style={[
                        styles.barContainer, {backgroundColor: `${clubColor[player.club_name_code]}CC`},
                    ]}
                >
                    <Image source={clubLogo[club_name_code]} style={club_name_code === "NFO" ?
                        [styles.image, {backgroundColor: "pink", borderRadius: 4, width: 17}] :
                        styles.image}/>
                    <View style={styles.numberFrame}>
                        <Text style={styles.number}>{number}</Text>
                    </View>
                    <Text style={styles.name}>{Footapi_name}</Text>
                    <Text style={styles.position}>{position}</Text>
                </View>
            }
        </View>
    );
};

const playerStatsBox = ({player}) => {
    const statColor = clubColor[player.club_name_code];
    const playerStats = player.stats;
    const position = player.position;
    return (
        <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
            indicatorStyle="white"
            scrollIndicatorInsets={{ right: -3 }}
        >
            { position== 'GK' && <PlayerStats color={statColor} area={playerStats.goalkeeping} title="Goalkeeping"/> }
            { position== 'GK' && <PlayerStats color={statColor} area={playerStats.goalkeeping_advanced} title="Advanced Goalkeeping"/> }
            <PlayerStats color={statColor} area={playerStats.shooting} title="Shooting"/>
            <PlayerStats color={statColor} area={playerStats.passing} title="Passing"/>
            <PlayerStats color={statColor} area={playerStats.pass_types} title="Pass Types"/>
            <PlayerStats color={statColor} area={playerStats.goal_and_shot_creation} title="Goal and Shot Creation"/>
            <PlayerStats color={statColor} area={playerStats.defensive_actions} title="Defensive Actions"/>
            <PlayerStats color={statColor} area={playerStats.possession} title="Possession"/>
            <PlayerStats color={statColor} area={playerStats.misc} title="Miscellaneous"/>
        </ScrollView>
    )
}

const PlayerCompare = ({compare_list, setter}) => {
    const [upperDisplay, setUpperDisplay] = useState(<PickNote/>);
    const [lowerDisplay, setLowerDisplay] = useState(<PickNote/>);
    const[player1, setPlayer1] = useState({});
    const[player2, setPlayer2] = useState({});

    const fetchData = async () => {
        // if (compare_list[0] !== 0 && compare_list[1] !== 0) {
            // setPlayer1(await getData("players", compare_list[0]));
            // setPlayer2(await getData("players", compare_list[1]));
        // }
        if (compare_list[0] !== 0) {
            const player = await getData("players", compare_list[0]);
            setPlayer1(player);
            setUpperDisplay(playerStatsBox({player}))
        } else {    // if player1 is removed
            setPlayer1({});
        }
        if (compare_list[1] !== 0) {
            const player = await getData("players", compare_list[1]);
            setPlayer2(player);
            setLowerDisplay(playerStatsBox({player}))
        } else {    // if player2 is removed
            setPlayer2({});
        }

    }

    useEffect(() => {
        fetchData();
    }, compare_list);


    return (
        <View style={styles.container}>
            <Item player={player1} pos='top'/>
            <View style={styles.Box}>
                <Box display={upperDisplay} pos='top'/>
                <Box display={lowerDisplay} pos='bottom'/>
            </View>
            <Item player={player2} pos='bottom'/>

            {/* <TouchableOpacity onPress={() => setter([0, compare_list[1]])}>
                <Text style={{color: "white"}}>Remove 1</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setter([compare_list[0], 0])}>
                <Text style={{color: "white"}}>Remove 2</Text>
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#000000",
        alignItems: "center",
    },
    nametag: {
        backgroundColor: "#272727",
        width: 373,
        height: 38,
        borderRadius: 5,
        justifyContent: "space-evenly",
        position: "absolute",
        borderColor: "#3a3a3a",
        borderWidth: 2,
    },
    Box:{
        width: 373,
        position: "absolute",
        top: 46,
        bottom: 46,
        flexDirection: "column",
        flex: 1,
    },
    Frame: {
        width: 373,
        flex: 0.5,
        position: "relative",
        borderColor: "#3a3a3a",
        backgroundColor: "#272727",
        borderWidth: 2,
        alignItems: "center",
    },
    pickNote: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    pickText: {
        color: "grey",
        fontSize: 16,
        textAlign: "center",
    },
    barContainer: {
        width: 369,
        height: 34,
        borderRadius: 3,
        marginTop: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    numberFrame: {
        width: 38,
        height: 22,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 6,
        marginRight: 6,
    },
    number: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    name: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        width: 218,
    },
    position: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        width: 40,
        textAlign: "center",
    },
    image: {
        width: 23,
        height: 23,
        marginLeft: 5,
    },
    scrollContainer: {
        flex: 1,
    },
});

export default PlayerCompare;