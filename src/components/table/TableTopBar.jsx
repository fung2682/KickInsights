import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const TableTopBar = () => {
    return (
    <View style={styles.background}>
        <View style={styles.row}>
            <Text style={[styles.text, ]}>#</Text>
            <Text style={[styles.club, ]}>CLUB</Text>
            <Text style={[styles.text, ]}>PL</Text>
            <Text style={[styles.text, ]}>W</Text>
            <Text style={[styles.text, ]}>D</Text>
            <Text style={[styles.text, ]}>L</Text>
            <Text style={[styles.text, ]}>GD</Text>
            <Text style={[styles.text, , {fontWeight: "bold"}]}>Pts</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    row: {
        width: "100%",
        height: 40,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderWidth: 2,
        //borderLeftWidth: 1,
        //borderRightWidth: 1,
        borderColor: "#3a3a3a",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#272727",
    },
    text: {
        color: "#54a761",
        fontSize: 15,
        width: 30,
        height: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
    club: {
        color: "#54a761",
        fontSize: 15,
        width: "40%",
        height: 16,
        textAlign: "left",
        fontWeight: "bold",
    },
    background: {
        backgroundColor: "black",
        width: "100%",
        height: 40,
    }
})

export default TableTopBar;