import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PredictionMain from "../sub-screens/prediction/PredictionMain";
import PredictionCreateModel from "../sub-screens/prediction/CreateModel";
import PredictionSelfModel from "../sub-screens/prediction/SelfModel";
import Account from "../screens/Account";
import PredictionMatch from "../sub-screens/prediction/PredictionMatch";

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
                {(user) => <PredictionCreateModel userState={user} />}
            </Stack.Screen>
            <Stack.Screen name="PredictionMatchList" 
                options={({route}) => ({ headerTitle: `Confidence ( >${route.params.confidence} )`})}>
                {(params) => <PredictionMatch input={params.route.params} />}
            </Stack.Screen>
            <Stack.Screen name="PredictionSelfModel" options={(model) => ({ headerTitle: model.route.params.model.model_name })}>
                {(input) => <PredictionSelfModel input={input} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
});

export default Prediction;