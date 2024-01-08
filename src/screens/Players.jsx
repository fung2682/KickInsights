import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayerMain from "../sub-screens/player/PlayerMain";
import TempScreen from "../sub-screens/tempScreen";
import PlayerDetails from "../sub-screens/player/PlayerDetails";


const Stack = createNativeStackNavigator();

const Players = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#141414",
                    borderStyle: "solid",
                    shadowColor: "transparent",
                    height: 25,
                },
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "white",
                },
                headerTitleContainerStyle: {
                    top: 0,
                },
                headerTintColor: "#54a761",
                headerTitle: "Players",
                headerBackTitle: "Players",
            }}
            initialRouteName="PlayerMain"
        >
            <Stack.Screen name="PlayerMain" component={PlayerMain} options={{ title: 'Players'}}/>
            <Stack.Screen name="PlayerDetails" 
                options={({route}) => ({ headerTitle: route.params.player.Footapi_name })}
            >
                {(input) => <PlayerDetails playerData={input}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default Players;