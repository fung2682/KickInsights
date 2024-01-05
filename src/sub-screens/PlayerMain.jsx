import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PlayerCompare from "../components/player/PlayerCompare";
import PlayerList from "../components/player/PlayerList";
import { Header } from "@react-navigation/stack";


const Tab = createMaterialTopTabNavigator();

const PlayerMain = ({navigation}) => {

    const [compareList, setCompareList] = useState([0, 0]);
    const [tempPlayer, setTempPlayer] = useState(0);

    // Everytime a player is long-clicked in player List,
    // use logic to decide if it should be added to compare list
    // or show error message
    useEffect(() => {
        let tempList;
        if (tempPlayer === 0) {return;}
        if (compareList[0] === 0) {
            tempList = [tempPlayer, compareList[1]];
            setCompareList(tempList);
        } else if (compareList[1] === 0) {
            tempList = [compareList[0], tempPlayer];
            setCompareList(tempList);
        } else {
            Alert.alert("Compare list is full", `Replace one of the following players to proceed.`,
            [
                {
                    text: `${compareList[0]}`,
                    style: 'default',
                    onPress: () => {setCompareList([tempPlayer, compareList[1]]);
                        Alert.alert("Player Added", `${tempPlayer} has been added to the compare list.`,
                            [
                                {
                                    text: 'Show Results',
                                    style: 'default',
                                    onPress: () => navigation.navigate("PLAYER_COMPARE"),
                                },
                                {
                                    text: 'OK',
                                    style: 'default',
                                },
                            ],
                        );
                    }
                },
                {
                    text: `${compareList[1]}`,
                    style: 'default',
                    onPress: () => { setCompareList([compareList[0], tempPlayer]);
                        Alert.alert("Player Added", `${tempPlayer} has been added to the compare list.`,
                            [
                                {
                                    text: 'Show Results',
                                    style: 'default',
                                    onPress: () => navigation.navigate("PLAYER_COMPARE"),
                                },
                                {
                                    text: 'OK',
                                    style: 'default',
                                },
                            ],
                        );
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],);
            setTempPlayer(0);
            return;
        }
        Alert.alert("Player Added", `${tempPlayer} has been added to the compare list.`,
            [
                {
                    text: 'Show Results',
                    style: 'default',
                    onPress: () => navigation.navigate("PLAYER_COMPARE"),
                },
                {
                    text: 'OK',
                    style: 'default',
                },
            ],
        );
        setTempPlayer(0);
    }, [tempPlayer]);


    // Eeverytime compare List is updated, send it to PlayerCompare
    // useEffect(() => {
    //     console.log("compare list: ", compareList)
    // }, [compareList]);

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
            initialRouteName="PLAYER_LIST"
        >
            <Tab.Screen name="PLAYER_LIST" options={{title: "LIST"}}>
                {() => <PlayerList nav={navigation} setTemp={setTempPlayer}/>}
            </Tab.Screen>
            <Tab.Screen name="PLAYER_COMPARE" options={{title: "COMPARE"}}>
                {() => <PlayerCompare compare_list={compareList} setter={setCompareList}/>}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

export default PlayerMain;