import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import TableTopBar from "./TableTopBar";
import { clubLogo } from "../../clubLogo";
import { dataClubs } from "../../fetchCloud";

const Item = ({club, nav, lastItem}) => (
    <TouchableOpacity 
        style={lastItem? styles.row: [styles.row, {borderBottomWidth: 2, borderBottomLeftRadius: 5, borderBottomRightRadius: 5}]}
        activeOpacity={0.8}
        onPress={() => nav.navigate("ClubDetails", {clubData: dataClubs[club.club_id].club})}
    >
        <Text style={[styles.num, {marginLeft:5}]}>{club.position}</Text>
        <Image source={clubLogo[club.name_code]} style={styles.image}/>
        <Text style={[styles.clubName, {marginLeft:10}]}>{club.name_code}</Text>
        <Text style={[styles.num, {marginLeft:18}]}>{club.played}</Text>
        <Text style={[styles.num, {marginLeft:14.6}]}>{club.win}</Text>
        <Text style={[styles.num, {marginLeft:14.6}]}>{club.draw}</Text>
        <Text style={[styles.num, {marginLeft:14.6}]}>{club.loss}</Text>
        <Text style={[styles.longnum, {marginLeft:10}]}>{club.goal_difference}</Text>
        <Text style={[styles.longnum, {marginLeft:5.5}, {fontWeight: "bold"}]}>{club.points}</Text>
    </TouchableOpacity>
);

const LeagueTable = ({Data, nav}) => {
    // console.log(Data, "----------")

    return (
        <View style={styles.container}>
            <View style={styles.topcover}></View>
            <FlatList 
                style={styles.table}
                data={Data}
                renderItem={
                    ({item, index}) => (
                        index == 19? 
                        <Item club={item} nav={nav} lastItem={false}/>
                        : 
                        <Item club={item} nav={nav} lastItem={true}/>
                    )
                }
                keyExtractor={item => item.club_id}
                ListHeaderComponent={<TableTopBar/>}
                stickyHeaderIndices={[0]}
                indicatorStyle="white"
                scrollIndicatorInsets={{right: -10}}
                initialNumToRender={15}
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
    topcover: {
        width: 362,
        height: 10,
        backgroundColor: "black",
        zIndex: 0,
        position: "absolute",
        top: 0,
    },
    table: {
        borderColor: "red",
        marginTop: 10,    // to hide the top cover of the table
        marginBottom: 10,
        //borderLeftWidth: 1,
        //borderRightWidth: 1,
        overflow: "visible",
        zIndex: -1,
    },
    row: {
        width: 362,
        height: 40,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderBottomWidth: 1,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: "#3a3a3a",
        backgroundColor: "#272727",
        zIndex: -2,
    },
    image: {
        width: 23,
        height: 23,
        marginLeft: 5,
    },
    clubName: {
        color: "white",
        fontSize: 15,
        width: 72,
        height: 16,
        textAlign: "left",
        fontWeight: "bold",
    },
    num: {
        color: "white",
        fontSize: 15,
        width: 20,
        height: 16,
        textAlign: "center",
    },
    longnum: {
        color: "white",
        fontSize: 15,
        width: 30,
        height: 16,
        textAlign: "center",
    },
});

export default LeagueTable;