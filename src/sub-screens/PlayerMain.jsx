import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PlayerCompare from "../components/player/PlayerCompare";
import PlayerList from "../components/player/PlayerList";


const Tab = createMaterialTopTabNavigator();

const PlayerMain = ({navigation}) => {
    return (
        <Tab.Navigator
            screenOptions={
                {
                    tabBarActiveTintColor: "white",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        backgroundColor: "#141414",
                        height: 38,
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
            initialRouteName="LIST"
        >
            <Tab.Screen name="LIST">
                {() => <PlayerList nav={navigation}/>}
            </Tab.Screen>
            <Tab.Screen name="COMPARE">
                {() => <PlayerCompare/>}           
            </Tab.Screen>
        </Tab.Navigator>
    );
}

export default PlayerMain;