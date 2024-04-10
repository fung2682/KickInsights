import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PredictionMain from "../sub-screens/prediction/PredictionMain";
import PredictionCreateModel from "../sub-screens/prediction/CreateModel";
import Account from "../screens/Account";

const Stack = createNativeStackNavigator();

const Prediction = () => {

    const [page, setPage] = useState("data");   // for create model page

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
                headerBackTitle: "Models",
            }}
            initialRouteName="PredictionMain"
        >
            <Stack.Screen name="PredictionMain" component={PredictionMain} options={{ title: 'ML Models'}}>
            </Stack.Screen>
            <Stack.Screen name="Account" options={{headerTitle: "Account"}}>
                {(user) => <Account userState={user} />}
            </Stack.Screen>
            <Stack.Screen name="PredictionCreateModel" options={{ headerTitle: 'Create Model'}}>
                {(user) => <PredictionCreateModel userState={user} page={page} setPage={setPage} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
});

export default Prediction;