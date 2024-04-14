import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl } from "react-native";
import { dataMatchesList } from "../../fetchCloud";
import { clubLogo } from "../../clubLogo";
import { getData } from "../../firebase/firestore";
import PredictionLegend from "../prediction/PredictionLegend";

const scoreBoard = (match) => {
    // if (match.result === "Postponed") {
    //     return (
    //         <View style={[styles.score, 
    //             {backgroundColor: "#494d4d"}
    //         ]}>
    //             <Text style={[styles.postponeText]}>Post.</Text>
    //         </View>
    //     )
    // }
    return (
        <View style={styles.score}>
            <Text style={styles.scoreText}>{match.homeGoal}</Text>
            <Text style={[styles.scoreText, {width:10}]}>-</Text>
            <Text style={styles.scoreText}>{match.awayGoal}</Text>
        </View>
    )
}

const Item = ({match, firstMatch, first, last}) => {

    let rowDate = `${match.dayOfWeek}, ${match.day} ${match.month}`
    
    if (match.day == 'f') {
        const refDate = new Date(match.refDate)
        const ref_Date = refDate.getDate()
        const ref_Month = refDate.toLocaleString('en-us', {month: 'short'})
        rowDate = `${match.refDayOfWeek}, ${ref_Date} ${ref_Month}`
    }

    if (match.home_predicted === 1) {
        match.home_predicted = "W";
    } else if (match.home_predicted === -1) {
        match.home_predicted = "L";
    } else if (match.home_predicted === 0) {
        match.home_predicted = "D";
    }
    console.log(match)

    return (
        <View 
            style={[
                styles.game, 
                firstMatch? {height: first? 78 : 88}: null, // for first match of a day
                first? styles.firstRow : null,
                last? [styles.lastRow, {height: firstMatch? 98 : 53}] : null,
            ]}
        >
            {
                firstMatch && 
                <View style={[styles.date, first? {height: 30} : null]}>
                    <Text style={[styles.dateText, first? {marginTop: 8} : null]}>
                        {rowDate}
                    </Text>
                </View>
            }
            <View style={[styles.time, {backgroundColor: match.predictColor}]}>
                <Text style={styles.timeText}>{match.home_predicted}</Text>
            </View>
            <TouchableOpacity 
                style={styles.row}
                activeOpacity={0.8}
                // onPress={() => nav.navigate("MatchDetails", {match: match})} // only available in match tab
            >
                <Text style={styles.teamLeft}>{ match.homeTeam}</Text>
                <Image 
                    source={clubLogo[match.homeNameCode]}
                    style={styles.image}
                />
                {
                    match.homeGoal != 'f'?  // if match is in the past, show score
                    scoreBoard(match)
                    :
                    <View style={[styles.score, {backgroundColor: "#505050"}]}>
                        <Text style={[styles.scoreText, {width:10}]}>-</Text>
                    </View>
                }
                <Image 
                    source={clubLogo[match.awayNameCode]}
                    style={styles.image}
                />
                <Text style={styles.teamRight}>{match.awayTeam}</Text>
            </TouchableOpacity>
        </View>
    );
};


const PredictionMatchList = ({week, e_result, p_result}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [currentWeekData, setCurrentWeekData] = useState(dataMatchesList[`Week ${week}`]);
    
    let first, last;   // boolean to see if the row is the last row, for styling

    const onRefresh = async() => {
        setRefreshing(true);
        const data_matches_list = await getData("match_list", "full_match_list");
        setCurrentWeekData(data_matches_list[`Week ${week}`]);
        setTimeout(() => {
          setRefreshing(false);
        }, 500);
    }

    useEffect(() => {
        setCurrentWeekData(dataMatchesList[`Week ${week}`]);
    }, [week]);

    currentWeekData.forEach((match) => {
        // create new id for both evaluation and prediction result
        if ((match.matchRef === "NA") || (match.matchRef === "Match Postponed")) {
            match.predictID = `${match.homeNameCode}${match.awayNameCode}`;
        } else {
            match.predictID = match.matchRef;
        }
        // assign predicted result to each match
        if ((e_result !== undefined) && (Object.keys(e_result).includes(match.predictID))) {
            match.home_predicted = e_result[match.predictID].predicted;
            if (e_result[match.predictID].home_result == e_result[match.predictID].predicted) {
                match.predictColor = "green";
            } else {
                match.predictColor = "red";
            }
        } else if ((p_result !== undefined) && (Object.keys(p_result).includes(match.predictID))) {
            match.home_predicted = p_result[match.predictID].predicted;
            match.predictColor = "#272727";
        } else {
            match.home_predicted = "";
            match.predictColor = "#272727";
        }
    });

    return (
        <View style={styles.container}>
            <FlatList 
                style={styles.list}
                data={currentWeekData}
                renderItem={({item, index}) => (
                    index === 0 ? first = true : first = false,
                    index === currentWeekData.length - 1 ? last = true : last = false,
                    <Item 
                        match={item} 
                        firstMatch={item.firstMatch} 
                        first={first} 
                        last={last} 
                    />
                )}
                // keyExtractor={item => item.match.id}
                indicatorStyle="white"
                scrollIndicatorInsets={{right: -8}}
                initialNumToRender={10}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="lightgrey"
                    />
                }
                ListFooterComponent={<PredictionLegend />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },
    list: {
        marginTop: 10,
        overflow: "visible",
        marginBottom: 10,
        width: "97%",
    },
    game: {
        height: 48,
        backgroundColor: "#1f1f1f",
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: "#3a3a3a",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    teamLeft: {
        color: "white",
        width: 120,
        fontSize: 15,
        fontWeight: "600",
        textAlign: "right",
    },
    teamRight: {
        color: "white",
        width: 120,
        fontSize: 15,
        fontWeight: "600",
        textAlign: "left",
    },
    image: {
        width: 23,
        height: 23,
    },
    time: {
        width: 45,
        backgroundColor: "#272727",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginLeft: 5,
    },
    score: {
        width: 60,
        flexDirection: "row",
        backgroundColor: "#3a3a3a",
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
    date :{
        height: 40,
    },
    dateText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 15,
    },
    timeText: {
        color: "white",
        fontWeight: "bold",
    },
    firstRow: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: "#3a3a3a",
    },
    lastRow: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: "#3a3a3a",
    },
});

export default PredictionMatchList;