import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TempScreen from "../sub-screens/tempScreen";

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
        >
            <Stack.Screen name="tempScreen" component={TempScreen}/>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
});

export default Matches;