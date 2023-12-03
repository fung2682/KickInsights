import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import DetailBoxHeader from "./DetailBoxHeader";
import { clubColor } from "../clubColor";
import { clubLogo } from "../clubLogo";

const Match = ({lastMatch, nextMatch, last}) => {
    //console.log(lastMatch.result);
    return (
        <View style={styles.game}>
            <Text style={styles.date}>{last? lastMatch.date : nextMatch.date}</Text>
            <View style={styles.row}>
                <Text style={styles.teamLeft}>{last? lastMatch.home : nextMatch.home}</Text>
                <Image source={clubLogo[`${last? `${lastMatch.homeShortName}` : `${nextMatch.homeShortName}`}`]} 
                style={styles.image}/>
                {
                    last?
                    <View style={[styles.score, 
                        {backgroundColor: lastMatch.result === "win" ? 
                        "#1a7c2a"
                        :
                        lastMatch.result === "draw" ? "#3a3a3a" : "#7c1a1a"}
                    ]}>
    
                        <Text style={styles.scoreText}>{lastMatch.homeGoal}</Text>
                        <Text style={[styles.scoreText, {width:10}]}>-</Text>
                        <Text style={styles.scoreText}>{lastMatch.awayGoal}</Text>
                    </View>
                    :
                    <View style={[styles.score, 
                        {backgroundColor: "#6A6868"}
                    ]}>
    
                        <Text style={styles.timeText}>{nextMatch.time}</Text>
                    </View>
                }
                <Image source={clubLogo[`${last? `${lastMatch.awayShortName}` : `${nextMatch.awayShortName}`}`]} 
                style={styles.image}/>
                <Text style={styles.teamRight}>{last? lastMatch.away : nextMatch.away}</Text>
            </View>
        </View>
    )
}

const MatchSeparator = () => {
    return (
        <View style={{borderBottomWidth: 2, borderColor: '#3a3a3a'}}></View>
    )
}

const ClubLast3 = ({club, last}) => {
    //console.log(club);
    return (
        <View style={[styles.container, {borderColor: `${clubColor[club.shortName]}66`}]}>
            <DetailBoxHeader text={ last?"Last 3 Games" : "Next 3 Games" } color={clubColor[club.shortName]}/>
            <View style={styles.lastNext}>
                <Match lastMatch={club.lastMatch_3} nextMatch={club.nextMatch_1} last={last}/>
                <MatchSeparator/>
                <Match lastMatch={club.lastMatch_2} nextMatch={club.nextMatch_2} last={last}/>
                <MatchSeparator/>
                <Match lastMatch={club.lastMatch_1} nextMatch={club.nextMatch_3} last={last}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 362,
        height: 200,
        marginTop: 10,
        borderWidth: 3,
        borderRadius: 5,
        backgroundColor: "#272727",
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
        //backgroundColor: "green",
        fontSize: 16,
        textAlign: "right",
    },
    teamRight: {
        color: "white",
        width: 110,
        //backgroundColor: "green",
        fontSize: 16,
        textAlign: "left",
    },
    image: {
        width: 23,
        height: 23,
    },
    score: {
        width: 60,
        backgroundColor: "green",
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