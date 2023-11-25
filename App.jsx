import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BottomTabs from "./src/components/BottomTabs";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
    return (
        <NavigationContainer>
            <BottomTabs/>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
});

export default App;



