import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PredictionMatchList from "../../components/match/PredictionMatchList";
import { MaterialIcons } from '@expo/vector-icons'; 
import { dataAll } from "../../fetchCloud";
import { getData } from "../../firebase/firestore";

function getCurrentWeek() {
    let week = 1;
    dataAll.forEach((club) => {
        club.played > week ? week = club.played : week;
    });
    return week;
}

const PredictionMatch = ({input}) => {

    const {e_result, p_result} = input;
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

    const arrow_left_icon = <MaterialIcons name="keyboard-arrow-down" size={28} color="white" style={{height:28, transform: [{ rotate: "90deg" }], opacity: currentWeek > 1 ? 1 : 0.3}}/>
    const arrow_right_icon = <MaterialIcons name="keyboard-arrow-down" size={28} color="white" style={{height:28, transform: [{ rotate: "270deg" }] , opacity: currentWeek < 38 ? 1 : 0.3}}/>

    return (
        <View style={styles.container}>
            <View style={styles.tabBar}>
                <TouchableOpacity 
                    style={styles.changeWeek}
                    activeOpacity={0.8}
                    onPress={() => currentWeek > 1 ? setCurrentWeek(currentWeek - 1) : currentWeek}
                >
                    {arrow_left_icon}
                </TouchableOpacity>
                <View style={styles.tabBarLabel}>
                    <Text style={styles.tabBarLabelText}>{`MATCHWEEK ${currentWeek}`}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.changeWeek}
                    activeOpacity={0.8}
                    onPress={() => currentWeek < 38 ? setCurrentWeek(currentWeek + 1) : currentWeek}
                >
                    {arrow_right_icon}
                </TouchableOpacity>
            </View>

            <PredictionMatchList week={currentWeek} e_result={e_result} p_result={p_result} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    tabBar: {
        width: "100%",
        height: 38,
        backgroundColor: "#141414",
        alignItems: "center",
        flexDirection: "row",
        zIndex: 1,
    },
    tabBarLabel: {
        width: "80%",
        height: "100%",
        borderBottomWidth: 2,
        borderBottomColor: "#54a761",
        alignItems: "center",
        justifyContent: "center",
    },
    tabBarLabelText: {
        color: "white",
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
    },
    changeWeek: {
        width: "10%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default PredictionMatch;