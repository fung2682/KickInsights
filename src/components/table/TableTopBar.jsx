import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const TableTopBar = () => {
    return (
    <View style={styles.background}>
        <View style={styles.row}>
            <Text style={[styles.text, {marginLeft:11}]}>#</Text>
            <Text style={[styles.text, {marginLeft:10}]}>CLUB</Text>
            <Text style={[styles.text, {marginLeft:82}]}>PL</Text>
            <Text style={[styles.text, {marginLeft:17}]}>W</Text>
            <Text style={[styles.text, {marginLeft:22}]}>D</Text>
            <Text style={[styles.text, {marginLeft:24}]}>L</Text>
            <Text style={[styles.text, {marginLeft:20}]}>GD</Text>
            <Text style={[styles.text, {marginLeft:12}, {fontWeight: "bold"}]}>Pts</Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    row: {
        width: 362,
        height: 40,
        flexDirection: "row",
        justifyContent: "flex-start",
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
        height: 16,
        textAlign: "left",
        fontWeight: "bold",
    },
    background: {
        backgroundColor: "black",
        width: 362,
        height: 40,
    }
})

export default TableTopBar;