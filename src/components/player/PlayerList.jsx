import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";

import { dataPlayersList } from "../../fetchCloud";
import { clubColor } from "../../clubColor";
import { clubLogo } from "../../clubLogo";

const Item = ({color, number, club_name_code, Footapi_name, Footapi_id, position, nav}) => {

    return (
        <TouchableOpacity 
            style={[
                styles.barContainer, 
                {borderColor: `#272727`,
                borderWidth: 2,
                backgroundColor: `${color}CC`}
            ]}
            activeOpacity={0.8}
            onPress={() => nav.navigate("PlayerDetails", {playerID: Footapi_id, playerName: Footapi_name})}
        >
            <Image source={clubLogo[club_name_code]} style={club_name_code === "NFO" ?
                [styles.image, {backgroundColor: "pink", borderRadius: 4, width: 17}] :
                styles.image}/>
            <View style={styles.numberFrame}>
                <Text style={styles.number}>{number}</Text>
            </View>
            <Text style={styles.name}>{Footapi_name}</Text>
            <Text style={styles.position}>{position}</Text>
        </TouchableOpacity>
    );
};

const PlayerList = ({nav}) => {
    // trim down the dataPlayer list to only contain color, number, club_name_code, Footapi_name&id, position
    const dataPlayers_trimmed = dataPlayersList.map((player) => {
        return {
            color: clubColor[player.club_name_code],
            Footapi_name: player.Footapi_name,
            Footapi_id: player.Footapi_id,
            club_name_code: player.club_name_code,
            number: player.number,
            position: player.position,
        };
    });

    // define outside to avoid redefining every time
    const renderItem = ({item}) => <Item color={item.color} club_name_code={item.club_name_code} number={item.number} 
    Footapi_name={item.Footapi_name} Footapi_id={item.Footapi_id} position={item.position} nav={nav}/>
    const keyExtractor = item => item.Footapi_id;

    return (
        <View style={styles.container}>
            <FlatList 
                style={styles.list}
                data={dataPlayers_trimmed}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={<View style={{height: 5}}/>}
                indicatorStyle="white"
                scrollIndicatorInsets={{right: -10}}
                initialNumToRender={20}
                windowSize={5}
                decelerationRate={0.8}
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
        // borderColor: "red",
        // borderWidth: 1,
    },

    barContainer: {
        width: 362,
        height: 34,
        borderRadius: 5,
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
});

export default PlayerList;

