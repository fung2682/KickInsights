import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TempScreen from "../sub-screens/tempScreen";
import PlayerList from "../components/player/PlayerList";


const Tab = createMaterialTopTabNavigator();

const Players = () => {
    return (
        <Tab.Navigator
            screenOptions={
                {
                    tabBarActiveTintColor: "white",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        backgroundColor: "#272727",
                        height: 38,
                        borderTopWidth: 0.4,
                        borderColor: "#1c1c1c",
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: "#54a761",
                    },
                    tabBarLabelStyle: {
                        fontSize: 13,
                        marginTop: -8,
                        fontWeight: "bold",
                    },
                }
            }
        >
            <Tab.Screen name="LIST">
                {() => <PlayerList/>}
            </Tab.Screen>
            <Tab.Screen name="COMPARE">
                {() => <TempScreen/>}       
            </Tab.Screen>
        </Tab.Navigator>
    );
}

export default Players;