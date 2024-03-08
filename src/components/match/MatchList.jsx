import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl } from "react-native";
import { dataMatchesList } from "../../fetchCloud";
import { clubLogo } from "../../clubLogo";
import { getData } from "../../firebase/firestore";
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

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

const Item = ({match, nav, firstMatch, first, last}) => {

    let rowDate = `${match.dayOfWeek}, ${match.day} ${match.month}`
    
    if (match.day == 'f') {
        const refDate = new Date(match.refDate)
        const ref_Date = refDate.getDate()
        const ref_Month = refDate.toLocaleString('en-us', {month: 'short'})
        rowDate = `${match.refDayOfWeek}, ${ref_Date} ${ref_Month}`
    }

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
            {
                match.homeGoal != 'f'?  // if match is in future
                <View style={styles.time}>
                    <Text style={styles.timeText}>FT</Text>
                </View>
                :
                <View style={styles.time}>
                    <Text style={styles.timeText}>{match.time}</Text>
                </View>
            }
            <TouchableOpacity 
                style={styles.row}
                activeOpacity={0.8}
                onPress={() => nav.navigate("MatchDetails", {match: match})}
            >
                <Text style={styles.teamLeft}>{ match.homeTeam}</Text>
                <Image 
                    source={clubLogo[match.homeNameCode]}
                    style={styles.image}
                />
                {
                    match.homeGoal != 'f'?  // if match is in future, no score
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


const MatchList = ({nav, week, firstLoad}) => {
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

    return (
        <Animated.View 
            pointerEvents={"box-none"}
            style={styles.container} 
            entering={firstLoad? null : FadeIn.duration(10).delay(200)}
            exiting={FadeOut.duration(10).delay(400)}
        >
            <FlatList 
                style={styles.list}
                data={currentWeekData}
                renderItem={({item, index}) => (
                    index === 0 ? first = true : first = false,
                    index === currentWeekData.length - 1 ? last = true : last = false,
                    <Item 
                        match={item} 
                        nav={nav} 
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
                />
        </Animated.View>
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
        fontSize: 16,
        textAlign: "right",
    },
    teamRight: {
        color: "white",
        width: 120,
        fontSize: 16,
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

export default MatchList;