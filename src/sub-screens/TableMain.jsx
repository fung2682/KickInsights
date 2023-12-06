import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LeagueTable from "../components/table/LeagueTable";
import { dataAll, dataHome, dataAway } from "../fetchCloud";

const Tab = createMaterialTopTabNavigator();

const TableMain = ({navigation}) => {

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
            initialRouteName="ALL"
        >
            <Tab.Screen name="ALL">
                {() => <LeagueTable Data={dataAll} nav={navigation}/>}
            </Tab.Screen>
            <Tab.Screen name="HOME">
                {() => <LeagueTable Data={dataHome} nav={navigation}/>}
            </Tab.Screen>
            <Tab.Screen name="AWAY">
                {() => <LeagueTable Data={dataAway} nav={navigation}/>}           
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default TableMain;