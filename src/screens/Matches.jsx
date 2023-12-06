import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TempScreen from "../sub-screens/tempScreen";

const Stack = createStackNavigator();

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
                headerTitle: "Matches",
                headerTintColor: "#54a761",
            }}
        >
            <Stack.Screen name="tempScreen" component={TempScreen}/>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
});

export default Matches;