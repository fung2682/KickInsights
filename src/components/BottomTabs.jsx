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
                    headerStyle: {
                        backgroundColor: "#141414",
                        borderStyle: "solid",
                        shadowColor: "transparent",
                        height: 43.5,
                    },
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "white",
                        top: -1,
                    },
                    headerTintColor: "#54a761",
                    unmountOnBlur: false,
                }}
                initialRouteName="Prediction"
                headershadowVisible={false}
                sceneContainerStyle={{
                    backgroundColor: "#272727",
                }}
            >
                <Tab.Screen 
                    name="Table" 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <MaterialCommunityIcons name="trophy-outline" size={28} color={focused ? "#54a761" : "gray"} />
                        ),
                        headerTitle: () => (
                            <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>Premier League 2023/24</Text>
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
                            <Entypo name="shield" size={26} color={focused ? "#54a761" : "gray"} />
                        ),
                        tabBarIconStyle: {
                            marginTop: -2
                        },
                        headerShown: false,
                    }}
                >
                    {() => <Clubs/>}
                </Tab.Screen>

                <Tab.Screen 
                    name="Prediction" 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <MaterialCommunityIcons name="brain" size={29} color={focused ? "#54a761" : "gray"} />
                        ),
                        headerShown: false,
                    }}
                    
                >
                    {() => <Prediction/>}
                </Tab.Screen>

                <Tab.Screen 
                    name="Players" 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Entypo name="man" size={26} color={focused ? "#54a761" : "gray"} />
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
                            <MaterialCommunityIcons name="soccer-field" size={30} color={focused ? "#54a761" : "gray"} />
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