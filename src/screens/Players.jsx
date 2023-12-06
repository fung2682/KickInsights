import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TempScreen from "../sub-screens/tempScreen";
import PlayerList from "../components/player/PlayerList";


const Tab = createMaterialTopTabNavigator();

const Players = () => {
    return (
        <Text>Players</Text>
    );
}

export default Players;