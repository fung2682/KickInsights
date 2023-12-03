import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { dataClubs, logoImage } from "../fetchCloud";
import { tempData_ClubDetail } from "../tempData_ClubDetail";
import { clubColor } from "../clubColor";
import { clubLogo } from "../clubLogo";
const temp_club_index = 1;

const Item = ({club, nav}) => {
    // custom transform attributes for front-end design
    if (club.stadium === "American Express Community's Stadium") {club.stadium = "Amex Stadium"};
    if (club.stadium === "Brentford Community Stadium") {club.stadium = "Gtech Community Stadium"};
    if (club.city === "Newcastle upon Tyne") {club.city = "Newcastle"};

    return (
        <TouchableOpacity 
            style={[styles.clubPane, {backgroundColor: clubColor[club.name_code]}]}
            activeOpacity={0.8}
            onPress={() => nav.navigate("ClubDetails", {clubData: tempData_ClubDetail[temp_club_index]})}
        >
            <Text style={styles.name}>{club.name_full}</Text>
            <Text style={[styles.description, {marginTop: 17}]}>{club.stadium}, {club.city}</Text>
            <Text style={[styles.description, {marginTop: 2}]}>Est: {club.founded}</Text>
            <View style={styles.square}></View>
            <View style={styles.triangle}></View>
            <Image source={clubLogo[club.name_code]} style={styles.image}/>
        </TouchableOpacity>
    );
};

const ClubList = ({nav}) => {
    return (
        <View style={styles.container}>
            <FlatList 
                style={styles.list}
                data={dataClubs}
                renderItem={({item}) => <Item club={item.club} nav={nav}/>}
                keyExtractor={item => item.club.id}
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

export default ClubList;

