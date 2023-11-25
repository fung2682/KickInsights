import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LeagueTable from "../components/LeagueTable";
import { tempData_A } from "../tempData_A";
import { tempData_H } from "../tempData_H";
import { tempData_AW } from "../tempData_AW";


const Tab = createMaterialTopTabNavigator();

const TableMain = ({navigation}) => {
    return (
        <Tab.Navigator
            screenOptions={
                {
                    tabBarActiveTintColor: "white",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        backgroundColor: "#272727",
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
            initialRouteName="ALL"
        >
            <Tab.Screen name="ALL">
                {() => <LeagueTable Data={tempData_A} nav={navigation}/>}
            </Tab.Screen>
            <Tab.Screen name="HOME">
                {() => <LeagueTable Data={tempData_H} nav={navigation}/>}           
            </Tab.Screen>
            <Tab.Screen name="AWAY">
                {() => <LeagueTable Data={tempData_AW} nav={navigation}/>}           
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default TableMain;