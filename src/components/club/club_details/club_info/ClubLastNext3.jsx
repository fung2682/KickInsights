import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import DetailBoxHeader from "../DetailBoxHeader";
import { clubColor } from "../../../../clubColor";
import { clubLogo } from "../../../../clubLogo";

const scoreBoard = (lastMatch) => {
    if (lastMatch.result === "Postponed") {
        return (
            <View style={[styles.score, 
                {backgroundColor: "#3a3a3a"}
            ]}>
                <Text style={[styles.postponeText]}>Post.</Text>
            </View>
        )
    }
    return (
        <View style={[styles.score, 
            {backgroundColor: lastMatch.result === "Win" ? 
            "#1a7c2a"
            :
            lastMatch.result === "Draw" ? "#9e8e33" : "#7c1a1a"}
        ]}>
            <Text style={styles.scoreText}>{lastMatch.home.goal}</Text>
            <Text style={[styles.scoreText, {width:10}]}>-</Text>
            <Text style={styles.scoreText}>{lastMatch.away.goal}</Text>
        </View>
    )
}

const Match = ({lastMatch, nextMatch, last}) => {
    //console.log(lastMatch.result);
    return (
        <View style={styles.game}>
            <Text style={styles.date}>{last? lastMatch.date : nextMatch.date}</Text>
            <View style={styles.row}>
                <Text style={styles.teamLeft}>{last? lastMatch.home.name_short : nextMatch.home.name_short}</Text>
                <Image source={clubLogo[last? lastMatch.home.name_code : nextMatch.home.name_code]} 
                style={styles.image}/>
                {
                    last?
                    scoreBoard(lastMatch)
                    :
                    <View style={[styles.score, {backgroundColor: "#3a3a3a"}]}>
                        <Text style={styles.timeText}>{nextMatch.time}</Text>
                    </View>
                }
                <Image source={clubLogo[last? lastMatch.away.name_code : nextMatch.away.name_code]} 
                style={styles.image}/>
                <Text style={styles.teamRight}>{last? lastMatch.away.name_short : nextMatch.away.name_short}</Text>
            </View>
        </View>
    )
}

const MatchSeparator = () => {
    return (
        <View style={{borderBottomWidth: 2, borderColor: '#3a3a3a'}}></View>
    )
}

const ClubLast3 = ({matches, color, last}) => {
    return (
        <View style={[styles.container, {borderColor: `${clubColor[color]}CC`}]}>
            <DetailBoxHeader text={ last?"Last 3 Games" : "Next 3 Games" } color={clubColor[color]}/>
            <View style={styles.lastNext}>
                <Match lastMatch={matches.last3[2]} nextMatch={matches.next3[0]} last={last}/>
                <MatchSeparator/>
                <Match lastMatch={matches.last3[1]} nextMatch={matches.next3[1]} last={last}/>
                <MatchSeparator/>
                <Match lastMatch={matches.last3[0]} nextMatch={matches.next3[2]} last={last}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "97%",
        height: 200,
        marginTop: 5,
        borderWidth: 3,
        borderRadius: 5,
        backgroundColor: "#1f1f1f",
    },
    lastNext: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    date :{
        color: "white",
        paddingLeft: 10,
    },
    teamLeft: {
        color: "white",
        width: 110,
        fontSize: 16,
        textAlign: "right",
    },
    teamRight: {
        color: "white",
        width: 110,
        fontSize: 16,
        textAlign: "left",
    },
    image: {
        width: 23,
        height: 23,
    },
    score: {
        width: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 5,
    },
    scoreText: {
        width: 20,
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    postponeText: {
        width: 60,
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    timeText: {
        width: 60,
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
    game:{
    }
});

export default ClubLast3;