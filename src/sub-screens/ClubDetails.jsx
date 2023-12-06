import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClubDetails_Info from "../sub-screens/ClubDetails_Info";
import ClubDetails_Stats from "../sub-screens/ClubDetails_Stats";
import ClubDetails_Players from "./ClubDetails_Players";

const Tab = createMaterialTopTabNavigator();

const ClubDetails = ({club}) => {
    const {clubData} = club.route.params;

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
                    tabBarLabelStyle: {
                        fontSize: 13,
                        borderWidth: 10,
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: "#54a761",
                    },
                    tabBarLabelStyle: {
                        marginTop: -8,
                        fontWeight: "bold",
                    },
                }
            }
            initialRouteName="INFO"
        >
            <Tab.Screen name="INFO">
                {() => <ClubDetails_Info clubData={clubData}/>}
            </Tab.Screen>
            <Tab.Screen name="STATS">
                {() => <ClubDetails_Stats club={clubData}/>}        
            </Tab.Screen>
            <Tab.Screen name="PLAYERS">
                {() => <ClubDetails_Players club={clubData}/>}
            </Tab.Screen>
        </Tab.Navigator>
    );
}


export default ClubDetails;