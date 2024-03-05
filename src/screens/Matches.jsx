import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MatchMain from "../sub-screens/match/MatchMain";
import MatchDetails from "../sub-screens/match/MatchDetails";
import ClubDetails from "../sub-screens/club/ClubDetails";

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
                {(input) => <MatchDetails props={input}/>}
            </Stack.Screen>
            <Stack.Screen name="ClubDetails" 
                options={({route}) => ({ headerTitle: route.params.clubData.club.name_full , headerBackTitle: "Back" })}
            >
                {(clubData) => <ClubDetails club={clubData}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
});

export default Matches;