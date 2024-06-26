import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClubDetails from "../sub-screens/club/ClubDetails";
import ClubMain from "../sub-screens/club/ClubMain";

const Stack = createNativeStackNavigator();

const Clubs = () => {
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
                headerTitle: "Clubs",
                headerBackTitle: "Clubs",
            }}
            initialRouteName="ClubMain"
        >
            <Stack.Screen name="ClubMain" component={ClubMain} options={{ title: 'Clubs'}}/>
            <Stack.Screen name="ClubDetails" 
                options={({route}) => ({ headerTitle: route.params.clubData.club.name_full })}
            >
                {(clubData) => <ClubDetails club={clubData}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
});

export default Clubs;