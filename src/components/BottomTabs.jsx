import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { Text } from "react-native";
import Table from "../screens/Table";
import Clubs from "../screens/Clubs";
import Prediction from "../screens/Prediction";
import Players from "../screens/Players";
import Matches from "../screens/Matches";
import { SafeAreaView, Image } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#141414"}}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: "#54a761",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                        backgroundColor: "#141414",
                        height:55,
                        paddingBottom: 2,
                        borderTopWidth: 0,
                    },
                    tabBarLabelStyle: {
                        fontSize: 13,
                        marginTop: 0
                    },
                    headerShown: false,
                    unmountOnBlur: false,
                    
                }}
                headerShown={false}
                initialRouteName="Prediction"
                sceneContainerStyle={{
                    backgroundColor: "black",
                }}
            >
                <Tab.Screen 
                    name="Table" 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <MaterialCommunityIcons name="trophy-outline" size={31} color={focused ? "#54a761" : "gray"} marginTop={5}/>
                        ),
                        tabBarLabel: ({focused}) => (
                            <Text style={{color: focused ? "#54a761" : "gray", fontSize: 13}}>Table</Text>
                        ),
                        headerShown: false,
                    }}
                >
                    {() => <Table/>}
                </Tab.Screen>

                <Tab.Screen
                    name="Clubs" 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Entypo name="shield" size={30} color={focused ? "#54a761" : "gray"} marginTop={4}/>
                        ),
                        tabBarLabel: ({focused}) => (
                            <Text style={{color: focused ? "#54a761" : "gray", fontSize: 13}}>Clubs</Text>
                        ),
                        headerShown: false,
                    }}
                >
                    {() => <Clubs/>}
                </Tab.Screen>

                <Tab.Screen 
                    name="Prediction" 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <MaterialCommunityIcons name="brain" size={33} color={focused ? "gold" : "#ad8d3b"} marginTop={6}/>
                        ),
                        tabBarLabel: ({focused}) => (
                            <Text style={{color: focused ? "gold" : "#ad8d3b", fontSize: 13}}>Prediction</Text>
                        ),
                        headerShown: false
                    }}
                >
                    {() => <Prediction/>}
                </Tab.Screen>

                <Tab.Screen 
                    name="Players" 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Entypo name="man" size={28} color={focused ? "#54a761" : "gray"} marginTop={6}/>
                        ),
                        tabBarLabel: ({focused}) => (
                            <Text style={{color: focused ? "#54a761" : "gray", fontSize: 13}}>Players</Text>
                        ),
                        headerShown: false,
                    }}
                >
                    {() => <Players/>}
                </Tab.Screen>

                <Tab.Screen 
                    name="Matches" 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <MaterialCommunityIcons name="soccer-field" size={33} color={focused ? "#54a761" : "gray"} marginTop={5}/>
                        ),
                        tabBarLabel: ({focused}) => (
                            <Text style={{color: focused ? "#54a761" : "gray", fontSize: 13}}>Matches</Text>
                        ),
                        headerShown: false,
                    }}
                >
                    {() => <Matches/>}
                </Tab.Screen>

            </Tab.Navigator>
        </SafeAreaView>
    )
}

export default Tabs;