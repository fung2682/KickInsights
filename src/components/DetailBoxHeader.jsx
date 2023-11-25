import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailBoxHeader = ({text, color}) => {
    return (
        <View style={[styles.header, {backgroundColor: `${color}AA`}]}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        justifyContent: "center",
        width: 356,
        height: 30,
        top: 0,
        borderTopLeftRadius: 2.5,
        borderTopRightRadius: 2.5
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
});

export default DetailBoxHeader;