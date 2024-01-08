import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClubList from "../../components/club/ClubList";
import CommunityList from "../../components/prediction/CommunityList";

const Tab = createMaterialTopTabNavigator();

const PredictionMain = ({navigation}) => {
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
            initialRouteName="COMMUNITY"
        >
            <Tab.Screen name="COMMUNITY" options={{title: "COMMUNITY"}}>
                {() => <CommunityList nav={navigation}/>}
            </Tab.Screen>
            <Tab.Screen name="SAVED" options={{title: "SAVED"}}>
                {() => <ClubList nav={navigation}/>}           
            </Tab.Screen>
        </Tab.Navigator>
    );
}

export default PredictionMain;