import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClubCompare from "../../components/club/ClubCompare";
import ClubList from "../../components/club/ClubList";


const Tab = createMaterialTopTabNavigator();

const ClubMain = ({navigation}) => {
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
            initialRouteName="CLUB_LIST"
        >
            <Tab.Screen name="CLUB_LIST" options={{title: "LIST"}}>
                {() => <ClubList nav={navigation}/>}
            </Tab.Screen>
            <Tab.Screen name="CLUB_COMPARE" options={{title: "COMPARE"}}>
                {() => <ClubCompare/>}           
            </Tab.Screen>
        </Tab.Navigator>
    );
}

export default ClubMain;