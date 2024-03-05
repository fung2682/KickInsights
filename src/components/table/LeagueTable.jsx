import React, {useState} from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl } from "react-native";
import TableTopBar from "./TableTopBar";
import { clubLogo } from "../../clubLogo";
import { dataClubs } from "../../fetchCloud";
import { getData } from "../../firebase/firestore";

const Item = ({club, nav, lastItem}) => (
    <TouchableOpacity 
        style={lastItem? [styles.row, {borderBottomWidth: 2, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}] : styles.row }
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

const LeagueTable = ({Data, type, nav}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [table, setTable] = useState(Data);

    const onRefresh = async() => {
        setRefreshing(true);
        const tempTable = await getData("league_tables", type);
        setTable(tempTable.table);
        setTimeout(() => {
          setRefreshing(false);
        }, 500);
    }

    return (
        <View style={styles.container}>
            <FlatList 
                style={styles.table}
                data={table}
                renderItem={
                    ({item, index}) => (
                        index == 19? 
                        <Item club={item} nav={nav} lastItem={true}/>
                        : 
                        <Item club={item} nav={nav} lastItem={false}/>
                    )
                }
                keyExtractor={item => item.club_id}
                ListHeaderComponent={<TableTopBar/>}
                stickyHeaderIndices={[0]}
                indicatorStyle="white"
                scrollIndicatorInsets={{right: -8}}
                initialNumToRender={18}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="lightgrey"
                    />
                }
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
        marginTop: 0,
        marginBottom: 10,
        overflow: "visible",
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
export { Item };