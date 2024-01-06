import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import TableTopBar from "./TableTopBar";
import { clubLogo } from "../../clubLogo";
import { dataClubs } from "../../fetchCloud";

const Item = ({club, nav, lastItem}) => (
    <TouchableOpacity 
        style={lastItem? styles.row: [styles.row, {borderBottomWidth: 2, borderBottomLeftRadius: 5, borderBottomRightRadius: 5}]}
        activeOpacity={0.8}
        onPress={() => nav.navigate("ClubDetails", {clubData: dataClubs[club.club_id]})}
    >
        <Text style={[styles.num, ]}>{club.position}</Text>
        <View style={styles.club}>
            <Image source={clubLogo[club.name_code]} style={styles.image}/>
            <Text style={[styles.clubName, ]}>{club.name_short}</Text>
        </View>
        <Text style={[styles.num, ]}>{club.played}</Text>
        <Text style={[styles.num, ]}>{club.win}</Text>
        <Text style={[styles.num, ]}>{club.draw}</Text>
        <Text style={[styles.num, ]}>{club.loss}</Text>
        <Text style={[styles.num, ]}>{club.goal_difference}</Text>
        <Text style={[styles.num, , {fontWeight: "bold"}]}>{club.points}</Text>
    </TouchableOpacity>
);

const LeagueTable = ({Data, nav}) => {
    // console.log(Data, "----------")

    return (
        <View style={styles.container}>
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
                scrollIndicatorInsets={{right: -8}}
                initialNumToRender={18}
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
    table: {
        marginTop: 10,
        marginBottom: 10,
        overflow: "hidden",
        zIndex: -1,
        width: "97%",
    },
    row: {
        width: "100%",
        height: 40,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderBottomWidth: 1,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: "#3a3a3a",
        backgroundColor: "#1f1f1f",
        zIndex: -2,
    },
    image: {
        width: 23,
        height: 23,
    },
    clubName: {
        color: "white",
        fontSize: 15,
        width: "75%",
        textAlign: "left",
        fontWeight: "600",
        marginLeft: 10,
    },
    club: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "40%",
    },
    num: {
        color: "white",
        fontSize: 15,
        width: 30,
        textAlign: "center",
    },
});

export default LeagueTable;