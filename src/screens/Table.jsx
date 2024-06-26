import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClubDetails from "../sub-screens/club/ClubDetails";
import TableMain from "../sub-screens/TableMain";

const Stack = createNativeStackNavigator();

const Table = () => {
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
                headerTitle: "Premier League 2023/24",
                headerTintColor: "#54a761",
                headerBackTitle: "Table",
            }}
            initialRouteName="TableMain"
        >
            <Stack.Screen name="TableMain" component={TableMain}/>
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

export default Table;
