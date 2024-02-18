import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MatchDetails_Info from "./MatchDetails_Info";
import { getData } from "../../firebase/firestore";

const Tab = createMaterialTopTabNavigator();

const MatchDetails = ({match}) => {
    const matchData = match.route.params.match;
    const [matchStats, setMatchStats] = useState(null);

    useEffect(() => {
        const fetchMatchStats = async() => {
            const matchStats = await getData("matches", match.route.params.match.matchRef);
            setMatchStats(matchStats);
        }
        fetchMatchStats();
    }, []);

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
                {() => <MatchDetails_Info matchData={matchData} matchStats={matchStats}/>}
            </Tab.Screen>
            <Tab.Screen name="SQUAD">
                {() => <MatchDetails_Info matchData={matchData} matchStats={matchStats}/>}
            </Tab.Screen>
        </Tab.Navigator>
    );
}


export default MatchDetails;