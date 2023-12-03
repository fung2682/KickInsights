import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BottomTabs from "./src/components/BottomTabs";
import { NavigationContainer } from "@react-navigation/native";
import Loading from './src/fetchCloud';

const App = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load_data = async () => {
            result = await Loading();
            setLoading(result);
        }
        load_data();
    })

    // display loading screen if data is not loaded
    if (loading) {
        return (
            <NavigationContainer>
                <View style={{backgroundColor: "red", flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{color: "white", fontSize: 20}}>Loading...</Text>
                </View>
            </NavigationContainer>
        )
    }
    // display app after data is loaded
    return (
        <NavigationContainer>
            <BottomTabs/>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
});

export default App;



