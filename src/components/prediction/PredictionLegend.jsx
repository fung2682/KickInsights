import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const PredictionLegend = () => {
    return (
        <View style={styles.legend}>
            <View style={styles.legendRow}>
                <View style={[styles.legendBox, {backgroundColor: "green"}]}></View>
                <Text style={styles.legendText}>Correct Prediction</Text>
            </View>
            <View style={styles.legendRow}>
                <View style={[styles.legendBox, {backgroundColor: "red"}]}></View>
                <Text style={styles.legendText}>Incorrect Prediction</Text>
            </View>
            <View style={styles.legendRow}>
                <View style={[styles.legendBox, {backgroundColor: "#272727"}]}>
                    <Text style={styles.legendiconText}>W</Text>
                </View>
                <Text style={styles.legendText}>Home Win</Text>
            </View>
            <View style={styles.legendRow}>
                <View style={[styles.legendBox, {backgroundColor: "#272727"}]}>
                    <Text style={styles.legendiconText}>D</Text>
                </View>
                <Text style={styles.legendText}>Draw</Text>
            </View>
            <View style={styles.legendRow}>
                <View style={[styles.legendBox, {backgroundColor: "#272727"}]}>
                    <Text style={styles.legendiconText}>L</Text>
                </View>
                <Text style={styles.legendText}>Home Loss</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    legend: {
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
    },
    legendiconText: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "center",
    }, 
});

export default PredictionLegend;