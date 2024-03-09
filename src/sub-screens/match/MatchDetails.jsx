import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MatchDetails_Info from "./MatchDetails_Info";
import MatchDetails_Stats from "./MatchDetails_Stats";
import MatchDetails_Squad from "./MatchDetails_Squad";
import { getData } from "../../firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

const MatchDetails = ({props}) => {

    const matchData = props.route.params.match;
    const [matchStats, setMatchStats] = useState(null);
    const nav = useNavigation();

    useEffect(() => {
        const fetchMatchStats = async() => {
            if ((matchData.matchRef === "NA") || (matchData.matchRef === "Match Postponed")) {  // the game is postponed or in future
                setMatchStats("NA");
                nav.setOptions({ 
                    headerRight: () => (
                        <TouchableOpacity 
                            style={styles.predictButton}
                            activeOpacity={0.8}
                            onPress={() => nav.navigate("COMMUNITY")}   // temporary
                        >
                            <Text style={styles.predictButtonText}>Predict</Text>
                        </TouchableOpacity>
                    ),
                });
            } else {
                const matchStats = await getData("matches", matchData.matchRef);
                setMatchStats(matchStats);
            }
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
            <Tab.Screen name="STATS">
                {() => <MatchDetails_Stats matchData={matchData} matchStats={matchStats}/>}
            </Tab.Screen>
            <Tab.Screen name="SQUAD">
                {() => <MatchDetails_Squad matchData={matchData} matchStats={matchStats}/>}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    predictButton: {
        backgroundColor: "#54a761",
        padding: 5,
        borderRadius: 5,
        marginRight: 5,
        width: 70,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
    },
    predictButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    },
});

export default MatchDetails;