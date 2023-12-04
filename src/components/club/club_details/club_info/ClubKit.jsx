import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import DetailBoxHeader from "../DetailBoxHeader";
import { clubColor } from "../../../../clubColor";

const ClubKit = ({club}) => {
    //console.log(club);
    return (
        <View style={[styles.container, {borderColor: `${clubColor[club.name_code]}66`}]}>
            <DetailBoxHeader text="Kits" color={clubColor[club.name_code]}/>
            <View style={styles.Kit}>
                <Image source={{uri: `${club.kit[0]}`}} style={styles.image}/>
                <Image source={{uri: `${club.kit[1]}`}} style={styles.image}/>
                <Image source={{uri: `${club.kit[2]}`}} style={styles.image}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 362,
        height: 180,
        marginTop: 10,
        borderWidth: 3,
        borderRadius: 5,
        backgroundColor: "#272727",
    },
    Kit: {
        flex: 1,
        flexDirection: "row",
        padding: 10
    },
    image: {
        flex: 1/3,
        resizeMode: "contain",
    },

});

export default ClubKit;