import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { tempData_ClubDetail } from "../../tempData_ClubDetail";
import { clubColor } from "../../clubColor";
import { clubLogo } from "../../clubLogo";
const temp_club_index = 1;

const Item = ({club}) => (
    <TouchableOpacity 
        style={[styles.clubPane, {backgroundColor: clubColor[club.shortName]}]}
        activeOpacity={0.8}
    >
        <Text style={styles.name}>{club.name}</Text>
        <Text style={styles.description}>{club.description}</Text>
        <View style={styles.square}></View>
        <View style={styles.triangle}></View>
        <Image source={{uri: `${clubLogo[`${club.shortName}`]}`}} style={styles.image}/>
    </TouchableOpacity>
);

const PlayerList = () => {
    return (
        <View style={styles.container}>
            <FlatList 
                style={styles.list}
                data={tempData_ClubPane}
                renderItem={({item}) => <Item club={item}/>}
                keyExtractor={item => item.name}
                ItemSeparatorComponent={<View style={{height: 10}}/>}
                indicatorStyle="white"
                scrollIndicatorInsets={{right: -10}}
                initialNumToRender={7}
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
    clubPane: {
        width: 362,
        height: 90,
        borderRadius: 10,
    },
    name: {
        color: "white",
        fontSize: 19.5,
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 11,
        width: 262,
        // borderColor: "white",
        // borderWidth: 1,
        
    },
    description: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 17,
        width: 241,
        // borderColor: "white",
        // borderWidth: 1,
    },
    square: {
        backgroundColor: "#ffffff",
        width: 85,
        height: 90,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        position: "absolute",
        right: 0,
    },
    triangle: {
        borderLeftWidth: 35,
        borderBottomWidth: 90,
        borderLeftColor: "transparent",
        borderBottomColor: "#ffffff",
        position: "absolute",
        right: 85,
    },
    image: {
        width: 60,
        height: 60,
        position: "absolute",
        right: 17,
        top: 15,
        zIndex: 1,
    },
});

export default PlayerList;

