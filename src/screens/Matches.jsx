import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MatchMain from "../sub-screens/match/MatchMain";
import MatchDetails from "../sub-screens/match/MatchDetails";

const Stack = createNativeStackNavigator();

const Matches = () => {
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
                headerTitle: "Matches",
                headerBackTitle: "Matches",
            }}
            initialRouteName="MatchMain"
        >
            <Stack.Screen name="MatchMain" component={MatchMain}/>
            <Stack.Screen name="MatchDetails" 
                options={({route}) => ({ headerTitle: "Match Centre" })}
            >
                {(input) => <MatchDetails match={input}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
});

export default Matches;