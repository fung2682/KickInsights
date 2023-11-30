import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LeagueTable from "../components/LeagueTable";
import { getData } from "../firebase/firestore";
import { tempData_A } from "../tempData_A";
import { tempData_H } from "../tempData_H";
import { tempData_AW } from "../tempData_AW";


const Tab = createMaterialTopTabNavigator();

const dummyList = [
    {id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4},
    {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9},
    {id: 10}, {id: 11}, {id: 12}, {id: 13}, {id: 14},
    {id: 15}, {id: 16}, {id: 17}, {id: 18}, {id: 19},
]

const TableMain = ({navigation}) => {

    const [dataAll, setDataAll] = useState(dummyList);
    const [dataHome, setDataHome] = useState(dummyList);
    const [dataAway, setDataAway] = useState(dummyList);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData("league_tables", "all");
            setDataAll(data.table);
        }
        fetchData();
    }, [])

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