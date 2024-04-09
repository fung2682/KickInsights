import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const PredictionLegend = () => {
    return (
        <View style={styles.legend}>
            <View style={styles.legendRow}>
                <View style={[styles.legendBox, {backgroundColor: "#40C6E3"}]}></View>
                <Text style={styles.legendText}>Community models</Text>
            </View>
            <View style={styles.legendRow}>
                <View style={[styles.legendBox, {backgroundColor: "#369746"}]}></View>
                <Text style={styles.legendText}>My models</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    legend: {
        position: "absolute",
        bottom: "1.5%",
        left: "1.5%",
        width: "45%",
        height: 'fit-content',
        backgroundColor: "black",
        borderColor: "#3a3a3a",
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    legendTitle: {
        color: "white",
        fontSize: 13,
        marginBottom: 5,
    },
    legendRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    legendBox: {
        width: 10,
        height: 10,
        borderRadius: 2,
        marginRight: 8,
    },
    legendText: {
        color: "white",
        fontSize: 13,
    }
});

export default PredictionLegend;