import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TempScreen from "../sub-screens/tempScreen";
import PredictionMain from "../sub-screens/prediction/PredictionMain";

const Stack = createNativeStackNavigator();

const Prediction = () => {
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
                headerTitle: "ML Models",
                headerBackTitle: "Prediction",
            }}
            initialRouteName="PredictionMain"
        >
            <Stack.Screen name="PredictionMain" component={PredictionMain} options={{ title: 'ML Models'}}/>
            {/* <Stack.Screen name="CommunityModel" component={ClubMain}/> */}
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
});

export default Prediction;