import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MatchList from "../../components/match/MatchList";
import { MaterialIcons } from '@expo/vector-icons'; 


const MatchMain = ({navigation}) => {


    const [currentWeek, setCurrentWeek] = useState(20);

    // useEffect to update currentWeek

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
            <MatchList nav={navigation} week={currentWeek}/>
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

export default MatchMain;